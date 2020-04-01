"use strict";

var request = require("request-promise");

var fs = require("fs");

function getHtml(url) {
  var html;
  return regeneratorRuntime.async(function getHtml$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(request.get(url));

        case 2:
          html = _context.sent;
          return _context.abrupt("return", html);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function saveHtmlToFile(html) {
  fs.writeFileSync("./test.html", html);
}

function main() {
  var html;
  return regeneratorRuntime.async(function main$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getHtml("https://sfbay.craigslist.org/d/musicians/search/muc"));

        case 2:
          html = _context2.sent;
          saveHtmlToFile(html);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

main();