/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbattleship_game"] = self["webpackChunkbattleship_game"] || []).push([["main"],{

/***/ "./src/domController.js":
/*!******************************!*\
  !*** ./src/domController.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gameSetUp: () => (/* binding */ gameSetUp),\n/* harmony export */   generateBoard: () => (/* binding */ generateBoard),\n/* harmony export */   overGame: () => (/* binding */ overGame),\n/* harmony export */   setRandomShips: () => (/* binding */ setRandomShips)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_player__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gameBoard__WEBPACK_IMPORTED_MODULE_1__);\n// start game button\n// randomize ships button\n// swiching turns\n// get the plyer name\n// prombt the win and lose \n// const player = require('./player');\n\n\nlet you;\nlet computer;\nlet winner;\nlet startGame;\nlet computerTurn = false;\nconst yourBoard = document.querySelector('.player-1 tbody');\nconst computerBoard = document.querySelector('.player-2 tbody');\nconst randomShipsBtn = document.querySelector('.random-btn');\nconst startBtn = document.querySelector('.start-btn');\nfunction generateBoard(domTable, coords) {\n  const html = coords.map(row => {\n    return `\n        <tr>\n            ${row.rowItems.map(coord => {\n      return `<td data-row=\"${coord.x}\" data-col=\"${coord.y}\" >   \n                        </td>`;\n    }).join('')}\n        </tr> `;\n  }).join('');\n  domTable.innerHTML = html;\n}\nfunction gameSetUp() {\n  startGame = true;\n  you = new (_player__WEBPACK_IMPORTED_MODULE_0___default())('you');\n  computer = new (_player__WEBPACK_IMPORTED_MODULE_0___default())('computer');\n  setRandomShips(you);\n  setRandomShips(computer);\n  generateBoard(document.querySelector('.player-1 tbody'), you.gameBoard.grid);\n  generateBoard(document.querySelector('.player-2 tbody'), computer.gameBoard.grid);\n  renderBoardShips(you, document.querySelector('.player-1 tbody'));\n  //    renderBoardShips(computer,document.querySelector('.player-2 tbody'))\n}\nfunction sendHit(domTarget, coord) {\n  let targetPlayer;\n  if (computerTurn) {\n    targetPlayer = you;\n  } else {\n    targetPlayer = computer;\n  }\n  domTarget.dataset.gotHit = true;\n  targetPlayer.gameBoard.receiveAttack(coord);\n  displayHitOnBoard(targetPlayer, coord, domTarget);\n  if (targetPlayer.gameBoard.gameOver()) {\n    winner = computerTurn ? computer : you;\n    overGame(winner.name);\n  }\n  computerTurn = !computerTurn;\n}\nfunction displayHitOnBoard(targetPlayer, coord, domTarget) {\n  if (targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y].gotHit && targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y].full) {\n    //display hit\n    domTarget.innerText = \"x\";\n  } else if (targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y].gotHit && !targetPlayer.gameBoard.grid[coord.x].rowItems[coord.y].full) {\n    //display miss\n    domTarget.innerText = \"o\";\n  }\n}\nfunction computerHit() {\n  //target you board\n  // set random attack that is not repeated\n  const attackCoords = you.randomAttak();\n  const attackedDomItem = yourBoard.querySelector(`td[data-row=\"${attackCoords.x}\"][data-col=\"${attackCoords.y}\"]`);\n  if (!attackedDomItem.dataset.gotHit) {\n    sendHit(attackedDomItem, attackCoords);\n  } else {\n    computerHit();\n  }\n}\nfunction overGame(winner) {\n  // confirm(`${winner} is the Winner !`)\n  const dialog = document.querySelector(\".show-winner\");\n  const okbtn = dialog.querySelector('.ok-btn');\n  dialog.querySelector('p').innerHTML = `${winner} is the Winner !`;\n  startBtn.innerText = 'Resetart Game';\n  dialog.showModal(); // Opens a non-modal dialog\n  okbtn.addEventListener('click', () => {\n    dialog.close();\n  });\n  startGame = false;\n\n  //  gameReset()\n}\nfunction setRandomShips(player) {\n  player.generateRandomShips();\n}\nfunction renderBoardShips(player, board) {\n  player.gameBoard.getFullCoords().forEach(coord => {\n    board.querySelector(` td[data-row=\"${coord.x}\"][data-col=\"${coord.y}\"]`).dataset.full = true;\n  });\n}\nfunction boardReset(board) {\n  const targets = board.querySelectorAll('td[data-full=\"true\"]');\n  targets.forEach(target => {\n    delete target.dataset.full;\n  });\n}\nfunction gameReset() {\n  window.location.reload();\n}\ncomputerBoard.addEventListener('click', e => {\n  if (!startGame) return;\n  if (!e.target.matches('td')) return;\n  if (e.target.dataset.gotHit) {\n    return;\n  }\n  sendHit(e.target, {\n    x: parseInt(e.target.dataset.row),\n    y: parseInt(e.target.dataset.col)\n  });\n  // check if the game running => no winner  // make computer play after the real player       \n  if (startGame) computerHit();\n});\nrandomShipsBtn.addEventListener('click', () => {\n  if (startGame) return;\n  boardReset(yourBoard); //start with clean board\n  setRandomShips(you);\n  renderBoardShips(you, document.querySelector('.player-1 tbody'));\n});\nstartBtn.addEventListener('click', () => {\n  if (startGame) return;\n  startGame = true;\n  if (winner) {\n    gameReset();\n  }\n});\n\n\n//# sourceURL=webpack://battleship_game/./src/domController.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nclass Gameboard {\n  constructor() {\n    let size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;\n    this.size = size;\n    this.grid = this.generateCoords(size);\n    this.ships = [];\n  }\n  generateCoords(size) {\n    let coordsArr = [];\n    for (let x = 0; x < size; x++) {\n      let row = {\n        rowItems: []\n      };\n      for (let y = 0; y < size; y++) {\n        row.rowItems.push({\n          x: x,\n          y: y,\n          full: false,\n          gotHit: false\n        });\n      }\n      coordsArr.push(row);\n    }\n    return coordsArr;\n  }\n  placeShip() {\n    let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;\n    let coordStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.rundomizeCoordStarts(length);\n    let isVertical = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n    const newShip = new Ship(coordStart, length);\n    const fullCoords = this.getFullCoords();\n    if (this.isOverLapping(fullCoords, newShip.coords)) {\n      this.placeShip(length);\n    } else {\n      this.ships.push(newShip);\n      this.fillingCoords(newShip.coords);\n    }\n  }\n  isOverLapping(fullCoords, shipCoords) {\n    // get full cells from coordate gird\n    // check if genrete cords does not overlap with them \n    for (const fullCoord of fullCoords) {\n      if (shipCoords.some(coord => fullCoord.x === coord.x && fullCoord.y === coord.y)) {\n        return true;\n      }\n    }\n    ;\n    return false;\n  }\n  rundomizeCoordStarts(shipSize) {\n    let gameBoardSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.size;\n    const shipCoords = {\n      x: Math.round(Math.random() * (gameBoardSize - shipSize)),\n      y: Math.round(Math.random() * (gameBoardSize - shipSize))\n    };\n    return shipCoords;\n    //    {7,7+1+1+1+1}\n  }\n  fillingCoords(newCoords) {\n    newCoords.forEach(newCoord => {\n      this.grid[newCoord.x].rowItems[newCoord.y].full = true;\n      //   console.log(this.grid[newCoord.x].rowItems[newCoord.y])\n    });\n  }\n  receiveAttack(coord) {\n    //  determines whether or not the attack hit a ship and then sends the ‘hit’\n    // function to the correct ship, or records the coordinates of the missed shot.\n    //Gameboards should keep track of missed attacks so they can display them properly\n    let attackedShip;\n    // const attackedShip =  this.ships.find((ship.coords=> ship.x === coord.x && ship.y === coord.y));\n    for (const ship of this.ships) {\n      if (ship.coords.some(shipCoord => shipCoord.x === coord.x && shipCoord.y === coord.y)) attackedShip = ship;\n    }\n    if (attackedShip) {\n      attackedShip.hit(coord);\n      this.grid[coord.x].rowItems[coord.y].gotHit = true;\n    } else {\n      this.grid[coord.x].rowItems[coord.y].gotHit = true; //miss on board\n    }\n  }\n  getFullCoords() {\n    let grid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.grid;\n    const fullCoordsArr = [];\n    grid.forEach(row => {\n      row.rowItems.filter(coord => {\n        if (coord.full) {\n          fullCoordsArr.push(coord);\n        }\n      });\n    });\n    return fullCoordsArr;\n  }\n  gameOver() {\n    let ships = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.ships;\n    //Gameboards should be able to report whether or not all of their ships have been sunk.\n    return ships.every(ship => ship.isSunk());\n  }\n}\n// const g= new Gameboard();\n// console.log(g.rundomizeCoordStarts())\nmodule.exports = Gameboard;\n\n//# sourceURL=webpack://battleship_game/./src/gameBoard.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _domController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domController */ \"./src/domController.js\");\n// const domController = require('./domController');\n\n\n(0,_domController__WEBPACK_IMPORTED_MODULE_1__.gameSetUp)();\n\n//# sourceURL=webpack://battleship_game/./src/main.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const gameBoard = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\nclass Player {\n  constructor(name, type) {\n    this.name = name;\n    this.gameBoard = new gameBoard();\n  }\n  // play(coord){\n\n  //     if(this.gameBoard.grid[coord.x].rowItems[coord.y].full){\n  //         this.gameBoard.receveAttac\n  //     }\n\n  // }\n  generateRandomShips() {\n    //reset to empty\n    this.resetShips();\n    this.gameBoard.placeShip(4);\n    this.gameBoard.placeShip(3);\n    this.gameBoard.placeShip(2);\n    this.gameBoard.placeShip(1);\n  }\n  resetShips() {\n    this.gameBoard.ships = [];\n    // const fullCoords = this.gameBoard.getFullCoords();\n    this.gameBoard.grid.forEach(row => {\n      row.rowItems.forEach(coord => {\n        coord.full = false;\n        coord.gotHit = false;\n      });\n    });\n  }\n  randomAttak() {\n    let point = {\n      x: Math.round(Math.random() * (this.gameBoard.size - 1)),\n      y: Math.round(Math.random() * (this.gameBoard.size - 1))\n    };\n    return point;\n  }\n}\n\n// determine where to randomize ship placese and how\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleship_game/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("class Ship {\n  constructor(startPoint, length) {\n    this.length = length;\n    this.hits = 0;\n    this.sunk = false;\n    this.coords = this.genertateCoords(startPoint, length);\n  }\n  genertateCoords(startPoint, length) {\n    let coords = [];\n    for (let i = 0; i < length; i++) {\n      coords.push({\n        x: startPoint.x,\n        y: startPoint.y + i\n      });\n    }\n    return coords;\n  }\n  isSunk() {\n    //  console.log(this)\n    // console.log(this.hits , this.length)\n    // console.log(this.hits == this.length)\n    if (this.hits === this.length) {\n      this.sunk = true;\n    }\n    return this.sunk;\n  }\n  hit(coord) {\n    this.coords.some(shipCoord => {\n      if (shipCoord.x === coord.x && shipCoord.y === coord.y) {\n        this.hits++;\n      }\n    });\n  }\n}\n\n// export {\n//   Ship\n// }\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack://battleship_game/./src/ship.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship_game/./src/style.css?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/main.js"));
/******/ }
]);