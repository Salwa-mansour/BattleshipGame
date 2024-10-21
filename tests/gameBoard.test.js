const Gameboard = require('../gameBoard');

const Gameboard1 = new Gameboard();

test('generte table array 1',()=>{
    expect(Gameboard1.generateCoords(1))
    .toMatchObject([{rowItems:[{x:0,y:0}]}]);
});
test('generte table array 2',()=>{
    expect(Gameboard1.generateCoords(2))
    .toMatchObject([{rowItems:[{x:0,y:0},{x:0,y:1}]},
                    {rowItems:[{x:1,y:0},{x:1,y:1}]}]);
});
