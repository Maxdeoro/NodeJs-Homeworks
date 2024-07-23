class Player {
    constructor() {
        this.name = name;
        this.turns = [];
        this.total = 0;
    }

    showCards() {
        return this.turns.reduce((prevCard,currCard) => prevCard + ' ' + currCard.value + currCard.suit + ' ', '');
    }
};

export default Player;