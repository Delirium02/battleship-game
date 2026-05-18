import { Gameboard } from "./gameBoard.js";

export function Player(name = "Player") {
  const board = Gameboard();

  return {
    getPlayerName: function() {
      return name;
    },

    getPlayerBoard: function() {
      return board;
    },

    playerAttack: function(enemyBoard, x, y) {
      return enemyBoard.receiveAttack(x, y);
    }
  }
}