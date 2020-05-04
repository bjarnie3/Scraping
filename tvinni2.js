// tvinna.is skrapað til skemmtunr og hagnaðar
require('isomorphic-fetch');
const cheerio = require('cheerio');
const redis = require('redis');
const util = require('util');

const cacheTtl = 1000000;

const redisOptions = {
    url: 'redis://127.0.0.1:6379/0'
};

const client = redis.createClient(redisOptions);

const asyncGet = util.promisify(client.get).bind(client);
const asyncSet = util.promisify(client.set).bind(client);


async function get(url, cacheKey) {
    const cached = await asyncGet(cacheKey);

    if (cached) {
        return cached;
    }

    const response = await fetch(url);
    const text = await response.text();

    await asyncSet(cacheKey, text, 'EX', cacheTtl);

    return text;
}

async function getJobDescription(job) {
    const slug = job.href.replace('https://www.tvinna.is/jobs/', '').replace('/', '');
    const key = `tvinna:${slug}`;
    const href = job.href;

    console.log('fetch', href, key);
    const data = await get(href, key);
    
    const $ = cheerio.load(data);
    const textElements = $('.job-detail p, .job-detail ul');

    const texts =  []
    textElements.each((i, el) => {
        texts.push($(el).text());
    });

    const description = texts.join(' ');

    job.description = description;

    return job;
}


async function scrape() {
    const text = await get('http://tvinna.is', 'tvinna:forsida');


    const $ = cheerio.load(text);


    const jobElements = $('.job-listing li a');


    const jobs = [];


    jobElements.each((i, el) => {
        const title = $(el).find('h2').text();
        const byLine = $(el).find('p').text();


        const href = $(el).attr('href');


        const [employer = '', type = ''] = byLine.split(' | ');


        const views = $(el)
        .find('.view-track')
        .text()
        .replace('Skoðað ', '')
        .replace(' sinnum', '');
        const date = $(el).find('time').text();


        jobs.push({
            title,
            href,
            employer,
            type,
            views: Number(views),
            date,
        });
    });


    const processedJobs = [];
    for (let i = 0; i<jobs.length; i++) {
        const job = await getJobDescription(jobs[i]);
        processedJobs.push(job);
        console.log('Processed Job!');
    }
    
    console.log(processedJobs);


    client.quit();
}


scrape().catch(err => console.error(err));


// rm -rf node_module