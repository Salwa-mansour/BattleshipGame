// import { Ship } from "../ship";
const Ship = require('../ship');


const ship1 = new Ship(3);
ship1.hit();
ship1.hit();
ship1.hit();
test('ship1 fiest hit',()=>{
    expect(ship1.isSunk()).toBe(true);
});
const ship2 = new Ship(2);
test('ship2 fiest hit',()=>{
    expect(ship2.isSunk()).toBe(false);
});