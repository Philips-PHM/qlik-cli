const Promise = require('promise'),
    _ = require('lodash'),
    chalk = require('chalk');

module.exports = (app, data) => {
    return new Promise((resolve, reject) => {
        if (!app || typeof app.createSessionObject !== 'function') {
            reject('Invalid app instance');

            return;
        };

        execute('bookmarks', app.createBookmark)
            .then(() => execute('dataconnections', app.createConnection))
            .then(() => execute('dimensions', app.createDimension))
            .then(() => execute('loadScript', app.setScript))
            .then(() => execute('measures', app.createMeasure))
            .then(() => execute('properties', app.setAppProperties))
            .then(() => execute('snapshots', app.createBookmark))
            .then(() => execute('variables', app.createVariableEx))
            .then(() => execute('sheets', setFullPropertyTree))
            .then(() => execute('stories', setFullPropertyTree))
            .then(() => execute('masterobjects', setFullPropertyTree))
            .then(() => execute('appprops', setFullPropertyTree))
            .then(resolve)
            .catch(reject)

        function execute(key, method) {
            method = method.bind(app);

            console.log(`Creating: ${key}`);

            const item = data[key];

            if (!item) {
                return Promise.resolve();
            }

            const promises = [];

            if (_.isArray(item)) {
                item.forEach(x => promises.push(method(x).catch(error => handleError(error, x))));
            }
            else {
                promises.push(method(item).catch(error => handleError(error, item)));
            }

            return Promise.all(promises);
        }
    });
};

function handleError(error, item) {
    const message = error.message;

    if (item.qName) {
        error.message = `${error.message}: ${item.qName}`;
    }

    if (message === 'Connection already exists') {
        console.log(chalk.yellow(` ${error.message}`));

        return;
    }

    throw error;
}

function setFullPropertyTree(item) {
    return this.createObject(item.qProperty)
        .then(object => object.setFullPropertyTree(item));
}