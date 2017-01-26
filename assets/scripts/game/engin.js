'use strict';


//the stuff they gave me
// const setAPIOrigin = require('../../lib/set-api-origin');
// const config = require('./config');

// $(() => {
//   setAPIOrigin(location, config);
// });

// creating the game board:

const board = ["","","","","","","","","",""];
//create the gameboard as an array object

const Game = function (board) {
  this.board = board;
  this.currentPlayer = 'x';
  this.wins = [
        [0,1,2],[3,4,5],[6,7,8], // Row
        [0,3,6],[1,4,7],[2,5,8], // col
        [0,4,8],[2,4,6]]; // diag
};

let possibleWins = function () {
  if ((board[0] === 'x' && board[1] === 'x' && board[2] === 'x') ||
      (board[3] === 'x' && board[4] === 'x' && board[5] === 'x') ||
      (board[6] === 'x' && board[7] === 'x' && board[8] === 'x') ||
      (board[0] === 'x' && board[3] === 'x' && board[6] === 'x') ||
      (board[1] === 'x' && board[4] === 'x' && board[7] === 'x') ||
      (board[2] === 'x' && board[5] === 'x' && board[8] === 'x') ||
      (board[0] === 'x' && board[4] === 'x' && board[8] === 'x') ||
      (board[2] === 'x' && board[4] === 'x' && board[6] === 'x'))
    {alert("X wins!");
}  else if
    ((board[0] === 'o' && board[1] === 'o' && board[2] === 'o') ||
      (board[3] === 'o' && board[4] === 'o' && board[5] === 'o') ||
      (board[6] === 'o' && board[7] === 'o' && board[8] === 'o') ||
      (board[0] === 'o' && board[3] === 'o' && board[6] === 'o') ||
      (board[1] === 'o' && board[4] === 'o' && board[7] === 'o') ||
      (board[2] === 'o' && board[5] === 'o' && board[8] === 'o') ||
      (board[0] === 'o' && board[4] === 'o' && board[8] === 'o') ||
      (board[2] === 'o' && board[4] === 'o' && board[6] === 'o')) {
   {alert("O wins!");
 }
} else {
    alert("Draw!");
  }
};

// Game.prototype.setMove = function (board){
//   this.board[] = this.player;
// };


module.exports = {
  Game,
  possibleWins,
  board,

};
