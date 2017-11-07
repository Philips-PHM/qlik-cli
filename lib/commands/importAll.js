const importAllApps = require('../importAllApps.js'),
    chalk = require('chalk');

module.exports.command = 'importAll';
module.exports.desc = 'Import all Qlik Apps';

module.exports.handler = settings => {
    importAllApps(settings)
        .then(() => process.exit(0))
        .catch(error => {
            console.error(chalk.red(JSON.stringify(error)));
            process.exit(1);
        });
};
