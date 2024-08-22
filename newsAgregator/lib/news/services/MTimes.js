import News from "./News";

class MTimes extends News {
    constructor() {
        super();
        this.newsServiceUrl = 'https://www.themoscowtimes.com';
        this.newsListUrn = '/news';
        this.listItemSelector = '.listed-articles';
        this.itemTitleSelector = 'article-excerpt-tiny__headline';
        this.itemDateSelector = 'article-excerpt-tiny__time';
        this.itemBodySelector = 'article__content-container';
    };
    getNewsItemDate($) {
        let date = $(this.itemDateSelector).text().trim();
        return date.substring(date.indexOf(':') + 2, date.indexOf('|')).trim();
    };
};

export default MTimes;
