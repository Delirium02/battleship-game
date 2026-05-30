import { Ship } from "./modules/ship";
import { GameController } from "./gameController";

describe("game controller factory functions testing", () => {
	test("switch turn function", () => {
		const game = GameController();
		expect(game.getActivePlayer().getPlayerName()).toBe("Player");
		game.switchTurn();
		expect(game.getActivePlayer().getComputerName()).toBe("Computer");
	});

	test("play round function", () => {
		const game = GameController();
		const destroyerShip = Ship("Destroyer", 3);

		const playerBoard = game.playerBoard();
		const playerDestroyer = game.playerShip(destroyerShip, 6, 5);

		const computerBoard = game.computerBoard();
		const computerDestroyer = game.compShip(destroyerShip, 6, 5);

		game.playRound(6, 5);
		expect(computerBoard.getGrid()[6][5]).toBe("hit");
		expect(game.getActivePlayer().getPlayerName()).toBe("Player");
	});
});
