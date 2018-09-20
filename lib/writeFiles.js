const Promise = require('promise'),
    fs = require('fs-extra'),
    path = require('path'),
    beautify = require("js-beautify"),
    _ = require('lodash');

module.exports = (data, appPath) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(appPath)) {
            fs.mkdirpSync(appPath);
        }

        Object.keys(data)
            .forEach(key => {
                const item = data[key],
                    content = getContent(key, item),
                    extension = getExtension(key),
                    filePath = path.resolve(path.join(appPath, `${key}.${extension}`));

                console.log(`Writing: ${filePath}`);

                fs.writeFileSync(filePath, content);
            });

        resolve();
    });
};

function getExtension(key) {
    if (key === 'loadScript') {
        return 'qvs';
    }

    return 'json';
}

function getContent(key, item) {
    if (key === 'loadScript') {
        return item;
    }

    return beautify(JSON.stringify(item));
}