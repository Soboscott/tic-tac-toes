'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');
const gameEvents = require('./games/events');

$(() => {
  setAPIOrigin(location, config);
});

// use require with a reference to bundle the file and use it in this file
const example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

const auth = require('./auth/events');

const game = require('./game-events');

$(() => {
  game.addHandlers();
});

$(() => {
  auth.addHandlers();
});

$(() => {
  $('#game-search').on('submit', gameEvents.onGetGames);
  $('.new-game').on('click', gameEvents.onCreateGame);
});
