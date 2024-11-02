const gameBoard = require('./gameBoard');


class Player{
    constructor(name, type){
        this.name = name;
        this.gameBoard = new gameBoard();
    }
    // play(coord){

    //     if(this.gameBoard.grid[coord.x].rowItems[coord.y].full){
    //         this.gameBoard.receveAttac
    //     }

    // }
    generateRandomShips(){
        this.gameBoard.placeShip(4);
        this.gameBoard.placeShip(3);
        this.gameBoard.placeShip(2);
        this.gameBoard.placeShip(1);
    }
    randomAttak(){
        let point = {
            x:Math.round(Math.random()* (this.gameBoard.size)) ,
            y:Math.round(Math.random()* (this.gameBoard.size))
        }
        if(this.gameBoard.grid[point.x].rowItems[point.y].gotHit){
            this.randomAttak();
        }
        return point;
    }
}

// determine where to randomize ship placese and how
  
module.exports = Player;