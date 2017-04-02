'use strict';

const ui = require('./games/ui.js');
const store = require('./store');
const config = require('./config');

let gameBoard = [
    '-', '-', '-',
    '-', '-', '-',
    '-', '-', '-',
  ];

//default variables for things that could switch after each move
let player = 'X';

let spotTaken = false;

let gameOver = false;

let fullBoard = false;

let turn = 0;

const reset = function () {

  //reassigns gameBoard to a blank array
  gameBoard = [
      '-', '-', '-',
      '-', '-', '-',
      '-', '-', '-',
    ];

  //reassigns fullBoard status, player, turn, and gameOver status to default
  fullBoard = false;
  gameOver = false;
  turn = 0;
  player = 'X';

  //empties the board visually
  $('#winner-status').text('');
  $('.box').text('');

  return;
};

const threeInARow = function (player, cellOne, cellTwo, cellThree) {

  //determines if selected cells are all equal to the same player
  if ((cellOne === player) && (cellTwo === player) && (cellThree === player)) {

    return true;
  }
};

const winRow = function (player) {

  //sets conditions for winning a row
  if (threeInARow(player, gameBoard[0], gameBoard[1], gameBoard[2]) ||
  threeInARow(player, gameBoard[3], gameBoard[4], gameBoard[5]) ||
  threeInARow(player, gameBoard[6], gameBoard[7], gameBoard[8])) {

    //Displays a visual for the user indicating a win
    $('#winner-status').text("Congratulations! Player '" + player + "' is the winner!");

    //reassigns gameOver status as true to end the game
    gameOver = true;

    return;
  } else {

    return false;
  }
};

const winColumn = function (player) {

  //sets conditions for winning a column
  if (threeInARow(player, gameBoard[0], gameBoard[3], gameBoard[6]) ||
  threeInARow(player, gameBoard[1], gameBoard[4], gameBoard[7]) ||
  threeInARow(player, gameBoard[2], gameBoard[5], gameBoard[8])) {

    $('#winner-status').text("Congratulations! Player '" + player + "' is the winner!");
    gameOver = true;

    return;
  } else {

    return false;
  }
};

const winDiag = function (player) {

  //sets conditions for winning diagonally
  if (threeInARow(player, gameBoard[0], gameBoard[4], gameBoard[8]) ||
  threeInARow(player, gameBoard[2], gameBoard[4], gameBoard[6])) {

    $('#winner-status').text("Congratulations! Player '" + player + "' is the winner!");
    gameOver = true;

    return;
  } else {

    return false;
  }
};

const tieGame = function () {

  //tests if the board is full AND if there's no winner
  if (fullBoard === true && winRow(player) === false && winColumn(player) === false && winDiag(player) === false) {
    $('#winner-status').text('Well played! Tie Game!');
    gameOver = true;

    return;
  } else {

    return false;
  }
};

const isSpotTaken = function (element) {

  //determines if a cell has already been used
  return element !== '-';
};

const isBoardFull = function () {

  //determines if all the cells have been used
  if (gameBoard.every(isSpotTaken)) {
    fullBoard = true;
  }
};

const winnerIs = function (player) {

  //determines who the winner is
  return winRow(player) || winColumn(player) || winDiag(player);
};

const getWinner = function () {

  //checks if the board is full so we can run tieGame
  isBoardFull();

  //sets rules for the tie game, winner
  if (tieGame()) {

    return;
  } else if (winnerIs(player[0])) {

    return;
  } else if (winnerIs(player[1])) {

    return;
  } else if (winnerIs(player[0] === false && winnerIs(player[1] === false && tieGame() === false))) {

    //if nobody has won or tied, keeps gameOver as false
    gameOver = false;
  }
};

//patches or updates the game online
//takes parameters that PATCH looks for when onUpdateGame is run
const update = function (id, gameIndex, player, gameOver) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data: {
      game: {
        cell: {
          index: gameIndex,
          value: player,
        },
        over: gameOver,
      },
    },
  });
};

//points update function to look at game id, gameBoard index, player, and gameOver status
const onUpdateGame = function () {
  update(store.game.id, event.target.id, player, gameOver)

    .then(ui.onPatchSuccess)
    .catch(ui.onError)
    ;
};

const yourMove = function (event) {
  let index = event.target.id;

  //for the length of the gameBoard, if gameBoard[index] is not an empty string,
  //spotTaken is reassigned as true
  //defines spotTaken
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[index] !== '-') {
      spotTaken = true;
    } else {
      spotTaken = false;
    }
  }

  //sets condition for what happens when the spotTaken is true
  //cannot move forward, must pick a different spot
  if (spotTaken === true && fullBoard === false && gameOver === false) {
    $('#winner-status').text('Please pick somewhere else!');

  //if spotTaken is false, the next person can move
  } else if (gameOver === true) {
    return;
  } else if (spotTaken === false) {
    $('#winner-status').text('');
    turn++;

    //every other turn is x or o
    if (turn % 2 === 0) {
      player = 'O';
      gameBoard[index] = player;
    } else {
      player = 'X';
      gameBoard[index] = player;
    }

    //if the gameBoard[index] is the same as a player
    //change the text in index.html to incude the player name
    for (let i = 0; i < player.length; i++) {
      if (gameBoard[index] === player[i] && gameOver !== true) {
        this.innerText = player[i];
      }
    }
    //check for winner
    getWinner();

    //updates the game to the server
    onUpdateGame();
  }

  return;
};

module.exports = {
  yourMove,
  reset,
  gameBoard,
  player,
  gameOver,
};
