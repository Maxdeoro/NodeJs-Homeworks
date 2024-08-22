import News from "./News";

class Pravda extends News {
    constructor() {
        super();
        this.newsServiceUrl = 'https://www.pravda.com.ua/rus/';
        this.newsListUrn = '/news';
        this.listItemSelector = '.container_sub_news_list_wrapper';
        this.itemTitleSelector = '.article_header';
        this.itemDateSelector = '.article_time';
        this.itemBodySelector = '.post_text';
    };
    getNewsItemDate($) {
        let date = $(this.itemDateSelector).text().trim();
        return date.substring(date.indexOf(':') + 2, date.indexOf('|')).trim();
    };
};

export default Pravda;