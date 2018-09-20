const exportAllApps = require('../exportAllApps.js'),
    chalk = require('chalk');

module.exports.command = 'exportAll [app]';
module.exports.desc = 'Export all Qlik Apps matching app';

module.exports.handler = settings => {
    exportAllApps(settings)
        .then(() => process.exit(0))
        .catch(error => {
            console.log("In error");
            console.error(chalk.red(JSON.stringify(error)));
            process.exit(1);
        });
};
