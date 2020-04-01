"use strict";

var request = require("request-promise");

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