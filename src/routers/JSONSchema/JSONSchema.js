/*globals define*/

/**
 * Generated by RestRouterGenerator 2.2.0 from webgme on Mon Oct 24 2022 14:51:41 GMT-0500 (Central Daylight Time).
 * To use in webgme add to gmeConfig.rest.components[JSONSchema] = {
 *    mount: 'path/subPath',
 *    src: path.join(process.cwd(), './JSONSchema'),
 *    options: {}
 * }
 * If you put this file in the root of your directory the above will expose the routes at
 * <host>/path/subPath, for example GET <host>/path/subPath/getExample will be routed to the getExample below.
 */

"use strict";

// http://expressjs.com/en/guide/routing.html
var express = require("express"),
  router = express.Router();
const RouterUtils = require("../../common/routers/Utils");
const Utils = require("../../common/Utils");
const JSONSchemaExporter = require("../../common/JSONSchemaExporter");

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
  var logger = middlewareOpts.logger.fork("JSONSchema"),
    ensureAuthenticated = middlewareOpts.ensureAuthenticated,
    getUserId = middlewareOpts.getUserId;

  logger.debug("initializing ...");

  // Ensure authenticated can be used only after this rule.
  router.use("*", function (req, res, next) {
    // TODO: set all headers, check rate limit, etc.

    // This header ensures that any failures with authentication won't redirect.
    res.setHeader("X-WebGME-Media-Type", "webgme.v1");
    next();
  });

  // Use ensureAuthenticated if the routes require authentication. (Can be set explicitly for each route.)
  // router.use('*', ensureAuthenticated);
  // Authentication not needed since actual data isn't shared, just taxonomy used to label data (as JSON schema).
  RouterUtils.addLatestVersionRedirect(middlewareOpts, router);
  RouterUtils.addContentTypeMiddleware(middlewareOpts, router, {
    unsafe: true,
  });

  router.get(
    RouterUtils.getContentTypeVocabRoutes("schema.json"),
    async (request, response) => {
      const { vocabScope } = request.params;
      const { root, core, contentType } = request.webgmeContext;
      const exporter = JSONSchemaExporter.from(core, root);
      // FIXME: remove this
      const vocabularies = await Utils.getVocabulariesFor(
        core,
        contentType,
        vocabScope
      );
      const { schema } = await exporter.getVocabSchemas(vocabularies);
      return response.json(schema);
    }
  );

  logger.debug("ready");
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

module.exports = {
  initialize: initialize,
  router: router,
  start: start,
  stop: stop,
};
