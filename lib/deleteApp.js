const Promise = require('promise'),
    _ = require('lodash');

module.exports = (globalApi, appName) => {
    return new Promise((resolve, reject) => {
        globalApi.getDocList()
            .then(docList => _.find(docList, doc => {
                if (doc.qDocName.toLowerCase().replace('.qvf', '') == appName.toLowerCase()) {
                    console.log(`Deleting App: ${appName}`);

                    globalApi.deleteApp(doc.qDocId);

                    return;
                }
            }))
            .then(resolve)
            .catch(reject);
    });
};
