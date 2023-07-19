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
import * as express from "express";
import type { Request, Response } from "express";
const router = express.Router();

import SystemTerm from "./SystemTerm";
import UploadContext from "./UploadContext";
import RouterUtils from "../../../common/routers/Utils";
import type { MiddlewareOptions, WebgmeRequest } from "../../../common/types";
import Utils from "../../../common/Utils";
import { isString } from "./Utils";
import DashboardConfiguration from "../../../common/SearchFilterDataExporter";
import TagFormatter from "../../../common/TagFormatter";
import path from "path";
const staticPath = path.join(__dirname, "..", "dashboard", "public");
import os from "os";
import { COMPRESSION_LEVEL, zip } from "zip-a-folder";
import fsp from "fs/promises";
import fs from "fs";
import StorageAdapter from "./adapters";
import {
  ChildContentTypeNotFoundError,
  MetaNodeNotFoundError,
} from "./adapters/common/ModelError";

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
function initialize(middlewareOpts: MiddlewareOptions) {
  const { ensureAuthenticated } = middlewareOpts;
  const logger = middlewareOpts.logger.fork("Search");
  logger.debug("initializing ...");

  const mainConfig = middlewareOpts.gmeConfig;

  // Ensure authenticated can be used only after this rule.
  // router.use("*", function (req, res, next) {
  // TODO: set all headers, check rate limit, etc.

  // This header ensures that any failures with authentication won't redirect.
  // res.setHeader("X-WebGME-Media-Type", "webgme.v1");
  // next();
  // });

  // Use ensureAuthenticated if the routes require authentication. (Can be set explicitly for each route.)
  router.use("*", ensureAuthenticated);

  RouterUtils.addLatestVersionRedirect(middlewareOpts, router);
  router.use(
    RouterUtils.getContentTypeRoutes("static/"),
    express.static(staticPath),
  );

  // Perhaps the path should include the node ID, too...
  RouterUtils.addContentTypeMiddleware(middlewareOpts, router);

  router.get(
    RouterUtils.getContentTypeRoutes("configuration.json"),
    RouterUtils.handleUserErrors(
      logger,
      async function getConfiguration(req, res) {
        const { core, contentType } = req.webgmeContext;
        const configuration = await DashboardConfiguration.from(
          core,
          contentType,
        );
        configuration.project = req.webgmeContext.projectVersion;
        configuration.contentTypePath = core.getPath(contentType);
        res.json(configuration);
      },
    ),
  );

  // Accessing and updating data via the storage adapter
  router.get(
    RouterUtils.getContentTypeRoutes("artifacts/"),
    // TODO: add the artifact ID...
    RouterUtils.handleUserErrors(logger, async function listContent(req, res) {
      const storage = await StorageAdapter.from(
        req.webgmeContext,
        req,
        mainConfig,
      );
      const artifacts = await storage.listArtifacts();
      res.status(200).json(artifacts).end();
    }),
  );

  router.post(
    RouterUtils.getContentTypeRoutes("artifacts/"),
    RouterUtils.handleUserErrors(
      logger,
      addSystemTags,
      convertTaxonomyTags,
      async function createArtifact(req, res) {
        const { metadata } = req.body;
        // FIXME: what if it isn't using the branch in the URL?
        const projectVersion = req.webgmeContext.projectVersion;
        metadata.taxonomyVersion = projectVersion;

        // Upload to the storage backend
        const storage = await StorageAdapter.from(
          req.webgmeContext,
          req,
          mainConfig,
        );

        const status = await storage.createArtifact(metadata);
        res.json("status: " + status);
      },
    ),
  );

  router.post(
    RouterUtils.getContentTypeRoutes("artifacts/:parentId/append"),
    RouterUtils.handleUserErrors(
      logger,
      addChildSystemTags,
      convertTaxonomyTags,
      async function appendContent(req, res) {
        const { parentId } = req.params;
        const storage = await StorageAdapter.from(
          req.webgmeContext,
          req,
          mainConfig,
        );
        const appendResult = await storage.appendArtifact(
          parentId,
          req.body.metadata,
          req.body.filenames,
        );
        appendResult.files.forEach((file) => {
          const isRelative = file.params.url.startsWith("./");
          if (isRelative) {
            const baseUrl = req.originalUrl
              .split(`artifacts/${parentId}/append`)
              .shift();
            file.params.url = baseUrl + file.params.url.substring(2);
          }
        });
        res.json(appendResult);
      },
    ),
  );

  router.post(
    RouterUtils.getContentTypeRoutes(
      "artifacts/:parentId/:index/:fileId/upload",
    ),
    RouterUtils.handleUserErrors(logger, async function uploadFile(req, res) {
      const { parentId, index, fileId } = req.params;
      const storage = await StorageAdapter.from(
        req.webgmeContext,
        req,
        mainConfig,
      );
      if (storage.uploadFile) {
        const status = await storage.uploadFile(parentId, index, fileId, req);
        res.json(status);
      } else {
        res.sendStatus(400);
      }
    }),
  );

  router.get(
    RouterUtils.getContentTypeRoutes("artifacts/:parentId/download"),
    RouterUtils.handleUserErrors(
      logger,
      async function downloadContent(req, res) {
        const { parentId } = req.params;
        // TODO: get the IDs for the specific observations to get
        let ids;
        if (isString(req.query.ids)) {
          ids = JSON.parse(req.query.ids);
        } else {
          res.status(400).send("List of artifact IDs required");
          return;
        }

        const { root, core } = req.webgmeContext;
        const node = await Utils.findTaxonomyNode(core, root);
        if (node == null) {
          res.status(400).send("No taxonomy node found");
          return;
        }
        const formatter = await TagFormatter.from(core, node);
        const storage = await StorageAdapter.from(
          req.webgmeContext,
          req,
          mainConfig,
        );

        const tmpDir = await fsp.mkdtemp(
          path.join(os.tmpdir(), "webgme-taxonomy-"),
        );
        const downloadDir = path.join(tmpDir, "download");
        const zipPath = path.join(tmpDir, `${parentId}.zip`);
        await storage.download(parentId, ids, formatter, downloadDir);
        await zip(downloadDir, zipPath, {
          compression: COMPRESSION_LEVEL.medium,
        });
        await fsp.rm(downloadDir, { recursive: true });

        try {
          await fsp.access(zipPath, fs.constants.R_OK);
          res.download(
            zipPath,
            path.basename(zipPath),
            () => fsp.rm(tmpDir, { recursive: true }),
          );
          return false;
        } catch (err) {
          // no files associated with the artifact
          logger.error(`${err}`);
          res.sendStatus(204);
        }
      },
    ),
  );

  logger.debug("ready");
}

/**
 * Add the system terms using the child of the content type defined in the
 * URL. Useful when appending data to an existing content type as the
 * content type from the URL is the parent (ie, repo) rather than the
 * content in the repo.
 */
async function addChildSystemTags(
  req: Request,
  res: Response,
) {
  const gmeContext = (<WebgmeRequest> req).webgmeContext;
  const { core, contentType } = gmeContext;
  const childContentType = (await core.loadChildren(contentType))
    .find((n) =>
      core.getAttribute(core.getBaseType(n), "name") === "Content Type"
    );

  if (!childContentType) {
    throw new ChildContentTypeNotFoundError(gmeContext, contentType);
  }

  return addContentTypeSystemTags(childContentType, req, res);
}

async function addSystemTags(
  req: Request,
  res: Response,
) {
  const gmeContext = (<WebgmeRequest> req).webgmeContext;
  const { contentType } = gmeContext;

  return addContentTypeSystemTags(contentType, req, res);
}

async function addContentTypeSystemTags(
  contentType: Core.Node,
  req: Request,
  _res: Response,
) {
  const { metadata } = req.body;
  const gmeContext = (<WebgmeRequest> req).webgmeContext;

  const { core, projectVersion } = gmeContext;
  const children = await core.loadChildren(contentType);
  const vocabs = children
    .find((node: Core.Node) =>
      core.getAttribute(core.getBaseType(node), "name") === "Vocabularies"
    ) || getVocabulariesMetaNode(core, contentType);

  if (!vocabs) {
    throw new MetaNodeNotFoundError(gmeContext, "Vocabularies");
  }

  const systemTerms = await SystemTerm.findAll(core, vocabs);
  const desc = ""; // TODO: add description
  const files: any[] = []; // TODO: add files

  const context = await UploadContext.from({
    name: metadata.displayName,
    description: desc,
    tags: metadata.taxonomyTags,
    files,
    core,
    contentType,
    project: projectVersion,
  });

  const systemTags =
    (await Promise.all(systemTerms.map((t) => t.createTags(context)))).flat();

  metadata.taxonomyTags.push(...systemTags);
}

/**
 * Get the "Vocabularies" node from the metamodel as it contains the default vocabularies
 * defined for every content type.
 */
function getVocabulariesMetaNode(
  core: GmeClasses.Core,
  someNode: Core.Node,
): Core.Node | undefined {
  const metanodes = Object.values(core.getAllMetaNodes(someNode));
  const vocabNode = metanodes.find((node) =>
    core.getAttribute(node, "name") === "Vocabularies"
  );

  return vocabNode;
}

async function convertTaxonomyTags(
  req: Request,
  res: Response,
): Promise<void> {
  const { root, core } = (<WebgmeRequest> req).webgmeContext;
  const node = await Utils.findTaxonomyNode(core, root);

  // TODO: convert the following to a model error
  if (node == null) {
    res.status(400).send("No taxonomy node found");
    return;
  }

  const formatter = await TagFormatter.from(core, node);
  const { metadata } = req.body;
  try {
    metadata.taxonomyTags = formatter.toGuidFormat(metadata.taxonomyTags);
  } catch (err) {
    if (err instanceof TagFormatter.FormatError) {
      res.status(400).send(err.message);
    } else {
      throw err;
    }
  }
}

/**
 * Called before the server starts listening.
 * @param {function} callback
 */
function start(callback: () => void) {
  callback();
}

/**
 * Called after the server stopped listening.
 * @param {function} callback
 */
function stop(callback: () => void) {
  callback();
}

module.exports = {
  initialize: initialize,
  router: router,
  start: start,
  stop: stop,
};
