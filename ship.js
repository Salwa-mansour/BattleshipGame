class Ship {
    constructor(length) {
      this.length = length;
      this.hits = 0;
      this.sunk = false;
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