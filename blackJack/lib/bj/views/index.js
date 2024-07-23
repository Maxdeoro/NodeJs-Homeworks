import rl from 'readline-sync';
import Player from '../models/Player';
import Game from '../models/Game';
import BJ from './Bj';
import helpers, { isAnswerYes } from '../../../helpers/index';
// import views from './vievs/index';

const BJGame = new BJ();
BJGame.shuffleDeck();

const players = [];
const games = [];
let game = new Game();
games.push(game);

const greetingQuestion = () => {
    const answer = rl.question('Welcome to BlackJack club!\nPlease introduce yourself ');
    if(answer) {
        views.greeting(answer);
        players.push(answer);
        game.addPlayer(new Player(answer));
        addAnotherPlayerQuestion();
    } else {
        greetingQuestion();
    }
};

const addAnotherPlayerQuestion = () => {
    const answer = rl.question('Will there be more players? (y/n) /**The game can be one-on-one with the dealer**/');
    if(helpers.isAnswerNo(answer)) {
        greetingQuestion();
    } else if (helpers.isAnswerYes(answer)) {
        players.push('Dealer');
        game.addPlayer(new Player('Dealer'));
        startGameQuestion();
    } else {
        addAnotherPlayerQuestion();
    }
};

const startGameQuestion = () => {
    const currentPlayer = game.players[game.currentPlayerIndex];
    const answer = rl.question('Start game [player ` + currentPlayer.name + `] (y)/ Exit (n)');
    if(helpers.isAnswerYes(answer)) {
        const card = BJGame.getCard(game);
        views.yourCard(card);
        nextTurnQuestion();
    } else if (helpers.isAnswerNo(answer)) {
        views.bye();
        process.exit(0);
    } else {
        startGameQuestion();
    }
};

const nextTurnQuestion = () => {
    const currentPlayer = game.players[game.crrentPlayerIndex];
    const answer = rl.question('Another one game ? (y/n)');
    if(helpers.isAnswerYes(answer) && currentPlayer.total<=21) {
        const card = BJGame.getCard(game);
        views.yourCard(card);
        views.playersCards(game);

        if(currentPlayer.total > 21) {
            views.overdraw(currentPlayer);
            changePlayer();
            startGameQuestion();
        } else {
            nextTurnQuestion();
        }
    } else if (helpers.isAnswerNo(answer)) {
        changePlayer();
        startGameQuestion();
    } else {
        nextTurnQuestion();
    }
};

const changePlayer = () => {
    let currentPlayer = game.players[game.crrentPlayerIndex];
    views.playerGameOver(currentPlayer);
    game.currentPlayerIndex++;
    currentPlayer = game.players[game.crrentPlayerIndex];
    if (game.players.length > game.currentPlayerIndex) {
        views.nextPlayer(currentPlayer);
    } else {
        gameOver();
    }
};

const gameOver = () => {
    views.gameOver();
    views.playersCards(game);
    views.winner(BJGame.calculateWinner(game));
    views.gamesStat(games,players);

    game = new Game();
    players.forEach(player => addPlayer(new Player(player)));
    games.push(game);
    BJGame.shuffleDeck();
};

const start = () => {
    greetingQuestion();
};

export default {start: start()};