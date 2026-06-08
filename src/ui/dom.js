import { Ship } from "../modules/ship.js";
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

		// for container: playerContainer or computerContainer. for board: playerBoard or computerBoard
		updateDisplay: function (container, board) {
			const squares = container.querySelectorAll(".square");
			const boardGrid = board.getGrid();

			boardGrid.forEach((row, x) => {
				row.forEach((cell, y) => {
					const index = x * 10 + y;
					const square = squares[index];
					if (
						cell !== null &&
						container.classList.contains("player-container")
					) {
						square.classList.add("ship");
					}
					if (cell === "hit") {
						square.classList.add("hit");
					}
					if (cell === "miss") {
						square.classList.add("miss");
					}
				});
			});
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
					this.updateDisplay(playerContainer, game.playerBoard());
					this.updateDisplay(computerContainer, game.computerBoard());
				}
			});
		},

		generateRandomShips: function () {},

		startGame: function () {
			const startBtn = document.querySelector(".start-btn");

			const launchGame = (game) => {
				game.playerShip(Ship("destroyer", 2), 0, 0, "horizontal");
				game.playerShip(Ship("submarine", 3), 2, 2, "vertical");
				game.playerShip(Ship("cruiser", 3), 5, 5, "horizontal");
				game.playerShip(Ship("battleship", 4), 4, 0, "vertical");
				game.playerShip(Ship("carrier", 5), 9, 4, "horizontal");

				game.compShip(Ship("destroyer", 2), 0, 0, "horizontal");
				game.compShip(Ship("submarine", 3), 2, 2, "vertical");
				game.compShip(Ship("cruiser", 3), 5, 5, "horizontal");
				game.compShip(Ship("battleship", 4), 4, 0, "vertical");
				game.compShip(Ship("carrier", 5), 9, 4, "horizontal");

				const ui = DOM(game);
				ui.playerGrid();
				ui.computerGrid();
				ui.attackListeners();
				ui.updateDisplay(
					document.querySelector(".player-container"),
					game.playerBoard(),
				);
				ui.updateDisplay(
					document.querySelector(".computer-container"),
					game.computerBoard(),
				);
			};

			startBtn.addEventListener("click", () => {
				startBtn.style.display = "none";
				launchGame(GameController());
			});
		},
	};
}
