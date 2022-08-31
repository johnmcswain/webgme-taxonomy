const pdpBase = "https://leappremonitiondev.azurewebsites.net/";
const fetch = require("node-fetch");
const _ = require("underscore");

class PDP {
  constructor(token) {
    this.token = token;
  }

  async listArtifacts(type) {
    const allProcesses = await this._fetch(
      "v2/Process/ListProcesses?permission=read"
    );
    console.log({ allProcesses });
    const processList = allProcesses.filter(
      (element) => element.processType === type
    );

    const processObservations = await Promise.all(
      processList.map(
        async (process) => await this.getProcessObservations(process.processId)
      )
    );

    console.log({ processObservations });
    return processObservations.flat();
  }

  async getDownloadUrls(processId, obsIndex, version) {
    const queryDict = _.mapObject(
      {
        processId,
        obsIndex,
        version,
        endObsIndex: obsIndex,
      },
      encodeURIComponent
    );
    console.log("getDownloadUrls:", queryDict);
    const queryString = Object.entries(queryDict)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const url = `v3/Files/GetObservationFiles?${queryString}`;
    const opts = {
      method: "PUT",
    };
    const result = await this._fetch(url, opts);
    console.log(result);
    await sleep(5000); // FIXME: check for it to be ready. Not very pretty currently...
    return result.files.map((file) => file.sasUrl);
  }

  async getProcessObservations(pid) {
    const obsInfo = await this._fetch(
      `v2/Process/GetProcessState?processId=${pid}`
    );

    const observations = await Promise.all(
      range(1, obsInfo.numObservations).map((i) =>
        this._fetch(
          "v2/Process/GetObservation?processId=" + pid + "&obsIndex=" + i
        )
      )
    );

    return observations;
  }

  async createArtifact(type, metadata) {
    const { processId } = await this._createProcess(type);
    await this._appendObservation(processId, type, metadata);
    // TODO: upload the data file
  }

  async _appendObservation(processId, type, data) {
    const observation = {
      isFunction: false,
      processType: type,
      processId,
      isMeasure: false,
      index: 0,
      version: 0,
      applicationDependencies: [],
      processDependencies: [],
      data: [data],
      dataFiles: [],
    };
  }

  async _createProcess(type) {
    const url = `v2/Process/CreateProcess?isFunction=false&isVirtual=false&processType=${encodeURIComponent(
      type
    )}`;
    return await this._fetch(url);
  }

  async _fetch(url, opts = {}) {
    url = pdpBase + url;
    opts.headers = opts.headers || {};
    opts.headers.Authorization = "Bearer " + this.token;
    opts.headers.accept = opts.headers.accept || "application/json";
    const response = await fetch(url, opts);
    // TODO: Check response status code
    return await response.json();
  }

  static from(req) {
    const token = require("./token");
    //return req.cookies[mainConfig.authentication.azureActiveDirectory.cookieId];
    return new PDP(token);
  }
}

async function sleep(duration) {
  return new Promise((res) => setTimeout(res, duration));
}

function range(start, end) {
  const len = end - start;
  return [...new Array(len)].map((v, index) => start + index);
}

module.exports = PDP;
