# Introduction 
This command line tool will import/export Qlik applications from either Qlik Sense Server or Desktop.

# Installation process

To install the tool, you will need to create a .npmrc file with the configuration generated from the latest published module in the following package manager feed:

[eCC Analytics Tooling Package Manager Feed](http://usdbalrwd1mstf1.code1.emi.philips.com:8080/tfs/Out%20Patient/eCareCoordinator%20Analytics/eCareCoordinator%20Analytics%20Team/_packaging?feed=Tools&_a=feed)

1. Create a new folder for the tool - ```md qlik-cli```
2. Search for "qlik-cli" and use the directions in the "Connect to Feed" to add the repository configuration to a new ```.npmrc``` in the folder.  Also click the "generated npm credentials" link and add those lines to your .npmrc file as well.
3. In the folder execute ```npm install qlik-cli```

_Note: If you are on code1 behind the z-scaler proxy, you will need to set the following environment variables to support adding new npm modules to the project:_
```
SET HTTP_PROXY=http://amec.zscaler.philips.com:10015/
SET HTTPS_PROXY=http://amec.zscaler.philips.com:10015/
SET NO_PROXY=code1.emi.philips.com
```

# Developing

To git clone this it is suggested you set your git config using:

``git config --global credential.usdbalrwd1mstf1.integrated true``

you can then clone with:

``git clone http://usdbalrwd1mstf1.code1.emi.philips.com:8080/tfs/Out%20Patient/eCareCoordinator%20Analytics/_git/QlikCli``
