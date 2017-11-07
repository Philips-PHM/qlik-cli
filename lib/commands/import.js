const importApp = require('../importApp.js'),
    chalk = require('chalk');

module.exports.command = 'import <app>';
module.exports.desc = 'Import Qlik App from json files';

module.exports.handler = settings => {
    importApp(settings)
        .then(() => process.exit(0))
        .catch(error => {
            console.error(chalk.red(JSON.stringify(error)));
            process.exit(1);
        });
};
