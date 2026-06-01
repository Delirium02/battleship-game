import { GameController } from "../gameController.js";

const playerContainer = document.querySelector(".player-container");
const computerContainer = document.querySelector(".computer-container");

export function DOM(game) {

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

		updateDisplay: function (square) {
			const attackStatus = DOM().playerBoard().
			square.classList.add() //
		},

		attackListeners: function () {
			computerContainer.addEventListener("click", (e) => {
				if (e.target.classList.contains("square")) {
					const x = Number(e.target.dataset.x);
					const y = Number(e.target.dataset.y);

					const result = game.playRound(x, y);
					if (result === false) {
						return "This square has already been attacked"; // modify to display on screen instead of console
					}
					if (result === "hit") {
						e.target.classList.add("hit");
					}
					if (result === "miss") {
						e.target.classList.add("miss");
					}

					console.log(result);
				}
			})
		},

		/* startGame: function () {
			const startBtn = document.querySelector("start-btn");

			startBtn.addEventListener("click", () => {
				DOM().playerGrid();
				DOM().computerGrid();
			});
		}, */
	};
}
