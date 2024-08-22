import Pravda from '../news/services/Pravda';
import MTimes from '../news/services/MTimes';

class NewsFactory {
    static async issue(type) {
        switch(type) {
            case 'pravda':
                return new Pravda();
                break;
            case 'the moscow times': 
                return new MTimes();
                break;
        }
    };
};

export default NewsFactory;