"use strict";

var puppeteer = require("puppeteer");

var cheerio = require("cheerio");

function scrapeListings(page) {
  var html, $, listings;
  return regeneratorRuntime.async(function scrapeListings$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(page["goto"]("https://www.tvinna.is"));

        case 2:
          -_context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(page.content());

        case 5:
          html = _context.sent;
          $ = cheerio.load(html);
          listings = $(".job-listing > ul > li").map(function (index, element) {
            var titleStarf = $(element).find("h2");
            var Starf = $(titleStarf).text();
            var Vinnustadur = $(element).find("p");
            var Vinna = $(Vinnustadur).text();
            var url = $(element).find('a').attr('href');
            var timeElement = $(element).find("time");
            var datePosted = new Date($(timeElement).find(".year").text());
            return {
              Starf: Starf,
              Vinna: Vinna,
              datePosted: datePosted,
              url: url
            };
          }).get();
          console.log(listings);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

function main() {
  var browser, page, listings;
  return regeneratorRuntime.async(function main$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(puppeteer.launch({
            headless: false
          }));

        case 2:
          browser = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(browser.newPage());

        case 5:
          page = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(scrapeListings(page));

        case 8:
          listings = _context2.sent;
          console.log(listings);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
}

main();