"use strict";var robotParser=require("robots-parser"),request=require("request-promise"),robotsUrl="http://textfiles.meulie.net/robots.txt";function getRobotsTxt(t){var r,o;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(request.get(t));case 2:r=e.sent,o=robotParser(t,r),console.log(o.isAllowed("http://textfiles.meulie.net/100/","BjarniBot")),console.log(o.isAllowed("http://textfiles.meulie.net/100/","rogerBot")),console.log(o.getCrawlDelay());case 7:case"end":return e.stop()}})}getRobotsTxt(robotsUrl);