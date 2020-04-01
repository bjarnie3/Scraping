"use strict";

var parser = require("../parser");

var fs = require("fs");

var html;
beforeAll(function () {
  html = fs.readFileSync("./musicians.html");
});
it("should get a list of musicians", function _callee() {
  var listings;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(parser.getListings(html));

        case 2:
          listings = _context.sent;
          expect(listings.length).toBe(120);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
it("first post should be CCR revival post", function _callee2() {
  var listings;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(parser.getListings(html));

        case 2:
          listings = _context2.sent;
          expect(listings[0].title).toBe("BLUES FUNK KEYBOARDS wanted");

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
it("listing datetime", function _callee3() {
  var listings;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(parser.getListings(html));

        case 2:
          listings = _context3.sent;

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
it("listing url", function _callee4() {
  var listings;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(parser.getListings(html));

        case 2:
          listings = _context4.sent;
          expect(listings[0].url).toBe("https://sfbay.craigslist.org/nby/muc/d/san-rafael-blues-funk-keyboards-wanted/6914126254.html");

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});