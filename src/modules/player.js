import { Gameboard } from "./gameBoard.js";

export function Player(name = "Player") {
	const board = Gameboard();

	return {
		getName: function () {
			return name;
		},

		getBoard: function () {
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
		getName: function () {
			return name;
		},

		getBoard: function () {
			return board;
		},

		getLastAttack: function () {
			return lastAttack;
		},

		computerAttack: function (playerBoard) {
			const validMoves = [];

			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 10; j++) {
					if (playerBoard.getGrid()[i][j] === null) {
						validMoves.push({ x: i, y: j });
					}
				}
			}

			const randomIndex = validMoves[Math.floor(Math.random() * validMoves.length)];

			return playerBoard.receiveAttack(randomIndex.x, randomIndex.y);
		},
	};
}
