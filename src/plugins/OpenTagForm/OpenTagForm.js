/*globals define*/
/*eslint-env node, browser*/

/**
 * Generated by PluginGenerator 2.20.5 from webgme on Wed Jan 25 2023 08:21:02 GMT-0600 (Central Standard Time).
 * A plugin that inherits from the PluginBase. To see source code documentation about available
 * properties and methods visit %host%/docs/source/PluginBase.html.
 */

define(["text!./metadata.json", "plugin/PluginBase"], function (
  pluginMetadata,
  PluginBase,
) {
  "use strict";

  pluginMetadata = JSON.parse(pluginMetadata);

  class OpenTagForm extends PluginBase {
    constructor() {
      super();
      this.pluginMetadata = pluginMetadata;
    }

    async main() {
      const baseUrl = window.location.href.replace(/\?.*$/, "");
      const versionString = await this.getVersionString();
      const url = baseUrl +
        "routers/TagCreator/" +
        encodeURIComponent(this.project.projectId) +
        "/" +
        versionString +
        "/" +
        encodeURIComponent(this.core.getPath(this.activeNode)) +
        "/static/index.html";

      window.open(url, "TagForm");
      this.result.setSuccess(true);
    }

    async getVersionString() {
      return Object.entries(await this.getVersion())
        .map(([name, value]) => name + "/" + encodeURIComponent(value))
        .pop();
    }

    async getVersion() {
      const versionInfo = {};
      const tags = await this.project.getTags();
      const currentTag = Object.entries(tags).find(
        ([tag, commit]) => commit === this.commitHash,
      );

      if (currentTag) {
        versionInfo.tag = currentTag[0];
      } else if (this.branchName) {
        versionInfo.branch = this.branchName;
      } else {
        versionInfo.commit = this.commitHash;
      }

      return versionInfo;
    }
  }

  OpenTagForm.metadata = pluginMetadata;

  return OpenTagForm;
});
