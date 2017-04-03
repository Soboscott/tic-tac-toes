'use strict';
const game = require('./example');

// const authEvents = require('./auth/events');
// const authUi = require('./auth/ui');

const addHandlers = () => {

  //click handlers for boxes and resets
  $('#begin').on('click', game.reset);
  $('#reset').on('click', game.reset);
  $('#0').on('click', game.yourMove);
  $('#1').on('click', game.yourMove);
  $('#2').on('click', game.yourMove);
  $('#3').on('click', game.yourMove);
  $('#4').on('click', game.yourMove);
  $('#5').on('click', game.yourMove);
  $('#6').on('click', game.yourMove);
  $('#7').on('click', game.yourMove);
  $('#8').on('click', game.yourMove);

  //initial screen
  $('#sign-out').hide();
  $('#change-password').hide();
  $('#board').hide();
  $('.banner').hide();
  $('#game-search').hide();
  $('#reset').hide();
  $('#begin').hide();

  //board doesn't show up until you start a new game
  $('#begin').on('click', () => {
    $('#begin').hide();
    $('#board').show();
    $('#winner-status').show();
    $('#reset').show();
  });

  //on signing out, goes back to original sign in page
  $('#sign-out').on('submit', () => {
    $('#sign-in').show();
    $('#sign-up').show();
    $('#sign-out').hide();
    $('#change-password').hide();
    $('#board').hide();
    $('.banner').hide();
    $('#game-search').hide();
    $('#reset').hide();
    $('#begin').hide();
  });
};

module.exports = {
  addHandlers,
};
