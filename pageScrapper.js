const scraperObject = {
    url: 'https://www.funko.com/shop',
    async scraper( browser ) {
        let funkos = [];
        let page = await browser.newPage();
        console.log(`Navegando en ${this.url}...`);
        await page.goto(this.url);

        for ( var i = 0; i <= 1; i++ ) {
            await page.waitForSelector('.row.commerce-product-container');
            await autoScroll(page);
            var auxFunko = await getFunko(page);
            auxFunko.map( funko => {
                funkos.push(funko);

            })
            page.click('button.next');

        }

        console.log(funkos,funkos.length);

    }

}

async function getFunko(page) {
    let urls = await page.$$eval('.commerce-products-list-item', divs => {
        divs = divs.map( div => {
            var href = div.querySelector('a > div.image-container div img.shopify-image').getAttribute('style');
            var description = div.querySelector('a > div.commerce-product-details .title strong').innerHTML;
            var price = div.querySelector('a > div.commerce-product-details .product-price').innerHTML.replace('USD&nbsp;', '');
            var a = div.querySelector('a').href;

            var product = {
                link: a,
                img: href.replace('background-image: url("', '').replace('")',''),
                description,
                price

            }
            return product;

        })

        return divs;

    });

    return urls;

}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

module.exports = scraperObject;