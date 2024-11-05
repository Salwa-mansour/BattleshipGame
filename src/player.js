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
        //reset to empty
       this.resetShips();
        this.gameBoard.placeShip(4);
        this.gameBoard.placeShip(3);
        this.gameBoard.placeShip(2);
        this.gameBoard.placeShip(1);
    }
    resetShips(){
        this.gameBoard.ships = [];
      // const fullCoords = this.gameBoard.getFullCoords();
       this.gameBoard.grid.forEach(row => {
            row.rowItems.forEach((coord)=>{
               coord.full = false;
               coord.gotHit = false;
            }) 
       });
    }
    randomAttak(){
        let point = {
            x:Math.round(Math.random()* (this.gameBoard.size- 1)) ,
            y:Math.round(Math.random()* (this.gameBoard.size- 1))
        }
      
        return point;
    }
}

// determine where to randomize ship placese and how
  
module.exports = Player;