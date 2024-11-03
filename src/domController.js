// start game button
// randomize ships button
// swiching turns
// get the plyer name
// prombt the win and lose 
// const player = require('./player');
import player from './player'
import Gameboard from './gameBoard';

const you = new player('you');
const computer = new player('computer');
let computerTurn = false;
const yourBoard = document.querySelector('.player-1 tbody')
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
    const attackCoords={
        x:Math.round(Math.random()* ( you.gameBoard.size - 1) ) ,
        y:Math.round(Math.random()* ( you.gameBoard.size - 1) )
    };
   
    const attackedDomItem =yourBoard.querySelector(`td[data-row="${attackCoords.x}"][data-col="${attackCoords.y}"]`);
    if(!attackedDomItem.dataset.gotHit){
        sendHit(attackedDomItem,attackCoords);
    }else{
        computerHit();
    }
}
function overGame(winner){
        console.log(`${winner} is the Winner !`)
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
    if(e.target.dataset.gotHit){ return;} 
    
     sendHit(e.target,
             {x:parseInt(e.target.dataset.row) ,
              y:parseInt(e.target.dataset.col) }
            );
     // make computer play after the real player       
    computerHit();
});
export {
    gameSetUp,
    generateBoard,
  
    overGame,
    setRandomShips
};