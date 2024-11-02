// start game button
// randomize ships button
// swiching turns
// get the plyer name
// prombt the win and lose 
// const player = require('./player');
import player from './player'
import Gameboard from './gameBoard';

const computer = new player('computer');
const you = new player('you');
let computerTurn = false;
const computerBoard = document.querySelector('.player-2 tbody');

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
}

function sendHit(domTarget,coord){
    let targetPlayer;
    if(computerTurn){
     targetPlayer = you;
    }else{
     targetPlayer = computer
    }
   
    targetPlayer.gameBoard.receiveAttack(coord);

    displayHitOnBoard(targetPlayer,coord,domTarget);
    if(targetPlayer.gameBoard.gameOver()){
        overGame()
    }
    computerTurn = !computerTurn;
}
function displayHitOnBoard(targetPlayer,coord,domTarget){
        if(targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y].gotHit &&
           targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y].full ){
             //display hit
             domTarget.innerText ="x"
           }else if(targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y].gotHit &&
                    !targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y].full){
             //display miss
             domTarget.innerText="o"
           }
}
function computerHit(){
    //target you board
    // set random attack that is not repeated
}
function overGame(){
        alert('game over')
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
  



computerBoard.addEventListener('click',(e)=>{
    if(!e.target.matches('td')) return;
    if(computerTurn){console.log('computer turn'); computerTurn = !computerTurn; return;} 
    
     sendHit(e.target,
             {x:parseInt(e.target.dataset.row) ,
              y:parseInt(e.target.dataset.col) }
            );
});
export {
    gameSetUp,
    generateBoard,
  
    overGame,
    setRandomShips
};