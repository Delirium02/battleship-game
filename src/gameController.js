import { Ship } from "./modules/ship.js";
import { Player, Computer } from "./modules/player.js";

export function GameController() {
	const player = Player();
	const computer = Computer();

	let activePlayer = player;

	return {
		switchTurn: function () {
			activePlayer = activePlayer === player ? computer : player;
		},

		getActivePlayer: function () {
			return activePlayer;
		},

		getPlayer: function () {
			return player;
		},

		getComputer: function () {
			return computer;
		},

		// shorthand for player's board
		playerBoard: function () {
			return player.getBoard();
		},

		// shorthand for computer's board
		computerBoard: function () {
			return computer.getBoard();
		},

		playerShip: function (name, length, x, y, orientation) {
			const ship = Ship(name, length);
			return player.getBoard().placeShip(ship, x, y, orientation);
		},

		// a simpler way to create a new ship - shorter link of functions
		compShip: function (name, length, x, y, orientation) {
			const ship = Ship(name, length);
			return computer.getBoard().placeShip(ship, x, y, orientation);
		},

		playRound: function (x, y) {
			const enemyBoard = () => {
				return activePlayer === player
					? computer.getBoard()
					: player.getBoard();
			};

			if (activePlayer === player) {
				if (enemyBoard().getGrid()[x][y] === "hit" || enemyBoard().getGrid()[x][y] === "miss") {
					return false;
				}
				activePlayer.playerAttack(enemyBoard(), x, y);
			}

			if (enemyBoard().allSunk()) {
				return `player won`;
			}

			this.switchTurn();

			if (activePlayer === computer) {
				activePlayer.computerAttack(enemyBoard());
			}

			if (enemyBoard().allSunk()) {
				return `computer won`;
			}

			this.switchTurn();

			return "turn complete";
		},
	};
}
