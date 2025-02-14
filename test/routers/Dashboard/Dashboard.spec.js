describe.skip("Dashboard", function () {
  var testFixture = require("../../globals"), // TODO: May need to change this if not created from webgme-cli
    superagent = testFixture.superagent,
    expect = testFixture.expect,
    gmeConfig = testFixture.getGmeConfig(),
    server = testFixture.WebGME.standaloneServer(gmeConfig),
    // TODO: If not using webgme-cli, replace the mntPt w/ the desired mount point
    // If using the webgme-cli, this will look up the mount point for the given router
    mntPt =
      require("../../../webgme-setup.json").components.routers["Dashboard"]
        .mount,
    urlFor = function (action) {
      return [
        server.getUrl(),
        mntPt,
        action,
      ].join("/");
    };

  before(function (done) {
    server.start(done);
  });

  after(function (done) {
    server.stop(done);
  });

  it("should post to /postExample", function (done) {
    superagent.post(urlFor("postExample"))
      .end(function (err, res) {
        try {
          expect(res.statusCode).to.equal(201);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it("should delete to /deleteExample", function (done) {
    superagent.delete(urlFor("deleteExample"))
      .end(function (err, res) {
        try {
          expect(res.statusCode).to.equal(204);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it("should patch to /patchExample", function (done) {
    superagent.patch(urlFor("patchExample"))
      .end(function (err, res) {
        try {
          expect(res.statusCode).to.equal(200);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it("should get to /getExample", function (done) {
    superagent.get(urlFor("getExample"))
      .end(function (err, res) {
        try {
          expect(res.statusCode).to.equal(200);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it("should get to /error", function (done) {
    superagent.get(urlFor("error"))
      .end(function (err, res) {
        try {
          expect(res.statusCode).to.equal(500);
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});
