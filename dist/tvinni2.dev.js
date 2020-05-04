"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// tvinna.is skrapað til skemmtunr og hagnaðar
require('isomorphic-fetch');

var cheerio = require('cheerio');

var redis = require('redis');

var util = require('util');

var cacheTtl = 1000000;
var redisOptions = {
  url: 'redis://127.0.0.1:6379/0'
};
var client = redis.createClient(redisOptions);
var asyncGet = util.promisify(client.get).bind(client);
var asyncSet = util.promisify(client.set).bind(client);

function get(url, cacheKey) {
  var cached, response, text;
  return regeneratorRuntime.async(function get$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(asyncGet(cacheKey));

        case 2:
          cached = _context.sent;

          if (!cached) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", cached);

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(fetch(url));

        case 7:
          response = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(response.text());

        case 10:
          text = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(asyncSet(cacheKey, text, 'EX', cacheTtl));

        case 13:
          return _context.abrupt("return", text);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getJobDescription(job) {
  var slug, key, href, data, $, textElements, texts, description;
  return regeneratorRuntime.async(function getJobDescription$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          slug = job.href.replace('https://www.tvinna.is/jobs/', '').replace('/', '');
          key = "tvinna:".concat(slug);
          href = job.href;
          console.log('fetch', href, key);
          _context2.next = 6;
          return regeneratorRuntime.awrap(get(href, key));

        case 6:
          data = _context2.sent;
          $ = cheerio.load(data);
          textElements = $('.job-detail p, .job-detail ul');
          texts = [];
          textElements.each(function (i, el) {
            texts.push($(el).text());
          });
          description = texts.join(' ');
          job.description = description;
          return _context2.abrupt("return", job);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function scrape() {
  var text, $, jobElements, jobs, processedJobs, i, job;
  return regeneratorRuntime.async(function scrape$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(get('http://tvinna.is', 'tvinna:forsida'));

        case 2:
          text = _context3.sent;
          $ = cheerio.load(text);
          jobElements = $('.job-listing li a');
          jobs = [];
          jobElements.each(function (i, el) {
            var title = $(el).find('h2').text();
            var byLine = $(el).find('p').text();
            var href = $(el).attr('href');

            var _byLine$split = byLine.split(' | '),
                _byLine$split2 = _slicedToArray(_byLine$split, 2),
                _byLine$split2$ = _byLine$split2[0],
                employer = _byLine$split2$ === void 0 ? '' : _byLine$split2$,
                _byLine$split2$2 = _byLine$split2[1],
                type = _byLine$split2$2 === void 0 ? '' : _byLine$split2$2;

            var views = $(el).find('.view-track').text().replace('Skoðað ', '').replace(' sinnum', '');
            var date = $(el).find('time').text();
            jobs.push({
              title: title,
              href: href,
              employer: employer,
              type: type,
              views: Number(views),
              date: date
            });
          });
          processedJobs = [];
          i = 0;

        case 9:
          if (!(i < jobs.length)) {
            _context3.next = 18;
            break;
          }

          _context3.next = 12;
          return regeneratorRuntime.awrap(getJobDescription(jobs[i]));

        case 12:
          job = _context3.sent;
          processedJobs.push(job);
          console.log('Processed Job!');

        case 15:
          i++;
          _context3.next = 9;
          break;

        case 18:
          console.log(processedJobs);
          client.quit();

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  });
}

scrape()["catch"](function (err) {
  return console.error(err);
}); // rm -rf node_module