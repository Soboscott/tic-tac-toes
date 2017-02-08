'use strict';

// require('./assets/scripts/index.js');
// //
// require('./assets/styles/index.scss');



const board = ["","","","","","","","",""];
//create the gameboard as an array object
//global variables
let currentPlayer = "X";
let newGame = ('#reset');
let endGame = board.includes('')===false;
//function that resets the board
const resetGameBoard = function() {
  for (let i = 0; board.length; i++) {
    board[i] = '';
    $('.box').text(''); //box for html boxes
  }
};
//when clicking new game, this runs resetGameBoard function
  newGame.on('click', function(){
    resetGameBoard();
  });
const game = function (board) {
 this.board = board;
 this.currentPlayer = 'x';
 this.wins = [
       [0,1,2],[3,4,5],[6,7,8], // Row
       [0,3,6],[1,4,7],[2,5,8], // col
       [0,4,8],[2,4,6]]; // diag
};
//function that goes through all possible win options for x and o and then tie
let possibleWins = function () {
  if ((board[0] === 'x' && board[1] === 'x' && board[2] === 'x') ||
      (board[3] === 'x' && board[4] === 'x' && board[5] === 'x') ||
      (board[6] === 'x' && board[7] === 'x' && board[8] === 'x') ||
      (board[0] === 'x' && board[3] === 'x' && board[6] === 'x') ||
      (board[1] === 'x' && board[4] === 'x' && board[7] === 'x') ||
      (board[2] === 'x' && board[5] === 'x' && board[8] === 'x') ||
      (board[0] === 'x' && board[4] === 'x' && board[8] === 'x') ||
      (board[2] === 'x' && board[4] === 'x' && board[6] === 'x'))
    {
      $('win').text=("X wins!");
      console.log("X wins!");
      endGame();
}  else if
    ((board[0] === 'o' && board[1] === 'o' && board[2] === 'o') ||
      (board[3] === 'o' && board[4] === 'o' && board[5] === 'o') ||
      (board[6] === 'o' && board[7] === 'o' && board[8] === 'o') ||
      (board[0] === 'o' && board[3] === 'o' && board[6] === 'o') ||
      (board[1] === 'o' && board[4] === 'o' && board[7] === 'o') ||
      (board[2] === 'o' && board[5] === 'o' && board[8] === 'o') ||
      (board[0] === 'o' && board[4] === 'o' && board[8] === 'o') ||
      (board[2] === 'o' && board[4] === 'o' && board[6] === 'o'))
      {
   {
     $('win').text=("O wins!");
     console.log("O wins!");
     endGame();
 }
} else {
    if (board.includes('')===false){
      $('win').text=("Tie!");
      console.log("Tie!");
      endGame();
    }
    }
  };
//starting with currentPlayer, place X on board. If there is X on board then player2 turn and place O on board
let switchTurn = function (index) {
  if (board[index]===''){
    board[index] = currentPlayer;
    possibleWins();
    if(currentPlayer === "X"){
      currentPlayer = "O";
  }else{
    currentPlayer = "X";
    }
  }
};

//getting the dom to interact with the JS

$('.box').on('click', (event) => {
  let currentCell = event.target.id;
  $(currentCell).text("X");
  //(.this)remove;
  $(currentCell).text("O");
  //(.this)remove;
});
$('.box').on('click', function(){
});
  //this is how each player on the dom changes
  // const player1 = 'X';
  // const player2 = 'O';


  const yourMove = function (move) {
    if (board[move] !== '') {
      console.log('Please try agian.');
      return;
    } else if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else if (currentPlayer === 'O') {
      currentPlayer = 'X';
    }
    board[move] = currentPlayer;
    console.log(board);
  };


module.exports = {
  game,
  endGame,
  resetGameBoard,
  switchTurn,
  yourMove
};

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// load manifests
// scripts


// // styles
// const index =  require('.assets/styles/index.scss');
const api = require('.assets/scripts/game/api.js');
const event = require('.assets/scripts/game/events.js');
const ui =  require('.assets/scripts/game/ui.js');
