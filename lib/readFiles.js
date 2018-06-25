const Promise = require('promise'),
    fs = require('fs'),
    path = require('path');

module.exports = settings => {
    const appPath = path.resolve(path.join(settings.path, settings.app));

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(appPath)) {
            reject(`Directory not found: ${appPath}`);

            return;
        }

        const data = {};

        fs.readdirSync(appPath)
            .forEach(file => {
                if(path.extname(file) !== '.json' && !(path.extname(file) === '.qvs' && path.basename(file, '.qvs').toLowerCase() === 'loadscript')) {
                    return;
                }
                                
                const name = path.basename(file, path.extname(file)),
                    fullPath = path.join(appPath, file);

                // Combine Sheet_*.json files into a single array named "sheets"
                if (name.substr(0,6).toLowerCase() === 'sheet_') {
                    if (!data.sheets) {
                        data.sheets = [];
                    }
                    data.sheets.push( getData(name, fullPath));
                } else {
                    data[name] = getData(name, fullPath);
                }
               
            });

        if (!Object.keys(data).length) {
            reject('No json files found.');

            return;
        }

        resolve(data);
    });
};

function getExtension(key) {
    if (key === 'loadScript') {
        return 'qvs';
    }

    return 'json';
}

function getData(key, fullPath) {
    console.log(`Reading: ${fullPath}`)

    if (key === 'loadScript') {
        return fs.readFileSync(fullPath, "utf8");
    }

    return require(fullPath);
}