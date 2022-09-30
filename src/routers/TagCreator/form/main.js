// TODO: make formatter
// TODO: add css
const FormRenderData = TagCreatorForm.FormRenderData;
let form;

window.onload = function () {
  TagCreatorForm.inject(React, ReactDOM, JSONSchemaForm);

  const container = document.getElementById("form-container");
  form = new TagCreatorForm(container);

  renderForm();
};

// TODO: add the taxonomyVersion...
async function renderForm() {
  const { schema, uiSchema, taxonomyVersion } = await fetchConfig();
  const formatter = new RESTTagFormatter();
  const formData = new FormRenderData(
    schema,
    uiSchema,
    {},
    { taxonomyVersion },
    formatter
  );
  form.render(formData);
}

async function fetchConfig() {
  const url = "../configuration.json";
  const response = await fetch(url);
  return await response.json();
}

/**
 * Format tags as human-readable using the REST endpoint.
 */
class RESTTagFormatter {
  constructor() {
    this.baseUrl = window.location.href
      .replace("TagCreator", "TagFormat")
      .replace(/[^/]*\/static.*$/, "human");
  }

  async toHumanFormat(tags) {
    const encodedTags = encodeURIComponent(JSON.stringify(tags));
    const url = `${this.baseUrl}?tags=${encodedTags}`;
    const response = await fetch(url);
    return await response.json();
  }
}
