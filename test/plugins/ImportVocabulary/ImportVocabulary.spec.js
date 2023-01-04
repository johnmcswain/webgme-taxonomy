/*eslint-env node, mocha*/
/**
 * Generated by PluginGenerator 2.20.5 from webgme on Mon Dec 19 2022 15:33:19 GMT-0600 (Central Standard Time).
 */

describe('ImportVocabulary', function () {
    var testFixture = require('../../globals'),
        gmeConfig = testFixture.getGmeConfig(),
        expect = testFixture.expect,
        logger = testFixture.logger.fork('ImportVocabulary'),
        PluginCliManager = testFixture.WebGME.PluginCliManager,
        projectName = 'testProject',
        pluginName = 'ImportVocabulary',
        project,
        gmeAuth,
        storage,
        commitHash;

    before(async function () {
        gmeAuth = await testFixture.clearDBAndGetGMEAuth(gmeConfig, projectName);
        storage = testFixture.getMemoryStorage(logger, gmeConfig, gmeAuth);
        await storage.openDatabase();
        const importParam = {
            projectSeed: testFixture.path.join(testFixture.SEED_DIR, 'EmptyProject.webgmex'),
            projectName: projectName,
            branchName: 'master',
            logger: logger,
            gmeConfig: gmeConfig
        };

        const importResult = await testFixture.importProject(storage, importParam);
        project = importResult.project;
        commitHash = importResult.commitHash;
        await project.createBranch('test', commitHash);
    });

    after(async function () {
        await storage.closeDatabase();
        await gmeAuth.unload();
    });

    it('should throw error if no file provided', function (done) {
        var manager = new PluginCliManager(null, logger, gmeConfig),
            pluginConfig = {
            },
            context = {
                project: project,
                commitHash: commitHash,
                branchName: 'test',
                activeNode: '/',
            };

        manager.executePlugin(pluginName, pluginConfig, context, function (err, pluginResult) {
            try {
                expect(err.message).to.equal('Vocabulary file is required.');
                expect(pluginResult.success).to.equal(false);
            } catch (e) {
                done(e);
                return;
            }
            done();
        });
    });
});
