// start game button
// randomize ships button
// swiching turns
// get the plyer name
// prombt the win and lose 
// const player = require('./player');
import player from './player'
import Gameboard from './gameBoard';

let you
let computer 
let startGame = false
let computerTurn = false;
const yourBoard = document.querySelector('.player-1 tbody')
const computerBoard = document.querySelector('.player-2 tbody');
const randomShipsBtn = document.querySelector('.random-btn');
const startBtn = document.querySelector('.start-btn')

function generateBoard(domTable,coords){
   const html = coords.map((row)=>{
        return`
        <tr>
            ${row.rowItems.map(coord=>{
                return `<td data-row="${coord.x}" data-col="${coord.y}" ></td>`;
                
            }).join('')
             }
        </tr> `
   }).join('') ;
 
   domTable.innerHTML = html;
}
function gameSetUp(){
    you = new player('you');
    computer = new player('computer');

    generateBoard(
     document.querySelector('.player-1 tbody'),
     you.gameBoard.grid
    );
    generateBoard(
     document.querySelector('.player-2 tbody'),
     computer.gameBoard.grid
    );

   
   setRandomShips(you);
   setRandomShips(computer);
   renderBoardShips(you,document.querySelector('.player-1 tbody'))
   renderBoardShips(computer,document.querySelector('.player-2 tbody'))
   console.table(computer.gameBoard.getFullCoords())
 
}

function sendHit(domTarget,coord){
    let targetPlayer;
    if(computerTurn){
     targetPlayer = you;
    }else{
     targetPlayer = computer
    }
    domTarget.dataset.gotHit = true;
    targetPlayer.gameBoard.receiveAttack(coord);

    displayHitOnBoard(targetPlayer,coord,domTarget);
    if(targetPlayer.gameBoard.gameOver()){
        const winner = computerTurn ? computer : you ;
        overGame(winner.name)
    }
    computerTurn = !computerTurn;
}
function displayHitOnBoard(targetPlayer,coord,domTarget){
        if(targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y].gotHit &&
           targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y].full ){
             //display hit
             console.log(targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y]);
             domTarget.innerText ="x";
           }else if(targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y].gotHit &&
                    !targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y].full){
             //display miss
             console.log(targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y]);
             domTarget.innerText="o";
           }
}
function computerHit(){
    //target you board
    // set random attack that is not repeated
    const attackCoords = you.randomAttak();
   
    const attackedDomItem = yourBoard.querySelector(`td[data-row="${attackCoords.x}"][data-col="${attackCoords.y}"]`);
    if(!attackedDomItem.dataset.gotHit){
        sendHit(attackedDomItem,attackCoords);
    }else{
        computerHit();
    }
}
function overGame(winner){
    confirm(`${winner} is the Winner !`)
    startGame = false;
    gameSetUp();
}
function setRandomShips(player){
    player.generateRandomShips();
}
function renderBoardShips(player,board){
    player.gameBoard.ships.forEach(ship=>{
       for(const coord of ship.coords) {
            board.querySelector(` td[data-row="${coord.x}"][data-col="${coord.y}"]`).dataset.full = true;
        }  
    })
}
function boardReset(board){
   const targets = board.querySelectorAll('td[data-full="true"]')
   targets.forEach(target=>{
    delete target.dataset.full
   })
}
function gameReset(){

}


computerBoard.addEventListener('click',(e)=>{
    if(!startGame) return ;
    if(!e.target.matches('td')) return;
    if(e.target.dataset.gotHit){ return;} 
    
     sendHit(e.target,
             {x:parseInt(e.target.dataset.row) ,
              y:parseInt(e.target.dataset.col) }
            );
   // check if the game running => no winner  // make computer play after the real player       
   if(startGame) computerHit();
});
randomShipsBtn.addEventListener('click',()=>{

    if(startGame) return;
    boardReset(yourBoard)//start with clean board
    setRandomShips(you);
    renderBoardShips(you,document.querySelector('.player-1 tbody'))

});
startBtn.addEventListener('click',()=>{
    if(startGame) return;
    startGame = true;
})
export {
    gameSetUp,
    generateBoard,
  
    overGame,
    setRandomShips
};