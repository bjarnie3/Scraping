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
            const titleElement = $(element).find("h2" );
            const title = $(titleElement).text();
            
            const jobElement = $(element).find("p" );
            const job = $(jobElement).text();
            
            const partjob = $(element).find(".fullt-starf" );
            const part = $(partjob).text();
            
            const timeElement = $(element).find(".date");
            const datePosted = new Date($(timeElement).find(".year"));
            
            const url = $(titleElement).attr("href");
            
            return { title, job, part, url, datePosted };
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