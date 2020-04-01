"use strict";

var request = require("request-promise");

var parser = require("./parser");

function getHtmlFromUrl(url) {
  var html;
  return regeneratorRuntime.async(function getHtmlFromUrl$(_context) {
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

function main(url) {
  var html, listings;
  return regeneratorRuntime.async(function main$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getHtmlFromUrl(url));

        case 2:
          html = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(parser.getListings(html));

        case 5:
          listings = _context2.sent;
          console.log(listings);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}

main("https://sfbay.craigslist.org/d/musicians/search/muc");