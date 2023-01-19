const FormRenderData = TagCreatorForm.FormRenderData;
let form;

window.onload = function () {
  const { Form, validator } = JSONSchemaForm;
  TagCreatorForm.inject(React, ReactDOM, Form, validator);

  const container = document.getElementById("form-container");
  form = new TagCreatorForm(container);

  renderForm();
};

async function renderForm() {
  const { schema, uiSchema, taxonomyVersion } = await fetchConfig();
  const formData = new FormRenderData(
    schema,
    uiSchema,
    {},
    { taxonomyVersion }
  );
  form.render(formData);
}

async function fetchConfig() {
  const url = "../configuration.json";
  const response = await fetch(url);
  return await response.json();
}
