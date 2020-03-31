const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
 
async function scrapeListings(page) {
   -    await page.goto(
        "https://www.tvinna.is"
    );
    const html = await page.content();
    const $ = cheerio.load(html);
        const listings = $(".job-listing")
        .map((index, element) => {
            const titleStarf = $(element).find("h2" );
            const Starf = $(titleStarf).text();
            const Vinnustadur = $(element).find("p" );
            const Vinna = $(Vinnustadur).text();
            //const url = $(titleElement).attr(".ul > li > href");
            const timeElement = $(element).find("time");
            const datePosted = new Date($(timeElement).find("date").text());
            //const dagsetning = new Date($("time.date").text());
            // næ í gögnin gegnum console á crome með þessu $("time.date").text();
            return { Starf, Vinna, datePosted};
        })
        .get();
        console.log(listings);
}

async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const listings = await scrapeListings(page);
    console.log(listings);
}
main();