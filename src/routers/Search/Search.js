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
const TagFormatter = require("../../common/TagFormatter");
const path = require("path");
const staticPath = path.join(__dirname, "dashboard", "public");

const PDP = require("./adapters/PDP");
let mainConfig = null;

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

  mainConfig = middlewareOpts.gmeConfig;

  // Ensure authenticated can be used only after this rule.
  // router.use("*", function (req, res, next) {
  // TODO: set all headers, check rate limit, etc.

  // This header ensures that any failures with authentication won't redirect.
  // res.setHeader("X-WebGME-Media-Type", "webgme.v1");
  // next();
  // });

  // Use ensureAuthenticated if the routes require authentication. (Can be set explicitly for each route.)
  router.use("*", ensureAuthenticated);

  router.use("/:projectId/branch/:branch/static/", express.static(staticPath));

  // Perhaps the path should include the node ID, too...
  router.use("/:projectId/branch/:branch/", async (req, res, next) => {
    console.log("received request");
    try {
      const { projectId, branch } = req.params;
      console.log("CTX:", projectId, branch);
      req.webgmeContext = await RouterUtils.getWebGMEContext(
        middlewareOpts,
        req,
        projectId,
        branch
      );
      console.log("CTX received:", req.originalUrl);
      next();
    } catch (e) {
      if (e instanceof RouterUtils.UserError) {
        res.status(e.statusCode).send(e.message);
      } else {
        logger.error(e);
        res.sendStatus(500);
      }
    }
  });

  router.get(
    "/:projectId/branch/:branch/configuration.json",
    async function (req, res) {
      const { root, core } = req.webgmeContext;
      const exporter = new SearchFilterDataExporter(core);
      const node = await Utils.findTaxonomyNode(core, root);
      const taxonomy = await exporter.toSchema(node);
      res.json({ taxonomy });
    }
  );

  // Accessing and updating data via the storage adapter
  router.get(
    "/:projectId/branch/:branch/artifacts/",
    // TODO: add the artifact ID...
    async function (req, res) {
      try {
        // TODO: make the collection/db part of the config
        const type = await getArtifactType(req);
        const storage = PDP.from(req, mainConfig);
        const artifacts = await storage.listArtifacts(type);
        console.log({ artifacts });
        res.status(200).json(artifacts).end();
      } catch (e) {
        logger.error(e.stack);
        res.sendStatus(401);
      }
    }
  );

  router.post(
    "/:projectId/branch/:branch/artifacts/",
    async function (req, res) {
      const type = await getArtifactType(req);
      const { root, core } = req.webgmeContext;
      const node = await Utils.findTaxonomyNode(core, root);
      const formatter = await TagFormatter.from(core, node);
      const { metadata } = req.body;
      // TODO: re-enable tag conversion once the process is created automatically
      //try {
      //metadata.taxonomyTags = formatter.toGuidFormat(metadata.taxonomyTags);
      //} catch (err) {
      //if (err instanceof TagFormatter.FormatError) {
      //res.status(400).send(err.message);
      //} else {
      //res.sendStatus(500);
      //}
      //}

      metadata.taxonomy = {
        projectId: req.params.projectId,
        branch: req.params.branch,
      };
      const storage = PDP.from(req, mainConfig);
      const result = await storage.createArtifact(type, metadata);
      res.json("Submitted create request!");
    }
  );

  router.post(
    "/:projectId/branch/:branch/artifacts/:parentId/:id/uploadUrl",
    async function (req, res) {
      // TODO: update artifact
      //the body is a json with the metadata and the list of file paths
      console.log("appending data artifact");
      const { parentId, id } = req.params;
      const type = await getArtifactType(req);
      const storage = PDP.from(req, mainConfig);
      const [obsIndex, version] = id.split("_");
      const fileUploadInfo = await storage.getUploadUrls(
        type,
        parentId,
        +obsIndex + 1,
        +version,
        req.body.metadata,
        req.body.filenames
      );
      res.json(fileUploadInfo);
    }
  );

  router.get(
    "/:projectId/branch/:branch/artifacts/:parentId/download",
    async function (req, res) {
      const { parentId } = req.params;
      // TODO: get the IDs for the specific observations to get
      let ids;
      try {
        ids = JSON.parse(req.query.ids);
      } catch (err) {
        return res.status(400).send("List of artifact IDs required");
      }

      console.log("getting download URL", parentId, ids);
      const { root, core } = req.webgmeContext;
      const node = await Utils.findTaxonomyNode(core, root);
      const formatter = await TagFormatter.from(core, node);

      const storage = PDP.from(req, mainConfig);
      const zipFile = await storage.getDownloadPath(parentId, ids, formatter);
      if (zipFile) {
        await res.download(zipFile.path, path.basename(zipFile.name), () =>
          zipFile.cleanUp()
        );
      } else {
        // no files associated with the artifact
        return res.sendStatus(204);
      }
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

//TODO: probably we should remove this for the a1 release - noone cares about workflows...
async function getArtifactType(req) {
  // const type = req.params.projectId.indexOf("WFTax") !== -1 ? "workflow" : "testdata";
  // return type;
  return "testdata";
}

module.exports = {
  initialize: initialize,
  router: router,
  start: start,
  stop: stop,
};
