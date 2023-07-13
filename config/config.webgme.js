// DO NOT EDIT THIS FILE
// This file is automatically generated from the webgme-setup-tool.
"use strict";

var config = require("webgme/config/config.default"),
  validateConfig = require("webgme/config/validator");

// The paths can be loaded from the webgme-setup.json
config.plugin.basePaths.push(__dirname + "/../src/plugins");
config.plugin.basePaths.push(
  __dirname + "/../node_modules/webgme-json-importer/src/plugins",
);
config.seedProjects.basePaths.push(__dirname + "/../src/seeds/taxonomy");
config.seedProjects.basePaths.push(__dirname + "/../src/seeds/TaxonomyProject");
config.seedProjects.basePaths.push(__dirname + "/../src/seeds/profile");
config.seedProjects.basePaths.push(__dirname + "/../src/seeds/test");

config.visualization.panelPaths.push(__dirname + "/../src/visualizers/panels");

config.rest.components["Search"] = {
  src: __dirname + "/../src/routers/Search/Search.js",
  mount: "routers/Search",
  options: {},
};
config.rest.components["TagFormat"] = {
  src: __dirname + "/../src/routers/TagFormat/TagFormat.js",
  mount: "routers/TagFormat",
  options: {},
};
config.rest.components["TagCreator"] = {
  src: __dirname + "/../src/routers/TagCreator/TagCreator.js",
  mount: "routers/TagCreator",
  options: {},
};
config.rest.components["JSONSchema"] = {
  src: __dirname + "/../src/routers/JSONSchema/JSONSchema.js",
  mount: "routers/JSONSchema",
  options: {},
};
config.rest.components["Dashboard"] = {
  src: __dirname + "/../src/routers/Dashboard/Dashboard.js",
  mount: "routers/Dashboard",
  options: {},
};
config.rest.components["Profiles"] = {
  src: __dirname + "/../src/routers/Profiles/Profiles.js",
  mount: "routers/Profiles",
  options: {},
};

// Visualizer descriptors
config.visualization.visualizerDescriptors.push(
  __dirname + "/../src/visualizers/Visualizers.json",
);
// Add requirejs paths
config.requirejsPaths = {
  "SetStateFromJSON":
    "node_modules/webgme-json-importer/src/plugins/SetStateFromJSON",
  "panels": "./src/visualizers/panels",
  "widgets": "./src/visualizers/widgets",
  "webgme-json-importer": "./node_modules/webgme-json-importer/src/common",
  "webgme-taxonomy": "./src/common",
};

config.mongo.uri = "mongodb://127.0.0.1:27017/webgme_taxonomy";
validateConfig(config);
module.exports = config;
