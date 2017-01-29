'use strict';


  //set up the game board
const board = ["","","","","","","","",""];


//construct an array for players
let playerOne =[];
let playerTwo =[];

//all the winning combonations
//let winningCombo = [[0 === 1 === 2],[3 === 4 ===5],[6 === 7 === 8],[0 === 3 === 6],[1 === 4 === 7],[2 === 5 ===8],[2 === 4 ===6],[0 === 4 === 8]];

let winningCombo = [[0] === [1] === [2]] || [[3] === [4] === [5]] || [[6] === [7] === [8]] || [[0] === [3] === [6]] || [[1] === [4] ===[7]] || [[2] === [5] === [8]] || [[2] === [4] === [6]] || [[0] === [4] === [8]];

  //function for declairing a winner or a tie
// if(playerOne = winningCombo){
//   console.log;('playerOne wins!')
// };
//
// if(playerTwo = winningCombo){
//   console.log;('playerTwo wins')
//   }
// else {return ('Tie')
// )};
















// const checkDiagonals = (cells, id) => {
//   let win = true;
//   if ([0, 4, 8].indexOf(id) > -1) {
//     win = (cells[0] === cells[4]) && (cells[4] === cells[8]);
//   }
//
//   if ([2, 4, 6].indexOf(id) > -1) {
//     if ((cells[2] === cells[4]) && (cells[4] === cells[6])) {
//       win = true;
//     }
//   }
//
//   return win;
// };






});
