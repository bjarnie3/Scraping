"use strict";

var request = require("request-promise").defaults({
  jar: true
});

var fs = require("fs");

function main() {
  var html, billingHtml;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(request.post("https://accounts.craigslist.org/login", {
            form: {
              inputEimailHandle: "bjarnie3@googlemail.com",
              inputPassword: "KxrMyYQA123@"
            },
            headers: {
              Referer: "https://accounts.craigslist.org/login?rt=L$rp=%2Flogin%2Fhome"
            },
            simple: false,
            followAllRedirects: true
          }));

        case 3:
          html = _context.sent;
          fs.writeFileSync("./craigslistlogin.html", html);
          _context.next = 7;
          return regeneratorRuntime.awrap(request.get("https://accounts.craigslist.org/login/home?show_tab=billing"));

        case 7:
          billingHtml = _context.sent;
          fs.writeFileSync("./billing.html", billingHtml);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

main();