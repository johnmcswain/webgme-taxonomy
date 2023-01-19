import TaxonomyReference from "./TaxonomyReference";
import {assert, filterMap, Result} from './Utils';

class Storage {
  baseUrl: string;
  constructor() {
    const chunks = window.location.href.split('/'); // TODO:
    chunks.pop();
    chunks.pop();
    this.baseUrl = chunks.join('/') + '/artifacts/';
  }

  async listArtifacts(): Promise<ArtifactSet[]> {
    const result = await this._fetchJson(this.baseUrl, null, ListError);
    const items: any[] = await result.unwrap();
    return filterMap(items, item => ArtifactSet.tryFrom(item));
  }

  async getDownloadUrl(parentId, ...ids) {
    // TODO: add item IDs
    const qs = `ids=${encodeURIComponent(JSON.stringify(ids))}`;
    return this.baseUrl + parentId + `/download?${qs}`;
  }

  async _uploadFile(uploadReq, file: File) {
    const opts = {
      method : uploadReq.params.method,
      headers : uploadReq.params.headers,
      body : file
    };
    return (await this._fetch(uploadReq.params.url, opts, AppendDataError))
        .unwrap();
  }

  async appendArtifact(artifactSet, metadata, files: File[]) {
    console.log({action : 'append', metadata, files});
    const url = this.baseUrl + artifactSet.id + '/append';
    const filenames = files.map((file: File) => file.name);

    // const myString = await this.readFile(files[0])
    // console.log(myString)

    const opts = {
      method : 'post',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
        metadata,
        filenames,
      })
    };

    const appendResult = await (await this._fetchJson(url, opts, AppendDataError))
                             .unwrap();

    const uploadTasks = appendResult.files.map(async (upload) => {
      const targetFile = files.find(a => a.name == upload.name);
      assert(
          !!targetFile,
          new AppendDataError('Could not find upload info for ' + upload.name));
      await this._uploadFile(upload, targetFile);
    });

    await Promise.all(uploadTasks);

    console.log('Append artifact:', metadata, files);
  }

  async updateArtifact(metadata, newContent) {
    console.log('Updating artifact:', metadata, newContent);
  }

  async createArtifact(metadata, files) {
    console.log('Creating artifact:', metadata, files);
    metadata.taxonomyTags = metadata.taxonomyTags || [];
    const opts = {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        metadata,
      })
    };
    return (await this._fetchJson(this.baseUrl, opts, CreateError))
        .unwrap();
  }

  async _fetch(url: string, opts = null, ErrorClass=RequestError) {
    const response = await fetch(url, opts);
    let error = null;
    if (response.status === 422) {
      const data = await response.json();
      const context = new ModelContext(
          data.context.projectId, data.context.branch, data.context.nodeId);
      error = new ModelError(data.message, context);
    } else if (response.status > 399) {
      error = new ErrorClass(await response.text());
    }
    return new Result(response, error);
  }

  async _fetchJson(url: string, opts = null, ErrorClass=RequestError) {
    return (await this._fetch(url, opts, ErrorClass)).map(response => response.json());
  }
}

export class RequestError extends Error {
  constructor(msg: string) { super(msg); }
}

class ModelContext {
  projectId: string;
  nodeId: string;
  branch: string; // FIXME: this could be a commit or something instead

  constructor(projectId: string, branch: string, nodeId: string) {
    this.projectId = projectId;
    this.nodeId = nodeId;
    this.branch = branch;
  }

  toQueryParams(): string {
    const params = {
      project : this.projectId,
      branch : this.branch,
      node : this.nodeId,
    };
    return Object.entries(params)
        .map(([ k, v ]) => k + '=' + encodeURIComponent(v))
        .join('&');
  }
}

export class ModelError extends Error {
  context: ModelContext;

  constructor(msg: string, context: ModelContext) {
    super(msg);
    this.context = context;
  }
}

class StorageError extends RequestError {
  constructor(actionDisplayName: string, msg: string) {
    super(`Unable to ${actionDisplayName}: ${msg}`);
  }
}

class ListError extends StorageError {
  constructor(msg: string) {
    super('list artifacts', msg); // FIXME: rename "artifact"?
  }
}

class DownloadError extends StorageError {
  constructor(msg: string) { super('download', msg); }
}

class CreateError extends StorageError {
  constructor(msg: string) { super('create', msg); }
}

class AppendDataError extends StorageError {
  constructor(msg: string) { super('append', msg); }
}

class ArtifactSet {
  static tryFrom(item: any) {
    if (!item.displayName) {
      console.log("Found malformed data. Filtering out. Data:", item);
    } else {
      const hash =
          [ item.id, ...item.children.map(child => child.id).sort() ].join('/');
      item.hash = hash;
      item.children = item.children.map(child => {
        if (child.taxonomy) {
          child.taxonomy = TaxonomyReference.from(child.taxonomy);
        }
        return child;
      });
      return item;
    }
  }
}

export default Storage;
