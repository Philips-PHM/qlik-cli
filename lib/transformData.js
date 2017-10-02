const Promise = require('promise'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    chalk = require('chalk'),
    beautify = require("js-beautify");

module.exports = (settings, data) => {
    return new Promise((resolve, reject) => {
        const transformPath = getTransformPath(settings);

        if (!transformPath) {
            resolve();

            return;
        }

        const transformAppPath = getTransformAppPath(transformPath, settings.app);

        Object.keys(data).forEach(key => {
            const transformFile = path.join(transformPath, `${key}.js`),
                transformAppFile = path.join(transformAppPath, `${key}.js`);
            let transformed = false;

            if (fs.existsSync(transformFile)) {
                console.log(`Executing transform: ${transformFile}`);

                data[key] = require(transformFile)(data[key]);
                transformed = true;
            }

            if (fs.existsSync(transformAppFile)) {
                console.log(`Executing transform: ${transformAppFile}`);

                data[key] = require(transformAppFile)(data[key]);
                transformed = true;
            }

            if (transformed) {
                displayKeyData(settings, key, data);
            }
        });

        resolve();
    });

    function displayKeyData(settings, key, data) {
        if (settings.info) {
            if (key === 'loadScript') {
                console.log(chalk.blue(data[key]));
            }
            else {
                console.log(chalk.blue(beautify(JSON.stringify(data[key]))));
            }
        }
    }

    function getTransformPath(settings) {
        if (!settings.transformPath) {
            if (settings.info) {
                console.log('No transform path provided.');
            }

            return;
        }

        const transformPath = path.resolve(settings.transformPath);

        if (!fs.existsSync(transformPath)) {
            if (settings.info) {
                console.log(chalk.yellow(`Transform path not found: ${transformPath}`))
            }

            return;
        }

        return transformPath;
    }

    function getTransformAppPath(transformPath, app) {
        const transformAppPath = path.join(transformPath, app);

        if (!fs.existsSync(transformAppPath)) {
            return '';
        }

        return transformAppPath;
    }
};    