[![Build status](https://ci.appveyor.com/api/projects/status/gio9w8mqglhn5g0j?svg=true)](https://ci.appveyor.com/project/tombrothers/qlik-cli)

[![npm version](https://badge.fury.io/js/qlik-cli.svg)](https://badge.fury.io/js/qlik-cli)

# qlik-cli

A command line tool to import/export apps from Qlik Sense Desktop or Server

## Introduction 
The qlik-cli is a tool that enables Qlik Sense applications to integrate into a DevOps CI/CD workflows. It supports the workflow from the developer desktop to the operational server deployments.   Qlik Sense represents it’s packaged application in binary form (.QVF).  Binary formats cannot be effectively managed in traditional configuration management and version control systems.  The QVF binary format also mixes application development with environmental configuration concerns that can only be overcome with manual procedures during operational deployment.

## Installing
Make sure you have [Node.js](http://nodejs.org/) installed.
```
npm install qlik-cli --global
```

## Command Line
```
qlik-cli

Commands:
  export <app>  Export Qlik App to json files
  import <app>  Import Qlik App from json files
  importAll     Import all Qlik Apps

Options:
  --version            Show version number
  --endpoint, -e       Websocket endpoint used when connecting to Qlik Desktop/Server.                               [default: "ws://localhost:4848/"]
  --path, -p           Import/Output root path that contains App folders.                                                 [default: "D:\dev\qlik-cli"]
  --user, -u           User name used when connecting to Qlik Server.                                                               [default: "linde"]
  --domain, -d         User domain used when connecting to Qlik Server.                                                   [default: "DESKTOP-APOG7N6"]
  --certPath, -c       Path to certificates used when connecting to Qlik Server.  Must include these files: client.pem, client_key.pem, and root.pem
                                                                                                                                         [default: ""]
  --transformPath, -t  Configuration transform root path that contains App folders.
  --info, -i           Log info messages.                                                                                             [default: false]
  --help               Show help                                                                                                             [boolean]
```



