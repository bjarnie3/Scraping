const puppeteer = require("puppeteer");

async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://accounts.craigslist.org/login");
        await page.type("input#inputEmailHandle", "bjarnie3@googlemail.com");
        await page.type("input#inputPassword", "KxrMyYQA123@");
        await page.click("button#login");
        await page.waitForNavigation();
        await page.goto("https://accounts.craigslist.org/login/home?show_tab=billing");
    }
     catch (error) {
        console.error(error)
    }
}

main();