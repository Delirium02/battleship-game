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
		}
	};
}
