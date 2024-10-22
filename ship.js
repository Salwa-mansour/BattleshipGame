class Ship {
    constructor(startPoint,length) {
      this.length = length;
      this.hits = 0;
      this.sunk = false;
      this.coords = this.genertateCoords(startPoint,length)
    }

    genertateCoords(startPoint,length){
      let coords = [];
      for(let i = 0 ; i <length;i++){
        coords.push({
          x:startPoint.x,
          y:startPoint.y+i,
        })
      }
      return coords;
    }
    isSunk(){
        return this.hits === this.length;
    }
    hit(){
        if(!this.isSunk())
        this.hits++;
    }

  }


  // export {
  //   Ship
  // }
  
module.exports = Ship;