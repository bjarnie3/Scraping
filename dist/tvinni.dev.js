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

function scrapeJobDescriptions(listings, page) {
  var i, html, $, jobDescription, listingModel;
  return regeneratorRuntime.async(function scrapeJobDescriptions$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(page["goto"]("https://www.tvinna.is"));

        case 2:
          i = 0;

        case 3:
          if (!(i < listings.length)) {
            _context2.next = 21;
            break;
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(page["goto"](listings[i].url));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(page.content());

        case 8:
          html = _context2.sent;
          $ = cheerio.load(html);
          jobDescription = $(".job-listing > p"); //const compensation = $("p").text();

          listings[i].jobDescription = jobDescription; //listings[i].compensation = compensation;

          console.log(listings[i].jobDescription); //console.log(listings[i].compensation);

          listingModel = new Listing(listings[i]);
          _context2.next = 16;
          return regeneratorRuntime.awrap(listingModel.save());

        case 16:
          _context2.next = 18;
          return regeneratorRuntime.awrap(sleep(1000));

        case 18:
          i++;
          _context2.next = 3;
          break;

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function sleep(miliseconds) {
  return regeneratorRuntime.async(function sleep$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise(function (resolve) {
            return setTimeout(resolve, miliseconds);
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function main() {
  var browser, page, listings, listingsWithJobDescriptions;
  return regeneratorRuntime.async(function main$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(puppeteer.launch({
            headless: false
          }));

        case 2:
          browser = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(browser.newPage());

        case 5:
          page = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(scrapeListings(page));

        case 8:
          listings = _context4.sent;
          _context4.next = 11;
          return regeneratorRuntime.awrap(scrapeJobDescriptions(listings, page));

        case 11:
          listingsWithJobDescriptions = _context4.sent;
          console.log(listingsWithJobDescriptions);
          console.log(listings);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
}

main();