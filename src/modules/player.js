import { Gameboard } from "./gameBoard.js";

export function Player(name = "Player") {
	const board = Gameboard();

	return {
		getPlayerName: function () {
			return name;
		},

		getPlayerBoard: function () {
			return board;
		},

		playerAttack: function (enemyBoard, x, y) {
			return enemyBoard.receiveAttack(x, y);
		},
	};
}

export function Computer(name = "Computer") {
	const board = Gameboard();
	let lastAttack = [];

	return {
		getComputerName: function () {
			return name;
		},

		getComputerBoard: function () {
			return board;
		},

		getLastAttack: function () {
			return lastAttack;
		},

		computerAttack: function (playerBoard) {
			let x;
			let y;

			do {
				x = Math.floor(Math.random() * 10);
				y = Math.floor(Math.random() * 10);
			} while (playerBoard.getGrid()[x][y] !== null);

			lastAttack = [x, y];

			return playerBoard.receiveAttack(x, y);
		},
	};
}
