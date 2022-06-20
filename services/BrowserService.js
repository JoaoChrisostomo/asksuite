const puppeteer = require('puppeteer');

const queryString = require('querystring')

const BASE_URL = 'https://pratagy.letsbook.com.br/D/Reserva?'
class BrowserService {
    constructor(checkin, checkout) {
        this.checkin = checkin;
        this.checkout = checkout;
        this.params = {
            checkin: this.parseDateString(checkin),
            checkout: this.parseDateString(checkout),
            cidade: '',
            hotel: 12,
            adultos: 2,
            criancas: '',
            destino: 'Pratagy Beach Resort All Inclusive',
            promocode: '',
            tarifa: '',
            mesCalendario: ''
        }
    }

    parseDateString(dateString){
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`
    }

    async crawl(){
        const browser = await this.getBrowser();
        const page = await browser.newPage();
        await page.goto(`${BASE_URL}${queryString.stringify(this.params)}`, {waitUntil: 'networkidle2'})
        // await page.waitForSelector('.valorFinal .valorFinalDiscounted')
        // const element = await page.$('.valorFinal .valorFinalDiscounted')
        // console.log(element)
        await page.evaluate(() => {
            debugger;
          });
        // this.closeBrowser(browser);
    };

    getBrowser() {
        return puppeteer.launch({devtools: true});
    }

    closeBrowser(browser) {
        if (!browser) {
            return;
        }
        return browser.close();
    }
}



module.exports = BrowserService;

/*
https://pratagy.letsbook.com.br/D/Reserva?checkin=21%2F06%2F2022&checkout=25%2F06%2F2022&cidade=&hotel=12&adultos=2&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=6%2F14%2F2022
*/