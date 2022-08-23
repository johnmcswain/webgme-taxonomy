/*globals define*/

/**
 * Generated by RestRouterGenerator 2.2.0 from webgme on Wed Aug 03 2022 22:46:01 GMT-0500 (Central Daylight Time).
 * To use in webgme add to gmeConfig.rest.components[Search] = {
 *    mount: 'path/subPath',
 *    src: path.join(process.cwd(), './Search'),
 *    options: {}
 * }
 * If you put this file in the root of your directory the above will expose the routes at
 * <host>/path/subPath, for example GET <host>/path/subPath/getExample will be routed to the getExample below.
 */

"use strict";

// http://expressjs.com/en/guide/routing.html
var express = require("express"),
  router = express.Router(),
  logger;

const RouterUtils = require("../../common/routers/Utils");
const Utils = require("../../common/Utils");
const SearchFilterDataExporter = require("../../common/SearchFilterDataExporter");
const path = require("path");
const staticPath = path.join(__dirname, "dashboard", "public");

/* N.B. gmeAuth, safeStorage and workerManager are not ready to use until the start function is called.
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
  const ensureAuthenticated = middlewareOpts.ensureAuthenticated;

  logger = middlewareOpts.logger.fork("Search");
  logger.debug("initializing ...");

  // Ensure authenticated can be used only after this rule.
  router.use("*", function (req, res, next) {
    // TODO: set all headers, check rate limit, etc.

    // This header ensures that any failures with authentication won't redirect.
    res.setHeader("X-WebGME-Media-Type", "webgme.v1");
    next();
  });

  // Use ensureAuthenticated if the routes require authentication. (Can be set explicitly for each route.)
  router.use("*", ensureAuthenticated);

  router.use("/:projectId/branch/:branch/static/", express.static(staticPath));

  // Perhaps the path should include the node ID, too...
  router.use("/:projectId/branch/:branch/", async (req, res, next) => {
    try {
      const { projectId, branch } = req.params;
      req.webgmeContext = await RouterUtils.getWebGMEContext(
        middlewareOpts,
        req,
        projectId,
        branch
      );
      next();
    } catch (e) {
      logger.error(e);
      res.sendStatus(500);
    }
  });

  router.get(
    "/:projectId/branch/:branch/taxonomy.json",
    async function (req, res) {
      const { root, core } = req.webgmeContext;
      const exporter = new SearchFilterDataExporter(core);
      const node = await Utils.findTaxonomyNode(core, root);
      const data = await exporter.toSchema(node);
      res.json(data);
    }
  );

  router.get("/datasets.json", async function (req, res) {
    // TODO: Retrieve all datasets for a given user from PDP.
    //
    // A single entry should look like:
    //
    //{
    //$type:"Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
    //IsFunction:false,
    //ProcessType:"labassets",
    //ProcessId:"abc03682-d5bd-490c-b088-c2a0ab5cf07a",
    //IsMeasure:false,
    //Index:1,
    //Version:0,
    //ObserverId:"95862b95-a22b-4d0b-bd5c-2fb5fca18841",
    //StartTime:"2021-11-05T06:55:13.278+00:00",
    //EndTime:null,
    //ApplicationDependencies:[],
    //ProcessDependencies:[],
    //Data:[
    //{taxonomyTags}
    //],
    //DataFiles:[]
    //}
  });

  router.post("/query", function (req, res /*, next*/) {
    // TODO: send the taxonomy, search query and return the results as JSON
    // TODO: this should probably have the context (project, branch, etc), too
    res.sendStatus(201);
  });

  // TODO: should we support uploading data? Probably

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
