const Gameboard = require('../gameBoard');

const Gameboard1 = new Gameboard(1);

test('generte table array 1',()=>{
    expect(Gameboard1.grid)
    .toMatchObject([{rowItems:[{x:0,y:0, full:false,gotHit:false}]}]);
});
// test('generte table array 2',()=>{
//     expect(Gameboard1.generateCoords(2))
//     .toMatchObject([{rowItems:[{x:0,y:0},{x:0,y:1}]},
//                     {rowItems:[{x:1,y:0},{x:1,y:1}]}]);
// });

const gameBoard2 = new Gameboard();
// gameBoard2.grid[6].rowItems[6].full = true
// gameBoard2.fillingCoords([{x:5,y:6},{x:3,y:3}])
// test('filling and getting full coords',()=>{
//     expect(gameBoard2.getFullCoords())
//     .toMatchObject([{x:3,y:3},{x:5,y:6},{x:6,y:6}]);
// });

// const testCoords1 = [{x:4,y:1},{x:4,y:1},{x:4,y:2}]
// const testCoords2 = [{x:6,y:4},{x:6,y:5},{x:6,y:6}]
// const fullCoords = gameBoard2.getFullCoords()
// test('check overlap test1',()=>{
//     expect(gameBoard2.isOverLapping(fullCoords,testCoords1))
//     .toBe(false);
// });
// test('check overlap test2',()=>{
//     expect(gameBoard2.isOverLapping(fullCoords,testCoords2))
//     .toBe(true);
// });
gameBoard2.placeShip();
gameBoard2.placeShip();
// console.log(gameBoard2.ships[0])