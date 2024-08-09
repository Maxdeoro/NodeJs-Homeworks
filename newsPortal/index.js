import http from 'http';
import * as rp from 'request-promise';
import * as cheerio from 'cheerio';
import { execFileSync } from 'child_process';

const newsServiceUrl = 'https://www.pravda.com.ua/rus/';
const populateServerRespondNews = res => {
    const news = [];
    const promises = [];

    rp(`${newsServiceUrl}/news`)
    .then((data) => {
            const $ = cheerio.load(data);
            $('.article_header').each(function(i,element) {
                const newsItemUrn = $(this).find('a').eq(0).attr('href');
                if(newsItemUrn.indexOf('http') === -1) {
                    promises.push(rp(newsServiceUrl + newsItemUrn)
                    .then(data => news.push(getNewsFullItem(data)))
                )
                }
            })
            Promise.all(promises)
            .then(function() {
                serverRespondeNews(res,news);
            })
            .catch(err => {throw new Error(err)})
        })
};

const getNewsFullItem = (data) => {
    const $ = cheerio.load(data);
    let date = $('.post_text').text().trim();
    date = date.substring(date.indexOf(':') + 2, date.indexOf('|')).trim();

    const title = $('post_title').text().trim();

    let body = '';
    $('.post_text p').each((i,el) => {
        body += `${$(el).text()}`;
    });

    return {date,title,body};
};

const serverRespondeNews = (res,news) => {
    res.writeHead(200, {'Content-Type':'application/json'});
    res.write(JSON.stringify(news));
    res.end();
};

http.createServer(function(req,res) {
    populateServerRespondNews(res);
}).listen(8080);