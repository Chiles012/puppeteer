const puppeteer = require('puppeteer');

async function startBrowser() {
    let browser;
    try {
        console.log('Abriendo la ventana...');
        browser = await puppeteer.launch({
            headless: false,
            args: [ "--disable-setuid-sandbox" ],
            'ignoreHTTPSErrors': true

        });

    } catch ( error ) {
        console.log('No se pudo crear la instancia de la ventana => :', error);

    }

    return browser;

}

module.exports = {
    startBrowser

}