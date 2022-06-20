const puppeteer = require("puppeteer");

const queryString = require("querystring");

const DateNotValidException = require("../exceptions/DateNotValidException");

const BASE_URL = "https://pratagy.letsbook.com.br/D/Reserva?";
class BrowserService {
  constructor(checkin, checkout) {
    this.checkin = checkin;
    this.checkout = checkout;
    this.params = {
      checkin: this.parseDateString(checkin),
      checkout: this.parseDateString(checkout),
      cidade: "",
      hotel: 12,
      adultos: 2,
      criancas: "",
      destino: "Pratagy Beach Resort All Inclusive",
      promocode: "",
      tarifa: "",
      mesCalendario: "",
    };
  }

  parseDateString(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }

  async getRooms() {
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}${queryString.stringify(this.params)}`, {
      waitUntil: "domcontentloaded",
    });

    await page.waitForSelector("#acomodacoesWrapper");

    // const error = await page.evaluate(() => {
    //   return document.querySelector(".hotel-selecionado-indisponivel-titulo")
    //     .innerText;
    // });

    // if (error) throw new DateNotValidException(error);

    await page.waitForSelector(".row-quarto");
    await page.waitForSelector(".slick-track img");

    const values = await page.evaluate(() => {
      const roomRows = Array.from(document.querySelectorAll(".row-quarto"));

      return roomRows.map((_, index) => {
        console.log(document.querySelectorAll(".slick-track img"));

        const image = document.querySelectorAll(".slick-track img")[index].src;
        const price = document.querySelectorAll(
          ".valorFinal.valorFinalDiscounted"
        )[index].innerText;
        const name = document.querySelectorAll(".quartoNome")[0].innerText;
        const description =
          document.querySelectorAll(".quartoDescricao")[0].innerText;

        return {
          image,
          price,
          name,
          description,
        };
      });
    });

    this.closeBrowser(browser);

    return values;
  }

  getBrowser() {
    return puppeteer.launch({ devtools: true });
  }

  closeBrowser(browser) {
    if (!browser) {
      return;
    }
    return browser.close();
  }
}

module.exports = BrowserService;