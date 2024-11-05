const Ship = require('./ship');

class Gameboard {
    constructor(size = 10) {
        this.size = size;
        this.grid = this.generateCoords(size);
        this.ships =[];
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
    placeShip( length=4,coordStart = this.rundomizeCoordStarts(length), isVertical = false ){
       
        const newShip = new Ship(coordStart,length);
      
        const fullCoords = this.getFullCoords()
        if(this.isOverLapping(fullCoords,newShip.coords)){
            this.placeShip(length)
        }else{
            this.ships.push(newShip);
            this.fillingCoords(newShip.coords)
        }
    }
  
    isOverLapping(fullCoords,shipCoords){
         // get full cells from coordate gird
        // check if genrete cords does not overlap with them 
        for(const fullCoord of fullCoords) {
            if(shipCoords.some((coord)=> fullCoord.x === coord.x && fullCoord.y === coord.y )){
                return true;
            }
         };
         return false;
    }

    rundomizeCoordStarts(shipSize ,gameBoardSize = this.size){
        const shipCoords={
            x:Math.round(Math.random()* (gameBoardSize - shipSize)) ,
            y:Math.round(Math.random()* (gameBoardSize - shipSize))
        }
        
       return shipCoords;
    //    {7,7+1+1+1+1}
    }

    fillingCoords(newCoords){
        newCoords.forEach((newCoord)=>{
          (this.grid[newCoord.x].rowItems[newCoord.y])['full'] = true;
        //   console.log(this.grid[newCoord.x].rowItems[newCoord.y])
        }) 
       
    }

    receiveAttack(coord){
       
      //  determines whether or not the attack hit a ship and then sends the ‘hit’
      // function to the correct ship, or records the coordinates of the missed shot.
      //Gameboards should keep track of missed attacks so they can display them properly
      let attackedShip;
    // const attackedShip =  this.ships.find((ship.coords=> ship.x === coord.x && ship.y === coord.y));
      for (const ship of this.ships) {
         if(ship.coords.some((shipCoord)=>shipCoord.x === coord.x && shipCoord.y === coord.y))
         attackedShip = ship;
         
      }
     
     if(attackedShip){
        attackedShip.hit(coord);
        this.grid[coord.x].rowItems[coord.y].gotHit = true;
     }else{
        this.grid[coord.x].rowItems[coord.y].gotHit = true;//miss on board
     }
   
    }
   
    getFullCoords(grid = this.grid){
        const fullCoordsArr =[]
        grid.forEach(row => {
        row.rowItems.filter(coord=>{
           if(coord.full){
               fullCoordsArr.push(coord)
           }
        })

       });
       return fullCoordsArr;
  }
  gameOver(ships = this.ships){
 
     //Gameboards should be able to report whether or not all of their ships have been sunk.
     return ships.every((ship)=> ship.isSunk())

  }
}
// const g= new Gameboard();
// console.log(g.rundomizeCoordStarts())
module.exports = Gameboard;