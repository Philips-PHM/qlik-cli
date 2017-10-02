const schema = require('enigma.js/schemas/3.2.json'),
    enigma = require('enigma.js'),
    WebSocket = require('ws'),
    getRequestOptions = require('./getRequestOptions.js');

module.exports = settings => {
    const url = `${settings.endpoint}${settings.endpoint.endsWith('/') ? '' : '/'}app/engineData`;

    // Assumes non-secure is desktop.
    settings.isDesktop = settings.endpoint.toLowerCase().startsWith("ws://");

    console.log(`Creating session: ${url}`);

    const session = enigma.create({
        schema,
        url,
        createSocket: url => new WebSocket(url, getRequestOptions(settings))
    });

    return session;
}
