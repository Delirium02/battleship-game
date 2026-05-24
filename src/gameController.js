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
		},
	};
}
