const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function scrapeListings(page) {
    -await page.goto(
        "https://www.tvinna.is"
    );
    const html = await page.content();
    const $ = cheerio.load(html);
    const listings = $(".job-listing > ul > li")
        .map((index, element) => {
            const titleStarf = $(element).find("h2");
            const Starf = $(titleStarf).text();
            const Vinnustadur = $(element).find("p");
            const Vinna = $(Vinnustadur).text();
            const url = $(element).find('a').attr('href')
            const timeElement = $(element).find("time");
            const datePosted = new Date($(timeElement).find(".year").text());
            return { Starf, Vinna, datePosted, url };
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