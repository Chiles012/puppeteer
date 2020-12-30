const browserObject = require('./browser');
const scrapperController = require('./pageController');

let browserInstance = browserObject.startBrowser();

scrapperController(browserInstance);