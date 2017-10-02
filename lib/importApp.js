const path = require('path'),
    Promise = require('promise'),
    chalk = require('chalk'),
    _ = require('lodash'),
    getSession = require('./getSession.js'),
    deleteApp = require('./deleteApp.js'),
    createApp = require('./createApp.js'),
    readFiles = require('./readFiles.js'),
    insertAppMetadata = require('./insertAppMetadata.js'),
    insertAppImage = require('./insertAppImage.js'),
    transformData = require('./transformData.js');

module.exports = settings => {
    return new Promise((resolve, reject) => {
        console.log(chalk.green('Import started.'));

        let globalApi, app, data, session, appId;

        readFiles(settings)
            .then(x => data = x)
            .then(() => transformData(settings, data))
            .then(() => getSession(settings))
            .then(x => session = x)
            .then(() => session.open())
            .then(x => globalApi = x)
            .then(() => deleteApp(globalApi, settings.app))
            .then(() => createApp(globalApi, settings.app))
            .then(x => appId = x.qAppId)
            .then(() => globalApi.openDoc(appId))
            .then(x => app = x)
            .then(() => insertAppImage(settings, appId, data.properties))
            .then(() => insertAppMetadata(app, data))
            .then(() => {
                if (settings.isDesktop) {
                    return app.doSave();
                }
            })
            .then(() => session.close())
            .then(() => console.log(chalk.green('Import completed.')))
            .then(resolve)
            .catch(reject);
    });
};
