"use strict";

var cheerio = require("cheerio");

exports.getListings = function _callee(html) {
  var $, scrapeResults;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(cheerio.load(html));

        case 2:
          $ = _context.sent;
          scrapeResults = $(".result-info").map(function (index, element) {
            var resultTitle = $(element).children(".result-title");
            var title = resultTitle.text();
            var url = resultTitle.attr("href");
            var date = new Date($(element).children("time").attr("datetime"));
            return {
              title: title,
              url: url,
              date: date
            };
          }).get();
          return _context.abrupt("return", scrapeResults);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};