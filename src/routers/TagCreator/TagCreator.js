/*globals define*/

/**
 * Generated by RestRouterGenerator 2.2.0 from webgme on Tue Aug 23 2022 16:58:35 GMT-0500 (Central Daylight Time).
 * To use in webgme add to gmeConfig.rest.components[TagCreator] = {
 *    mount: 'path/subPath',
 *    src: path.join(process.cwd(), './TagCreator'),
 *    options: {}
 * }
 * If you put this file in the root of your directory the above will expose the routes at
 * <host>/path/subPath, for example GET <host>/path/subPath/getExample will be routed to the getExample below.
 */

"use strict";

// http://expressjs.com/en/guide/routing.html
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const fsp = fs.promises;
const _ = require("underscore");
const JSONSchemaExporter = require("../../common/JSONSchemaExporter");
const RouterUtils = require("../../common/routers/Utils");
const Utils = require("../../common/Utils");
const webgmeVersion = require("webgme/package.json").version;

/**
 * Called when the server is created but before it starts to listening to incoming requests.
 * N.B. gmeAuth, safeStorage and workerManager are not ready to use until the start function is called.
 * (However inside an incoming request they are all ensured to have been initialized.)
 *
 * @param {object} middlewareOpts - Passed by the webgme server.
 * @param {GmeConfig} middlewareOpts.gmeConfig - GME config parameters.
 * @param {GmeLogger} middlewareOpts.logger - logger
 * @param {function} middlewareOpts.ensureAuthenticated - Ensures the user is authenticated.
 * @param {function} middlewareOpts.getUserId - If authenticated retrieves the userId from the request.
 * @param {object} middlewareOpts.gmeAuth - Authorization module.
 * @param {object} middlewareOpts.safeStorage - Accesses the storage and emits events (PROJECT_CREATED, COMMIT..).
 * @param {object} middlewareOpts.workerManager - Spawns and keeps track of "worker" sub-processes.
 */
function initialize(middlewareOpts) {
  var logger = middlewareOpts.logger.fork("TagCreator"),
    ensureAuthenticated = middlewareOpts.ensureAuthenticated;

  generateFormHtml(middlewareOpts.gmeConfig);
  logger.debug("initializing ...");

  // Ensure authenticated can be used only after this rule.
  router.use("*", function (_req, res, next) {
    // TODO: set all headers, check rate limit, etc.

    // This header ensures that any failures with authentication won't redirect.
    res.setHeader("X-WebGME-Media-Type", "webgme.v1");
    next();
  });

  // Use ensureAuthenticated if the routes require authentication. (Can be set explicitly for each route.)
  router.use("*", ensureAuthenticated);

  RouterUtils.addLatestVersionRedirect(middlewareOpts, router);

  const staticPath = path.join(__dirname, "form");
  router.use(
    RouterUtils.getContentTypeRoutes("static/"),
    express.static(staticPath),
  );

  RouterUtils.addContentTypeMiddleware(middlewareOpts, router);

  router.get(
    RouterUtils.getContentTypeRoutes("configuration.json"),
    async function (req, res) {
      const { root, core, contentType } = req.webgmeContext;
      const exporter = JSONSchemaExporter.from(core, root);
      const vocabularies = await Utils.getVocabulariesFor(core, contentType);
      const contentName = core.getAttribute(contentType, "name").toString();
      const title = `${contentName} Terms`;
      const config = await exporter.getVocabSchemas(
        vocabularies,
        title,
        false,
      );
      config.taxonomyVersion = req.webgmeContext.projectVersion;
      config.taxonomyVersion.url = getHostUrl(req);
      return res.json(config);
    },
  );

  logger.debug("ready");
}

function getHostUrl(req) {
  // TODO: this could be improved to include path
  return req.host;
}

/**
 * Called before the server starts listening.
 * @param {function} callback
 */
function start(callback) {
  callback();
}

/**
 * Called after the server stopped listening.
 * @param {function} callback
 */
function stop(callback) {
  callback();
}

/**
 * Generate the index.html file given the GME config (deployment specific settings).
 */
async function generateFormHtml(gmeConfig) {
  const formTemplate = _.template(
    fs.readFileSync(path.join(__dirname, "form", "index.html.ejs"), "utf8"),
  );
  const { requirejsPaths } = gmeConfig;
  const commonPath = requirejsPaths["webgme-taxonomy"].replace(
    /^\./,
    "/extlib",
  );
  const opts = {
    commonPath,
    widgetPath: commonPath.replace(/common$/, "visualizers/widgets/TagCreator"),
    webgmeVersion,
  };
  await fsp.writeFile(
    path.join(__dirname, "form", "index.html"),
    formTemplate(opts),
  );
}

module.exports = {
  initialize: initialize,
  router: router,
  start: start,
  stop: stop,
};
