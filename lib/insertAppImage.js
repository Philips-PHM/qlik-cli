const https = require('https'),
    _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    Promise = require('promise'),
    getRequestOptions = require('./getRequestOptions.js');


module.exports = (settings, appId, properties) => {
    return new Promise((resolve, reject) => {
        if (settings.isDesktop) {
            // Uploading an image isn't supported in desktop mode.
            resolve();

            return;
        }

        const host = settings.endpoint.replace(/ws+:\/\//i, '').replace(/:\d*\/*/, ''),
            appPath = path.resolve(path.join(settings.path, settings.app)),
            xrfkey = 'ArbitraryChars00';

        var requestOptions = _.assign({}, getRequestOptions(settings), {
            hostname: host,
            port: 4242,
            method: 'POST',
            headers: {
                'x-qlik-xrfkey': xrfkey,
                'X-Qlik-User': 'UserDirectory=Internal; UserId=sa_repository',
                'Content-Type': 'image/png'
            }
        });

        const promiseFactories = [];

        fs.readdirSync(appPath)
            .forEach(file => {
                if (path.extname(file) !== '.png') {
                    return;
                }

                const fileFullPath = path.join(appPath, file),
                    options = _.assign({}, requestOptions, {
                        path: `/qrs/appcontent/${appId}/uploadfile?externalpath=${encodeURIComponent(file)}&overwrite=true&xrfkey=${xrfkey}`
                    });

                if (properties && properties.qThumbnail) {
                    properties.qThumbnail.qUrl = `/appcontent/${appId}/${file}`;
                }

                promiseFactories.push(() => executeRequest(options, fileFullPath));
            });

        executeSequentially(promiseFactories).then(resolve).catch(reject);
    });
}

function executeSequentially(promiseFactories) {
    let result = Promise.resolve();

    promiseFactories.forEach(function (promiseFactory) {
        result = result.then(promiseFactory);
    });

    return result;
}

function executeRequest(options, fileFullPath) {
    return new Promise((resolve, reject) => {
        console.log(`Uploading image: ${fileFullPath}`);

        const request = https.request(options, response => {
            if (response.statusCode >= 400) {
                reject(`${response.statusCode}: ${response.statusMessage}`);

                return;
            }
            response.on("data", data => {
                resolve(data);
            });
        }).on('error', error => {
            reject(error);
        });

        const fileContent = fs.readFileSync(fileFullPath);
        request.write(fileContent);
        request.end();
    });
}