const exportApp = require('../exportApp.js'),
    chalk = require('chalk');

module.exports.command = 'export <app>';
module.exports.desc = 'Export Qlik App to json files';

module.exports.handler = args => {
    exportApp(args)
        .then(() => process.exit(0))
        .catch(error => {
            console.error(chalk.red(JSON.stringify(error)));
            process.exit(1);
        });
}
