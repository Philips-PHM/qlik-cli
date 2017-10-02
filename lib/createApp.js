const Promise = require('promise');

module.exports = (globalApi, appName) => {
    return new Promise((resolve, reject) => {
        console.log(`Creating App: ${appName}`);

        globalApi.createApp(appName)
            .then(resolve)
            .catch(error => {
                if (error.message && error.message === 'App already exists') {
                    // Try again with a delay because the delete hasn't completed yet.
                    setTimeout(() => {
                        globalApi.createApp(appName)
                            .then(resolve)
                            .catch(reject);
                    }, 1000);

                    return;
                }

                reject(error);
            });
    });
};
