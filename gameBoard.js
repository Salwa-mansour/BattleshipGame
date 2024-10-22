const Ship = require('./ship');

class Gameboard {
    constructor(size = 10) {
        this.size = size;
        this.grid = this.generateCoords(size)
    }
    generateCoords(size){
        let coordsArr = [];
        for(let x=0 ; x < size ; x++){
            let row = {rowItems:[]}
            
            for(let y = 0 ; y < size ;y++){
                row.rowItems.push({
                    x:x,
                    y:y,
                    full:false,
                    gotHit:false
                })
            }
            coordsArr.push(row)
        }
        return coordsArr;
    }
    placeShip(coords, length, isVertical = false ){
        // get full cells from coordate gird
        // check if genrete cords does not overlap with them 
        // if ture genrte the ship 
        //  if false get new set of coords
        const ship = new Ship()
        // creating new ship object and place it -- return the array of ships
    }
    receiveAttack(coords){
      //  determines whether or not the attack hit a ship and then sends the ‘hit’
      // function to the correct ship, or records the coordinates of the missed shot.
      //Gameboards should keep track of missed attacks so they can display them properly.
    }
    //Gameboards should be able to report whether or not all of their ships have been sunk.
}

module.exports = Gameboard;