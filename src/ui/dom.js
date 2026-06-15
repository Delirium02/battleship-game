import { GameController } from "../gameController.js";

const playerContainer = document.querySelector(".player-container");
const computerContainer = document.querySelector(".computer-container");

export function DOM(initialGame) {
	let game = initialGame;

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

		generateRandomShips: function (game, user) {
			const shipTypes = [
				{ name: "Carrier", length: 5 },
				{ name: "Cruiser", length: 4 },
				{ name: "Submarine", length: 3 },
				{ name: "Destroyer", length: 3 },
				{ name: "Frigate", length: 2 },
				{ name: "Corvette", length: 2 },
			];

			const orientation = ["vertical", "horizontal"];

			shipTypes.forEach((ship) => {
				let placed = false;

				while (!placed) {
					const randomOrientation =
						orientation[
							Math.floor(Math.random() * orientation.length)
						];

					const x = Math.floor(Math.random() * 10);
					const y = Math.floor(Math.random() * 10);

					try {
						user(ship.name, ship.length, x, y, randomOrientation);
						placed = true;
					} catch (error) {}
				}
			});
		},

		launchGame: function (activeGame) {
			game = activeGame;

			this.generateRandomShips(game, game.playerShip.bind(game));
			this.generateRandomShips(game, game.compShip.bind(game));

			playerContainer.innerHTML = "";
			computerContainer.innerHTML = "";
			this.playerGrid();
			this.computerGrid();
			this.attackListeners();
			this.updateDisplay(
				document.querySelector(".player-container"),
				game.playerBoard(),
			);
			this.updateDisplay(
				document.querySelector(".computer-container"),
				game.computerBoard(),
			);
		},

		startGame: function () {
			const startBtn = document.querySelector(".start-btn");

			startBtn.addEventListener("click", () => {
				startBtn.style.display = "none";
				this.launchGame(GameController());
			});
		},
	};
}
