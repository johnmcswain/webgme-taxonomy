describe("JSONSchemaExporter", function () {
  const testFixture = require("../globals");
  const _ = testFixture.requirejs("underscore");
  const Core = testFixture.requirejs("common/core/coreQ");
  const Importer = testFixture.requirejs("webgme-json-importer/JSONImporter");
  const TaxonomyParser = require("../../src/common/TaxonomyParser");
  const TagFormatter = require("../../src/common/TagFormatter");
  const JSONSchemaExporter = require("../../src/common/JSONSchemaExporter");
  const Ajv = require("ajv");
  const ajv = new Ajv();
  const { OmittedProperties, NodeSelections } = Importer;
  const assert = require("assert");
  const gmeConfig = testFixture.getGmeConfig();
  const path = testFixture.path;
  const SEED_DIR = path.join(__dirname, "..", "..", "src", "seeds");
  const Q = testFixture.Q;
  const logger = testFixture.logger.fork("JSONImporter");
  const projectName = "testProject";
  const Utils = require("../Utils");
  let project, gmeAuth, storage, commitHash, core;

  before(async function () {
    this.timeout(7500);
    const params = await Utils.initializeProject(
      "JSONSchemaExporter",
      "taxonomy",
    );
    gmeAuth = params.gmeAuth;
    storage = params.storage;
    commitHash = params.commitHash;
    core = params.core;
    project = params.project;
  });

  after(async function () {
    await storage.closeDatabase();
    await gmeAuth.unload();
  });

  async function getValidateFn(core, root, csv) {
    const taxonomy = await Utils.createTaxonomyFromCsv(core, root, csv);
    const exporter = JSONSchemaExporter.from(core, root);
    const { schema, uiSchema } = await exporter.getSchemas(taxonomy);
    const validate = ajv.compile(schema);
    return (tag) => {
      const completeTags = {
        taxonomyTags: [tag],
      };
      return validate(completeTags);
    };
  }

  describe("required terms", function () {
    let schemaDict;
    before(async () => {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomyJson = {
        pointers: { base: "@meta:Taxonomy" },
        children: [
          {
            pointers: { base: "@meta:Vocabulary" },
            children: [
              {
                pointers: { base: "@meta:Term" },
                attributes: {
                  name: "RequiredTerm",
                  selection: "required",
                },
              },
            ],
          },
        ],
      };
      const importer = new Importer(core, root);
      const taxonomy = await importer.import(root, taxonomyJson);
      const exporter = JSONSchemaExporter.from(core, taxonomy);
      schemaDict = await exporter.getSchemas(taxonomy);
    });

    it("should add constraint for required terms", async function () {
      const isRequired = schemaDict.schema.properties.taxonomyTags.allOf.find(
        (constraint) => constraint.contains?.title === "RequiredTerm",
      );
      assert(isRequired);
    });

    it("should include terms in initial form data", async function () {
      const { formData } = schemaDict;
      const [initTag] = formData.taxonomyTags;
      assert(initTag.Vocabulary.RequiredTerm);
    });
  });

  describe("recommended terms", function () {
    it("should include terms in initial form data", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomyJson = {
        pointers: { base: "@meta:Taxonomy" },
        children: [
          {
            pointers: { base: "@meta:Vocabulary" },
            children: [
              {
                pointers: { base: "@meta:Term" },
                attributes: {
                  name: "RecTerm",
                  selection: "recommended",
                },
              },
            ],
          },
        ],
      };
      const importer = new Importer(core, root);
      const taxonomy = await importer.import(root, taxonomyJson);
      const exporter = JSONSchemaExporter.from(core, taxonomy);
      const { formData } = await exporter.getSchemas(taxonomy);
      const [initTag] = formData.taxonomyTags;
      assert(initTag.Vocabulary.RecTerm);
    });
  });

  describe("required properties", function () {
    it("should set property as required in schema", async () => {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomyJson = {
        pointers: { base: "@meta:Taxonomy" },
        children: [
          {
            pointers: { base: "@meta:Vocabulary" },
            children: [
              {
                pointers: { base: "@meta:Term" },
                attributes: {
                  name: "RecTerm",
                },
                children: [
                  {
                    pointers: { base: "@meta:TextField" },
                    attributes: { name: "testAttr", required: true },
                  },
                ],
              },
            ],
          },
        ],
      };
      const importer = new Importer(core, root);
      const taxonomy = await importer.import(root, taxonomyJson);
      const exporter = JSONSchemaExporter.from(core, taxonomy);
      const { schema } = await exporter.getSchemas(taxonomy);
      const termSchema = schema.properties.taxonomyTags.items.anyOf[0];
      const reqProps =
        termSchema.properties.Vocabulary.properties.RecTerm.required;
      assert(reqProps.includes("testAttr"));
    });
  });

  describe("enum", function () {
    let root;
    beforeEach(async () => {
      root = await Utils.getNewRootNode(project, commitHash, core);
    });

    it("should support string enums", async function () {
      const taxCsv = `vocab,,,
        ,enumTerm,,
        ,,enumProp (enum),
        ,,,enumItem1 (text)
        ,,,,itemField (int)
        ,,,enumItem2 (text)
        ,enumTerm2,,
        ,,name (text),
        ,,enumSubTerm2,
        ,,,child_name (text)
        ,enumTerm3,,
        ,,enumItem3 (text)`;
      const tag = {
        vocab: {
          enumTerm: {
            enumProp: { enumItem1: {} },
          },
        },
      };
      const validate = await getValidateFn(core, root, taxCsv);
      assert(await validate(tag));
    });

    it("should support compound enums", async function () {
      const taxCsv = `vocab,,,,
        ,enumTerm,,,
        ,,enumProp (enum),,
        ,,,enumItem1,
        ,,,,name (text)
        ,,,enumItem2,
        ,,,,age (int)`;
      const tag = {
        vocab: {
          enumTerm: {
            enumProp: {
              enumItem1: {
                name: "test name",
              },
            },
          },
        },
      };
      const validate = await getValidateFn(core, root, taxCsv);
      assert(await validate(tag));
    });

    describe("mixed (compound+string) enums", function () {
      let validate;
      beforeEach(async () => {
        const taxCsv = `vocab,,,,
        ,enumTerm,,,
        ,,enumProp (enum),,
        ,,,compoundEnumOpt,
        ,,,,name (text)
        ,,,stringEnumOpt (text),`;
        validate = await getValidateFn(core, root, taxCsv);
      });

      it("should fail if invalid enum item", async function () {
        const tag = {
          vocab: {
            enumTerm: {
              enumProp: {
                Tag: "compoundEnumOpt",
                name: "test name",
              },
            },
          },
        };
        assert(!validate(tag));
      });

      it("should support compound tags", async function () {
        const tag = {
          vocab: {
            enumTerm: {
              enumProp: {
                compoundEnumOpt: {
                  name: "test name",
                },
              },
            },
          },
        };
        assert(validate(tag));
      });

      it("should support string tags", async function () {
        const tag = {
          vocab: {
            enumTerm: {
              enumProp: { stringEnumOpt: {} },
            },
          },
        };
        assert(validate(tag));
      });

      it("should error on invalid strings", async function () {
        const tag = {
          vocab: {
            enumTerm: {
              enumProp: "invalidString",
            },
          },
        };
        assert(!validate(tag));
      });
    });
  });
});
