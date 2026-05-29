import { GameController } from "../gameController.js";

const playerContainer = document.querySelector(".player-container");
const computerContainer = document.querySelector(".computer-container");

export function DOM() {
	const game = GameController();

	let grid = [];

	return {
		generateGrid: function() {
			const grid = game.playerBoard().getGrid();

			grid.forEach((row, x) => {
				row.forEach((square, y) => {
					const newSquare = document.createElement("div");
					newSquare.classList.add("cell");
					playerContainer.appendChild(newSquare);
				});
			});
		},
	};
}
