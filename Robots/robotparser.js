const robotParser = require('robots-parser');
const request = require("request-promise");

const robotsUrl = "http://textfiles.meulie.net/robots.txt";

async function getRobotsTxt(robotsUrl) {
    const robotTxt = await request.get(robotsUrl);
    const robots = robotParser(robotsUrl, robotTxt);
    console.log(robots.isAllowed("http://textfiles.meulie.net/100/", "BjarniBot"));
    console.log(robots.isAllowed("http://textfiles.meulie.net/100/", "rogerBot"));
    console.log(robots.getCrawlDelay());
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