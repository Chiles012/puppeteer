const pageScrapper = require('./pageScrapper');

async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        await pageScrapper.scraper(browser);

    } catch ( error ) {
        console.log('No se pudo crear la instancia de la ventana => :', error);

    }

}

module.exports = ( browserInstance ) => scrapeAll(browserInstance);