// import { Ship } from "../ship";
const Ship = require('../src/ship');


const ship1 = new Ship({x:0,y:0},3);
// ship1.hit();
// ship1.hit();
// ship1.hit();
// test('ship1 fiest hit',()=>{
//     expect(ship1.isSunk()).toBe(true);
// });
// const ship2 = new Ship(2);
// test('ship2 fiest hit',()=>{
//     expect(ship2.isSunk()).toBe(false);
// });

test('ship1 coord',()=>{
        expect(ship1.coords).toMatchObject([{x:0,y:0},{x:0,y:1},{x:0,y:2}]);
    });