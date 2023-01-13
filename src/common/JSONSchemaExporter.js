function factory() {
  const optionTypes = ["EnumField", "SetField"];

  class JSONSchemaExporter {
    /**
     * Creates an instance of JSONSchemaExporter.
     * @param {GmeClasses.Core & { getMetaType(node: Core.Node): Core.Node }} core
     * @param {any} META
     * @memberof JSONSchemaExporter
     */
    constructor(core, META) {
      this.core = core;
      this.META = META;
    }

    async getSchemas(taxonomyNode) {
      const taxonomyName = this.core.getAttribute(taxonomyNode, "name");
      const vocabs = await this.core.loadChildren(taxonomyNode);
      return this.getVocabSchemas(vocabs, taxonomyName);
    }

    async getVocabSchemas(vocabs, taxonomyName) {
      const definitions = {};
      const termNodes = (
        await Promise.all(vocabs.map((node) => this.getTermNodes(node)))
      ).flat();

      const properties = {
        taxonomyTags: {
          title: taxonomyName,
          type: "array",
          uniqueItems: true,
          minItems: 1,
          items: {
            type: "object",
            anyOf: await Promise.all(
              termNodes.map((node) => this.getTermSchema(node))
            ),
          },
        },
      };
      const schema = {
        type: "object",
        properties,
        definitions,
      };

      const uiSchema = {
        taxonomyTags: {
          items: {}, // TODO: can we hide the title shown under the dropdown?
        },
      };
      return { schema, uiSchema };
    }

    async getTermSchema(node) {
      const parentTerms = this.getAncestorTerms(node);
      const schema = {
        type: "object",
        // FIXME: we need to figure out how to hide the top title...
        title: this.core.getAttribute(node, "name"),
        properties: {},
        additionalProperties: false,
      };
      const termFields = await Promise.all(
        parentTerms.map((n) => this.getDefinition(n))
      );
      const properties = zip(parentTerms, termFields).reduce(
        (schema, [parent, fields]) => {
          const name = this.core.getAttribute(parent, "name");
          return (schema.properties[name] = fields);
        },
        schema
      );

      return schema;
    }

    getAncestorTerms(node) {
      const nodes = [node];
      let parent = this.core.getParent(node);
      while (this.isTerm(parent) || this.isVocab(parent)) {
        nodes.unshift(parent);
        parent = this.core.getParent(parent);
      }
      return nodes;
    }

    async getTermFields(node) {
      const fieldNodes = (await this.core.loadChildren(node)).filter(
        (n) => !this.isTerm(n)
      );
    }

    async getTermNodes(node) {
      return (await this.core.loadSubTree(node)).filter((node) =>
        this.isTerm(node)
      );
    }

    isTypeOf(node, name) {
      /** @type {Core.Node | null} */
      let iternode = this.core.getMetaType(node);
      while (iternode) {
        const baseName = this.core.getAttribute(iternode, "name");
        if (baseName === name) {
          return true;
        }
        iternode = this.core.getBase(iternode);
      }

      return false;
    }

    isEnum(node) {
      return this.isTypeOf(node, "EnumField");
    }

    /**
     * Gets whether the given node is a Set field.
     *
     * @param {Core.Node} node The node to check the type of
     * @return {boolean} Whether or not the `node` is a `SetField` type
     * @memberof JSONSchemaExporter
     */
    isSet(node) {
      return this.isTypeOf(node, "SetField");
    }

    /**
     * Gets whether the given node is a type that has child "option" fields
     * (i.e. `EnumField` or `SetField`).
     *
     * @param {Core.Node} node The node to check the type of
     * @return {boolean} Whether or not the `node` is a type with "option" fields
     * @memberof JSONSchemaExporter
     */
    isOptionType(node) {
      return optionTypes.some((optType) => this.isTypeOf(node, optType));
    }

    /**
     * Gets whether the given node is an option field for another field
     * (i.e. child of `EnumField` or `SetField`).
     *
     * @param {Core.Node} node The node to check the type of
     * @return {boolean} Whether or not the `node` is an "option" field
     * @memberof JSONSchemaExporter
     */
    isFieldOption(node) {
      const parent = this.core.getParent(node);
      return (
        parent != null &&
        optionTypes.some((optType) =>
          this.core.isTypeOf(parent, this.META[optType])
        )
      );
    }

    /**
     * Gets whether the given node is a taxonomy term.
     *
     * @param {Core.Node | null} node The node to check the type of
     * @return {boolean} Whether or not the `node` is a taconomy term
     * @memberof JSONSchemaExporter
     */
    isTerm(node) {
      return node != null && this.core.isTypeOf(node, this.META.Term);
    }

    isVocab(node) {
      return node != null && this.core.isTypeOf(node, this.META.Vocabulary);
    }

    async getDependentDefinitions(node) {
      const children = await this.core.loadChildren(node);
      if (this.isOptionType(node)) {
        return children;
      } else {
        return children.filter(
          (child) =>
            this.core.isTypeOf(child, this.META.Term) ||
            this.core.isTypeOf(child, this.META.CompoundField)
        );
      }
    }

    async getDefinitionEntries(node) {
      const children = await this.core.loadChildren(node);
      const dependentDefs = await this.getDependentDefinitions(node);

      const childDefs = (
        await Promise.all(
          children.map((node) => this.getDefinitionEntries(node))
        )
      ).flat();
      const myDefs = await Promise.all(
        dependentDefs.map(async (node) => [
          this.core.getGuid(node),
          await this.getDefinition(node),
        ])
      );
      return myDefs.concat(childDefs);
    }

    hasProperties(node) {
      return (
        this.core.isTypeOf(node, this.META.Term) ||
        this.core.isTypeOf(node, this.META.Vocabulary) ||
        this.core.isTypeOf(node, this.META.CompoundField)
      );
    }

    async getDefinition(node) {
      const isFieldOpt = this.isFieldOption(node);

      if (this.hasProperties(node)) {
        const properties = await this.getProperties(node);
        return {
          title: this.core.getAttribute(node, "name"),
          type: "object",
          properties,
          required: Object.keys(properties),
          additionalProperties: false,
        };
      } else if (isFieldOpt) {
        const schema = await this.getFieldSchema(node);
        return schema;
      } else {
        throw new Error("Cannot get definition for " + this.core.getPath(node));
      }
    }

    async getProperties(node) {
      const isTerm = this.isTerm(node);
      const isFieldOpt = this.isFieldOption(node);
      const fieldNodes = (await this.core.loadChildren(node)).filter((child) =>
        this.core.isTypeOf(child, this.META.Field)
      );
      const fieldSchemas = await Promise.all(
        fieldNodes.map((node) => this.getFieldSchema(node))
      );
      const fieldNames = fieldNodes.map((n) =>
        this.core.getAttribute(n, "name")
      );
      const properties = Object.fromEntries(zip(fieldNames, fieldSchemas));
      console.log(
        "found",
        fieldNodes.length,
        "fields for",
        this.core.getAttribute(node, "name"),
        (await this.core.loadChildren(node)).length,
        properties
      );

      return properties;
    }

    /**
     * Get the JSON Schema for field node.
     *
     * @param {Core.Node} node A field node to get JSON schema for
     * @return {Promise<[string, { [key:string]: any }]>} A promise for guid/schema tuple
     * @memberof JSONSchemaExporter
     */
    async getFieldSchema(node) {
      const name = this.core.getAttribute(node, "name");
      const guid = this.core.getGuid(node);
      const baseNode = this.core.getMetaType(node);
      const baseName = this.core.getAttribute(baseNode, "name");
      let children;

      /** @type {{ [key:string]: any }} */
      let fieldSchema = {
        title: name,
      };
      switch (baseName) {
        case "IntegerField":
          fieldSchema.type = "integer";
          break;
        case "FloatField":
          fieldSchema.type = "number";
          break;
        case "BooleanField":
          fieldSchema.type = "boolean";
          break;
        case "TextField":
          fieldSchema.type = "string";
          break;
        case "EnumField":
          children = await this.core.loadChildren(node);
          fieldSchema.anyOf = await Promise.all(
            children.map((c) => this.getFieldSchema(c))
          );
          break;
        case "CompoundField":
          fieldSchema.type = "object";
          fieldSchema.properties = {};
          fieldSchema.properties[name] = await this.getDefinition(node);
          fieldSchema.additionalProperties = false;
          break;
        case "SetField":
          children = await this.core.loadChildren(node);
          Object.assign(fieldSchema, {
            type: "array",
            uniqueItems: true,
            items: {
              anyOf: await Promise.all(
                children.map((c) => this.getFieldSchema(c))
              ),
            },
          });
      }
      console.log({ baseName, fieldSchema });
      return fieldSchema;
    }

    static from(core, node) {
      const metanodes = Object.values(core.getAllMetaNodes(node));
      const meta = Object.fromEntries(
        metanodes.map((n) => [core.getAttribute(n, "name"), n])
      );
      return new JSONSchemaExporter(core, meta);
    }
  }

  function range(len) {
    return [...new Array(len)].map((_, i) => i);
  }

  function zip(...lists) {
    const maxIndex = Math.min(...lists.map((l) => l.length));
    return range(maxIndex).map((i) => lists.map((l) => l[i]));
  }

  return JSONSchemaExporter;
}

if (typeof define !== "undefined") {
  define([], factory);
} else if (typeof module !== "undefined") {
  module.exports = factory();
} else {
  this.JSONSchemaExporter = factory();
}
