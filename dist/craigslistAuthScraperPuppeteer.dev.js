"use strict";

var puppeteer = require("puppeteer");

function main() {
  var browser, page;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(puppeteer.launch({
            headless: false
          }));

        case 3:
          browser = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(browser.newPage());

        case 6:
          page = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(page["goto"]("https://accounts.craigslist.org/login"));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(page.type("input#inputEmailHandle", "bjarnie3@googlemail.com"));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(page.type("input#inputPassword", "KxrMyYQA123@"));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(page.click("button#login"));

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(page.waitForNavigation());

        case 17:
          _context.next = 19;
          return regeneratorRuntime.awrap(page["goto"]("https://accounts.craigslist.org/login/home?show_tab=billing"));

        case 19:
          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
}

main();