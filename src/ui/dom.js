import { GameController } from "../gameController.js";

const playerContainer = document.querySelector(".player-container");
const computerContainer = document.querySelector(".computer-container");

export function DOM() {
	const game = GameController();

	return {
		playerGrid: function () {
			const playerGrid = game.playerBoard().getGrid();

			playerGrid.forEach((row, x) => {
				row.forEach((item, y) => {
					const newSquare = document.createElement("div");
					newSquare.classList.add("square");

					newSquare.dataset.x = x;
					newSquare.dataset.y = y;

					playerContainer.appendChild(newSquare);
				});
			});
		},

		computerGrid: function () {
			const compGrid = game.computerBoard().getGrid();

			compGrid.forEach((row, x) => {
				row.forEach((item, y) => {
					const newSquare = document.createElement("div");
					newSquare.classList.add("square");

					newSquare.dataset.x = x;
					newSquare.dataset.y = y;

					computerContainer.appendChild(newSquare);
				});
			});
		},
	};
}
