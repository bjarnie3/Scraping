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
          listings = $(".job-listing").map(function (index, element) {
            var titleElement = $(element).find("h2");
            var title = $(titleElement).text();
            var jobElement = $(element).find("p");
            var job = $(jobElement).text();
            var partjob = $(element).find(".fullt-starf");
            var part = $(partjob).text();
            var timeElement = $(element).find(".date");
            var datePosted = new Date($(timeElement).find(".year"));
            var url = $(titleElement).attr("href");
            return {
              title: title,
              job: job,
              part: part,
              url: url,
              datePosted: datePosted
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