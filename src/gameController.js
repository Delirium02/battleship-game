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

    getPlayer: function() {
      return player;
    },

    getComputer: function() {
      return computer;
    },

		// shorthand for player's board
		playerBoard: function() {
			return player.getPlayerBoard();
		},

		// shorthand for computer's board
		computerBoard: function() {
			return computer.getComputerBoard();
		},

		playerShip: function(ship, x, y, orientation) {
			return player.getPlayerBoard().placeShip(ship, x, y, orientation);
		},

		// a simpler way to create a new ship - shorter link of functions
		compShip: function(ship, x, y, orientation) {
			return computer.getComputerBoard().placeShip(ship, x, y, orientation);
		},

		playRound: function (x, y) {
			const enemyBoard = () => {
				return activePlayer === player
					? computer.getComputerBoard()
					: player.getPlayerBoard();
			};

			if (activePlayer === player) {
				activePlayer.playerAttack(enemyBoard(), x, y);
			}

			if (enemyBoard().allSunk()) {
				return `Game over! ${activePlayer.getPlayerName()} won!`;
			}

			this.switchTurn();

			if (activePlayer === computer) {
				activePlayer.computerAttack(enemyBoard());
			}

			if (enemyBoard().allSunk()) {
				return `Game over! ${activePlayer.getComputerName()} won!`;
			}

			this.switchTurn();

			return "turn complete";
		},
	};
}
