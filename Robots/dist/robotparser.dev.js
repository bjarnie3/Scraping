"use strict";

var robotParser = require('robots-parser');

var request = require("request-promise");

var robotsUrl = "http://textfiles.meulie.net/robots.txt";

function getRobotsTxt(robotsUrl) {
  var robotTxt, robots;
  return regeneratorRuntime.async(function getRobotsTxt$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(request.get(robotsUrl));

        case 2:
          robotTxt = _context.sent;
          robots = robotParser(robotsUrl, robotTxt);
          console.log(robots.isAllowed("http://textfiles.meulie.net/100/", "BjarniBot"));
          console.log(robots.isAllowed("http://textfiles.meulie.net/100/", "rogerBot"));
          console.log(robots.getCrawlDelay());

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

getRobotsTxt(robotsUrl);
/*[
	'User-agent: *',
	'Disallow: /dir/',
    'Disallow: /test.html',
    'Disallow: /hello.html',
	'Allow: /dir/test.html',
	'Allow: /test.html',
	'Crawl-delay: 1',
	'Sitemap: http://example.com/sitemap.xml',
	'Host: example.com'
].join('\n'));

robots.isAllowed('http://www.example.com/hello.html', 'Sams-Bot/1.0'); // false
robots.isAllowed('http://www.example.com/test.html', 'Sams-Bot/1.0'); // false
robots.isAllowed('http://www.example.com/dir/test.html', 'Sams-Bot/1.0'); // true
robots.isDisallowed('http://www.example.com/dir/test2.html', 'Sams-Bot/1.0'); // true
robots.getCrawlDelay('Sams-Bot/1.0'); // 1
robots.getSitemaps(); // ['http://example.com/sitemap.xml']
//robots.getPreferedHost(); // example.com

*/