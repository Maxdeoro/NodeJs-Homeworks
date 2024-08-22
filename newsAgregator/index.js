import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
// import consolidate from 'consolidate';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import NewsFactory from '../lib/news/index';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 8888;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen(port, () => {
    console.log('Listening on port ' + port);
});
app.get('/', async (req,res) => {
    res.render('home');
});

const newsService = await NewsFactory.issue(req.params.service);
app.get('/news/list/:service', async (req,res) => {
    const newsList = await newsService.getNewsList();
    res.render('newsList', {service: req.params.service, news: newsList});
});
app.get('/news/:service', async (req,res) => {
    const newsItem = await newsService.getNewsItem(req.query.q);
    res.render('newsItem', {service: req.params.service, newsItem: newsItem});
});