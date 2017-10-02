#!/usr/bin/env node
const path = require('path');

require('yargs')
    .commandDir('lib/commands')
    .option('endpoint', {
        alias: 'e',
        describe: 'Websocket endpoint used when connecting to Qlik Desktop/Server.',
        default: 'ws://localhost:4848/'
    })
    .option('path', {
        alias: 'p',
        describe: 'Import/Output root path that contains App folders.',
        default: process.cwd()
    })
    .option('user', {
        alias: 'u',
        describe: 'User name used when connecting to Qlik Server.',
        default: process.env.userName
    })
    .option('domain', {
        alias: 'd',
        describe: 'User domain used when connecting to Qlik Server.',
        default: process.env.userDomain
    })
    .option('certPath', {
        alias: 'c',
        describe: 'Path to certificates used when connecting to Qlik Server.  Must include these files: client.pem, client_key.pem, and root.pem',
        default: ''
    })
    .option('transformPath', {
        alias: 't',
        describe: 'Configuration transform root path that contains App folders.'
    })
    .option('info', {
        alias: 'i',
        describe: 'Log info messages.',
        default: false
    })    
    .demandCommand()
    .help()
    .wrap(150)
    .argv