"use strict";

var request = require("request-promise");

var cheerio = require("cheerio");

function scrape() {
  var _loop, index;

  return regeneratorRuntime.async(function scrape$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _loop = function _loop(index) {
            var html, $;
            return regeneratorRuntime.async(function _loop$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(request.get("https://sfbay.craigslist.org/search/vol?s=" + index));

                  case 2:
                    html = _context.sent;
                    _context.next = 5;
                    return regeneratorRuntime.awrap(cheerio.load(html));

                  case 5:
                    $ = _context.sent;
                    $(".result-title").each(function (index, element) {
                      console.log($(element).text());
                    });
                    console.log("At page number " + index);

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          index = 0;

        case 2:
          if (!(index <= 360)) {
            _context2.next = 8;
            break;
          }

          _context2.next = 5;
          return regeneratorRuntime.awrap(_loop(index));

        case 5:
          index = index + 120;
          _context2.next = 2;
          break;

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

scrape();