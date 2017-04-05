webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Load all specs so webpack can find them. Think of this as an automatic
	// manifest for bundling specs.

	var req = __webpack_require__(26);
	req.keys().forEach(req);

/***/ },

/***/ 6:
/***/ function(module, exports) {

	'use strict';

	var config = {
	  apiOrigins: {
	    production: 'https://aqueous-atoll-85096.herokuapp.com',
	    development: 'http://tic-tac-toe.wdibos.com'
	  }
	};

	module.exports = config;

/***/ },

/***/ 9:
/***/ function(module, exports) {

	'use strict';

	var store = {};

	module.exports = store;

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var ui = __webpack_require__(11);
	var store = __webpack_require__(9);
	var config = __webpack_require__(6);

	var gameBoard = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

	//default variables for things that could switch after each move
	var player = 'X';

	var spotTaken = false;

	var gameOver = false;

	var fullBoard = false;

	var turn = 0;

	var reset = function reset() {

	  //reassigns gameBoard to a blank array
	  gameBoard = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

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

	var threeInARow = function threeInARow(player, cellOne, cellTwo, cellThree) {

	  //determines if selected cells are all equal to the same player
	  if (cellOne === player && cellTwo === player && cellThree === player) {

	    return true;
	  }
	};

	var winRow = function winRow(player) {

	  //sets conditions for winning a row
	  if (threeInARow(player, gameBoard[0], gameBoard[1], gameBoard[2]) || threeInARow(player, gameBoard[3], gameBoard[4], gameBoard[5]) || threeInARow(player, gameBoard[6], gameBoard[7], gameBoard[8])) {

	    //Displays a visual for the user indicating a win
	    $('#winner-status').text("Congratulations! Player '" + player + "' is the winner!");

	    //reassigns gameOver status as true to end the game
	    gameOver = true;

	    return;
	  } else {

	    return false;
	  }
	};

	var winColumn = function winColumn(player) {

	  //sets conditions for winning a column
	  if (threeInARow(player, gameBoard[0], gameBoard[3], gameBoard[6]) || threeInARow(player, gameBoard[1], gameBoard[4], gameBoard[7]) || threeInARow(player, gameBoard[2], gameBoard[5], gameBoard[8])) {

	    $('#winner-status').text("Congratulations! Player '" + player + "' is the winner!");
	    gameOver = true;

	    return;
	  } else {

	    return false;
	  }
	};

	var winDiag = function winDiag(player) {

	  //sets conditions for winning diagonally
	  if (threeInARow(player, gameBoard[0], gameBoard[4], gameBoard[8]) || threeInARow(player, gameBoard[2], gameBoard[4], gameBoard[6])) {

	    $('#winner-status').text("Congratulations! Player '" + player + "' is the winner!");
	    gameOver = true;

	    return;
	  } else {

	    return false;
	  }
	};

	var tieGame = function tieGame() {

	  //tests if the board is full AND if there's no winner
	  if (fullBoard === true && winRow(player) === false && winColumn(player) === false && winDiag(player) === false) {
	    $('#winner-status').text('Well played! Tie Game!');
	    gameOver = true;

	    return;
	  } else {

	    return false;
	  }
	};

	var isSpotTaken = function isSpotTaken(element) {

	  //determines if a cell has already been used
	  return element !== '-';
	};

	var isBoardFull = function isBoardFull() {

	  //determines if all the cells have been used
	  if (gameBoard.every(isSpotTaken)) {
	    fullBoard = true;
	  }
	};

	var winnerIs = function winnerIs(player) {

	  //determines who the winner is
	  return winRow(player) || winColumn(player) || winDiag(player);
	};

	var getWinner = function getWinner() {

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
	var update = function update(id, gameIndex, player, gameOver) {
	  return $.ajax({
	    url: config.apiOrigin + '/games/' + id,
	    method: 'PATCH',
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    },
	    data: {
	      game: {
	        cell: {
	          index: gameIndex,
	          value: player
	        },
	        over: gameOver
	      }
	    }
	  });
	};

	//points update function to look at game id, gameBoard index, player, and gameOver status
	var onUpdateGame = function onUpdateGame() {
	  update(store.game.id, event.target.id, player, gameOver).then(ui.onPatchSuccess).catch(ui.onError);
	};

	var yourMove = function yourMove(event) {
	  var index = event.target.id;

	  //for the length of the gameBoard, if gameBoard[index] is not an empty string,
	  //spotTaken is reassigned as true
	  //defines spotTaken
	  for (var i = 0; i < gameBoard.length; i++) {
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
	    for (var _i = 0; _i < player.length; _i++) {
	      if (gameBoard[index] === player[_i] && gameOver !== true) {
	        this.innerText = player[_i];
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
	  yourMove: yourMove,
	  reset: reset,
	  gameBoard: gameBoard,
	  player: player,
	  gameOver: gameOver
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var onSuccess = function onSuccess(data) {
	  if (data.game) {
	    console.log(data.game);
	  } else {
	    console.log(data.games);
	  }
	};

	var onIndexSuccess = function onIndexSuccess(data) {
	  if (data.games) {
	    console.log(data.games);
	    for (var i = 0; i < data.games.length; i++) {
	      $('#search-result').text('You played this game ' + data.games.length + ' times! ');
	      // $('#search-result').append(' You won this game ' + data.games[i].over[true].length + ' times!');
	      $('#search-result').append("Most recent game: " + data.games[i].id + ": " + data.games[i].cells);
	    }
	  }
	};

	var onGetSuccess = function onGetSuccess(data) {
	  if (data.game) {
	    console.log(data.game);
	    $('#search-result').text(data.game.cells);
	  }
	};

	var onError = function onError(response) {
	  console.error(response);
	};

	var onPostSuccess = function onPostSuccess(data) {
	  console.log(data);
	};

	var onPatchSuccess = function onPatchSuccess(data) {
	  console.log(data.game);
	};

	module.exports = {
	  onSuccess: onSuccess,
	  onError: onError,
	  onPostSuccess: onPostSuccess,
	  onPatchSuccess: onPatchSuccess,
	  onGetSuccess: onGetSuccess,
	  onIndexSuccess: onIndexSuccess
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./example.spec.js": 27
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 26;


/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var example = __webpack_require__(10);

	describe('Example', function () {
	  it('is true', function () {
	    expect(example).toBe(true);
	  });
	});

/***/ }

});