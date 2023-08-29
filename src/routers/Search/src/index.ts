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
const router = express.Router();

import SystemTerm from "./SystemTerm";
import UploadContext, { FileUpload } from "./UploadContext";
import RouterUtils, { UserError } from "../../../common/routers/Utils";
import type {
  MiddlewareOptions,
  WebgmeContext,
  WebgmeRequest,
} from "../../../common/types";
import Utils from "../../../common/Utils";
import { isString } from "./Utils";
import DashboardConfiguration from "../../../common/SearchFilterDataExporter";
import TagFormatter from "../../../common/TagFormatter";
import path from "path";
import fsp from "fs/promises";
const staticPath = path.join(__dirname, "..", "dashboard", "public");
import StorageAdapter from "./adapters";
import {
  ChildContentTypeNotFoundError,
  MetaNodeNotFoundError,
  TaxNodeNotFoundError,
} from "./adapters/common/ModelError";
import TaskQueue, { DownloadTask, FilePath } from "./TaskQueue";
import { ArtifactMetadata, UploadReservation } from "./adapters/common/types";

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
    RouterUtils.handleUserErrors(logger, async function listRepos(req, res) {
      const storage = await StorageAdapter.from(
        req.webgmeContext,
        req,
        mainConfig,
      );
      const artifacts = await storage.listRepos();
      res.status(200).json(artifacts).end();
    }),
  );

  router.get(
    RouterUtils.getContentTypeRoutes("artifacts/:repoId"),
    RouterUtils.handleUserErrors(
      logger,
      async function listArtifacts(req, res) {
        const { repoId } = req.params;
        const storage = await StorageAdapter.from(
          req.webgmeContext,
          req,
          mainConfig,
        );
        const artifacts = await storage.listArtifacts(repoId);
        res.status(200).json(artifacts).end();
      },
    ),
  );

  router.post(
    RouterUtils.getContentTypeRoutes("artifacts/"),
    RouterUtils.handleUserErrors(
      logger,
      async function createRepo(req, res) {
        const userId = middlewareOpts.getUserId(req);
        let metadata: ArtifactMetadata = getArtifactMetadata(
          <WebgmeRequest> req,
        );

        // Upload to the storage backend
        const storage = await StorageAdapter.from(
          req.webgmeContext,
          req,
          mainConfig,
        );
        const status = await storage.withRepoReservation(
          async (reservation) => {
            const gmeContext = (<WebgmeRequest> req).webgmeContext;
            await addSystemTags(
              metadata,
              reservation,
              gmeContext,
              userId,
            );
            await toGuidFormat(
              gmeContext,
              metadata,
            );
            return await storage.createArtifact(reservation, metadata);
          },
        );

        res.json("status: " + status);
      },
    ),
  );

  router.post(
    RouterUtils.getContentTypeRoutes("artifacts/:repoId/append"),
    RouterUtils.handleUserErrors(
      logger,
      async function appendContent(req, res) {
        const userId = middlewareOpts.getUserId(req);
        let metadata: ArtifactMetadata = getArtifactMetadata(
          <WebgmeRequest> req,
        );

        const { repoId } = req.params;
        const storage = await StorageAdapter.from(
          req.webgmeContext,
          req,
          mainConfig,
        );

        const appendResult = await storage.withContentReservation(
          async (reservation) => {
            const gmeContext = (<WebgmeRequest> req).webgmeContext;
            await addChildSystemTags(
              metadata,
              reservation,
              gmeContext,
              userId,
            );
            await toGuidFormat(
              gmeContext,
              metadata,
            );
            return await storage.appendArtifact(
              reservation,
              req.body.metadata,
              req.body.filenames,
            );
          },
          repoId,
        );

        appendResult.files.forEach((file) => {
          const isRelative = file.params.url.startsWith("./");
          if (isRelative) {
            const baseUrl = req.originalUrl
              .split(`artifacts/${repoId}/append`)
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
    RouterUtils.getContentTypeRoutes("artifacts/:parentId/files/"),
    RouterUtils.handleUserErrors(
      logger,
      async function downloadContentURL(req, res) {
        const { parentId } = req.params;
        // TODO: get the IDs for the specific observations to get
        let ids;
        if (isString(req.query.ids)) {
          ids = JSON.parse(req.query.ids);
        } else {
          res.status(400).send("List of artifact IDs required");
          return;
        }

        //const formatter = await getFormatter(req.webgmeContext);
        const storage = await StorageAdapter.from(
          req.webgmeContext,
          req,
          mainConfig,
        );

        // need to download the urls of the associated observations ids
        const urlResponse = await storage.downloadFileURLs(parentId, ids);
        res.json(urlResponse);
      },
    ),
  );

  router.get(
    RouterUtils.getContentTypeRoutes("artifacts/:parentId/:id/metadata.json"),
    RouterUtils.handleUserErrors(
      logger,
      async function getMetadata(req, res) {
        const { parentId, id } = req.params;
        const formatter = await getFormatter(req.webgmeContext);
        const storage = await StorageAdapter.from(
          req.webgmeContext,
          req,
          mainConfig,
        );
        const metadata = await storage.getMetadata(
          parentId,
          id,
          formatter,
        );

        res.json(metadata);
      },
    ),
  );

  router.get(
    RouterUtils.getContentTypeRoutes("artifacts/:parentId/metadata.jsonl"),
    RouterUtils.handleUserErrors(
      logger,
      async function getBulkMetadata(req, res) {
        const { parentId } = req.params;
        let ids: string[];
        if (isString(req.query.ids)) {
          ids = JSON.parse(req.query.ids);
        } else {
          res.status(400).send("List of artifact IDs required");
          return;
        }
        const MAX_THRESHOLD = 20000;
        if (ids.length > MAX_THRESHOLD) {
          res.status(400).send("Too many content IDs");
          return;
        }

        const formatter = await getFormatter(req.webgmeContext);
        const storage = await StorageAdapter.from(
          req.webgmeContext,
          req,
          mainConfig,
        );
        const metadata = await storage.getBulkMetadata(
          parentId,
          ids,
          formatter,
        );

        const metadataLines = metadata
          .map((md) => JSON.stringify(md))
          .join("\n");

        res.send(metadataLines);
      },
    ),
  );

  const downloadQueue: TaskQueue<DownloadTask, FilePath> = new TaskQueue();
  router.post(
    RouterUtils.getContentTypeRoutes("artifacts/:parentId/downloads/"),
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
        const formatter = await getFormatter(req.webgmeContext);
        const storage = await StorageAdapter.from(
          req.webgmeContext,
          req,
          mainConfig,
        );
        const task = new DownloadTask(
          logger,
          storage,
          formatter,
          parentId,
          ids,
        );
        const id = downloadQueue.submitTask(task);
        res.json(id);
      },
    ),
  );

  router.get(
    RouterUtils.getContentTypeRoutes(
      "artifacts/:parentId/downloads/:taskId/status",
    ),
    RouterUtils.handleUserErrors(
      logger,
      async function getDownloadTaskStatus(req, res) {
        const { taskId } = req.params;
        const status = downloadQueue.getStatus(parseInt(taskId));
        res.json(status);
      },
    ),
  );

  router.get(
    RouterUtils.getContentTypeRoutes(
      "artifacts/:parentId/downloads/:taskId",
    ),
    RouterUtils.handleUserErrors(
      logger,
      async function getDownloadContent(req, res) {
        const { taskId } = req.params;
        const zipPath = downloadQueue.getResult(parseInt(taskId));
        const tmpDir = path.dirname(zipPath);

        res.download(
          zipPath,
          path.basename(zipPath),
        );

        await RouterUtils.responseClose(res);
        await fsp.rm(tmpDir, { recursive: true });
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
  metadata: ArtifactMetadata,
  reservation: UploadReservation,
  gmeContext: WebgmeContext,
  userId: string,
  filenames: string[] = [],
) {
  const { core, contentType } = gmeContext;
  const childContentType = (await core.loadChildren(contentType))
    .find((n) =>
      core.getAttribute(core.getBaseType(n), "name") === "Content Type"
    );

  if (!childContentType) {
    throw new ChildContentTypeNotFoundError(gmeContext, contentType);
  }

  return addContentTypeSystemTags(
    childContentType,
    metadata,
    reservation,
    gmeContext,
    userId,
    filenames,
  );
}

async function addSystemTags(
  metadata: ArtifactMetadata, // FIXME: what is the actual type here?
  reservation: UploadReservation,
  gmeContext: WebgmeContext,
  userId: string,
  filenames: string[] = [],
) {
  const { contentType } = gmeContext;

  return addContentTypeSystemTags(
    contentType,
    metadata,
    reservation,
    gmeContext,
    userId,
    filenames,
  );
}

async function addContentTypeSystemTags(
  contentType: Core.Node,
  metadata: ArtifactMetadata,
  reservation: UploadReservation,
  gmeContext: WebgmeContext,
  userId: string,
  filenames: string[] = [],
) {
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
  const files: FileUpload[] = filenames.map((path: string) => ({
    path,
  }));
  const uri: string | undefined = reservation.uri;

  const context = await UploadContext.from({
    name: metadata.displayName,
    description: desc,
    tags: metadata.taxonomyTags,
    files,
    core,
    contentType,
    project: projectVersion,
    userId,
    uri,
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

/**
 * Convert the taxonomy tags in the metadata to GUID format.
 */
async function toGuidFormat(
  gmeContext: WebgmeContext,
  metadata: ArtifactMetadata,
): Promise<ArtifactMetadata> {
  const formatter = await getFormatter(gmeContext);
  try {
    metadata.taxonomyTags = formatter.toGuidFormat(metadata.taxonomyTags);
    return metadata;
  } catch (err) {
    // A stop-gap solution until FormatError actually inherits from UserError
    if (err instanceof TagFormatter.FormatError) {
      throw new UserError(err.message);
    } else {
      throw err;
    }
  }
}

async function getFormatter(gmeContext: WebgmeContext): Promise<TagFormatter> {
  const { root, core } = gmeContext;
  const node = await Utils.findTaxonomyNode(core, root);
  if (node == null) {
    throw new TaxNodeNotFoundError(gmeContext);
  }
  return await TagFormatter.from(core, node);
}

/**
 * Retrieve the artifact metadata from the request. Initialize it if none provided.
 */
function getArtifactMetadata(req: WebgmeRequest): ArtifactMetadata {
  const gmeContext = req.webgmeContext;
  const projectVersion = gmeContext.projectVersion;

  // TODO: check if it is a tags file...
  let metadata: ArtifactMetadata = req.body.metadata;

  // TODO: check if the project version and metadata tags are compatible
  // if not, throw a UserError
  metadata.taxonomyTags = metadata.taxonomyTags || [];
  metadata.taxonomyVersion = projectVersion;

  return metadata;
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
