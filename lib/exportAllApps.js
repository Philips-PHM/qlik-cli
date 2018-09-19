const path = require('path'),
    Promise = require('promise'),
    chalk = require('chalk'),
    exportApp = require('./exportApp.js'),
    getSession = require('./getSession.js'),
    wildcard = require('wildcard-regex'),
    _ = require('lodash');

let successCount = 0;    

module.exports = settings => {
    return new Promise((resolve, reject) => {
        if(!settings.app) {
            settings.app = "*";
        }
        console.log(chalk.green('Export all apps started for %s.'), settings.app);
        const appRegex = new RegExp(wildcard.wildcardPattern(settings.app), "i");

        const promiseFactories = [];
        const session = getSession(settings);
        session.open()
        .then(globalApi => {
            globalApi.getDocList() 
            .then(docList => {
                for (var index = 0; index < docList.length; index++) {
                    var qDocName = docList[index].qDocName;
                    if (appRegex.test(qDocName.replace('.qvf', ''))) {
                        var qDocId = docList[index].qDocId;
                        const appSettings = _.assign({}, settings);
                        appSettings.app = qDocName.replace('.qvf', '');
                        promiseFactories.push(() => exportApp(appSettings));
                    }
                }
                session.close().then(x => {
                    if (!promiseFactories || !promiseFactories.length) {
                        console.log('Resolving');
                        resolve();
                        return;
                    }

                executeSequentially(promiseFactories).then(resolve).catch(reject);
                 });
            });            
        });     
    });
};

function executeSequentially(promiseFactories) {
    let result = Promise.resolve();

    promiseFactories.forEach(function (promiseFactory) {
        result = result.then(promiseFactory);
    });
    result.then(x => {
        console.log(chalk.green('Export all apps completed.'));
    });
    
    return result;
}
