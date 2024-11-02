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
      console.log(this)
      // console.log(this.hits , this.length)
      // console.log(this.hits == this.length)
      if(this.hits === this.length){
        this.sunk = true;
      }
        return this.hits === this.length;
    }
    hit(coord){
       
          this.coords.some((shipCoord)=>{
            if(shipCoord.x ===coord.x && shipCoord.y === coord.y){
              this.hits++;
            }
          })
        
      
    }

  }


  // export {
  //   Ship
  // }
  
module.exports = Ship;