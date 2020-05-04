const request = require("request-promise").defaults({ jar: true });
const fs = require("fs");

async function main() {
    try {
        const html = await request.post("https://accounts.craigslist.org/login", {
            form: {
                inputEimailHandle: "bjarnie3@googlemail.com",
                inputPassword: "KxrMyYQA123@"
            },
            headers: {
                Referer: "https://accounts.craigslist.org/login?rt=L$rp=%2Flogin%2Fhome"
            },
            simple: false,
            followAllRedirects: true
        });
        fs.writeFileSync("./craigslistlogin.html", html);

        const billingHtml = await request.get(
            "https://accounts.craigslist.org/login/home?show_tab=billing"
        );
        fs.writeFileSync("./billing.html", billingHtml);
    } catch (error) {
        console.error(error);
    }
}

main();