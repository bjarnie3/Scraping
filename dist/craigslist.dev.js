"use strict";

var puppeteer = require("puppeteer");

var cheerio = require("cheerio");

var mongoose = require("mongoose");

var Listing = require("./model/Listing"); //craigslistuser:SuperStrongPassword1


var scrapingResults = [{
  title: "Entry Level Software Engineer - C or C++",
  datePosted: new Date("2019-07-26 12:00:00"),
  neighborhood: "(palo alto)",
  url: "https://sfbay.craigslist.org/pen/sof/d/palo-alto-entry-level-software-engineer/6943135190.html",
  jobDescription: "Major Technology company is seeking an Entry Level software Engineer. The ideal candidate will have extensive school project experience with C or C++. Under general supervision...",
  compensation: "Up to US$0.00 per year"
}];

function connectToMongoDb() {
  return regeneratorRuntime.async(function connectToMongoDb$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect("mongodb://craigslistuser:SuperStrongPassword1@ds047948.mlab.com:47948/heroku_ckm9v41c", {
            useNewUrlParser: true
          }));

        case 2:
          console.log("connected to mongodb");

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

function scrapeListings(page) {
  var html, $, listings;
  return regeneratorRuntime.async(function scrapeListings$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(page["goto"]("https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof"));

        case 2:
          _context2.next = 4;
          return regeneratorRuntime.awrap(page.content());

        case 4:
          html = _context2.sent;
          $ = cheerio.load(html);
          listings = $(".result-info").map(function (index, element) {
            var titleElement = $(element).find(".result-title");
            var timeElement = $(element).find(".result-date");
            var hoodElement = $(element).find(".result-hood");
            var title = $(titleElement).text();
            var neighborhood = $(hoodElement).text().trim().replace("(", "").replace(")", "");
            var url = $(titleElement).attr("href");
            var datePosted = new Date($(timeElement).attr("datetime"));
            return {
              title: title,
              url: url,
              datePosted: datePosted,
              neighborhood: neighborhood
            };
          }).get();
          return _context2.abrupt("return", listings);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function scrapeJobDescriptions(listings, page) {
  var i, html, $, jobDescription, compensation, listingModel;
  return regeneratorRuntime.async(function scrapeJobDescriptions$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < listings.length)) {
            _context3.next = 22;
            break;
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(page["goto"](listings[i].url));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(page.content());

        case 6:
          html = _context3.sent;
          $ = cheerio.load(html);
          jobDescription = $("#postingbody").text();
          compensation = $("p.attrgroup > span:nth-child(1) > b").text();
          listings[i].jobDescription = jobDescription;
          listings[i].compensation = compensation;
          console.log(listings[i].jobDescription);
          console.log(listings[i].compensation);
          listingModel = new Listing(listings[i]);
          _context3.next = 17;
          return regeneratorRuntime.awrap(listingModel.save());

        case 17:
          _context3.next = 19;
          return regeneratorRuntime.awrap(sleep(1000));

        case 19:
          i++;
          _context3.next = 1;
          break;

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function sleep(miliseconds) {
  return regeneratorRuntime.async(function sleep$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise(function (resolve) {
            return setTimeout(resolve, miliseconds);
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function main() {
  var browser, page, listings, listingsWithJobDescriptions;
  return regeneratorRuntime.async(function main$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(connectToMongoDb());

        case 2:
          _context5.next = 4;
          return regeneratorRuntime.awrap(puppeteer.launch({
            headless: false
          }));

        case 4:
          browser = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(browser.newPage());

        case 7:
          page = _context5.sent;
          _context5.next = 10;
          return regeneratorRuntime.awrap(scrapeListings(page));

        case 10:
          listings = _context5.sent;
          _context5.next = 13;
          return regeneratorRuntime.awrap(scrapeJobDescriptions(listings, page));

        case 13:
          listingsWithJobDescriptions = _context5.sent;
          console.log(listings);

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  });
}

main();