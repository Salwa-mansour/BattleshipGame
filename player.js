const gameBoard = require('../gameBoard');


class Player{
    constructor(name){
        this.name = name;
        this.gameBoard = new gameBoard();
    }
}

// determine where to randomize ship placese and how
  
module.exports = Player;