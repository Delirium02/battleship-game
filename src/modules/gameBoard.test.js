import { Ship } from "./ship";
import { Gameboard } from "./gameBoard";

describe("collective testing of the Gameboard() factory", () => {
	// getBoard() test
	test("testing getBoard() function", () => {
		const grid = Gameboard().getGrid();

		// test that the grid has 10 arrays, each having a length of 10
		expect(grid).toHaveLength(10);
		grid.forEach((row) => {
			expect(row).toHaveLength(10);
		});
	});

	test("testing placeShip() function", () => {
		const game = Gameboard();
		const destroyer = Ship("Destroyer", 3);
		game.placeShip(destroyer, 2, 2);
		const grid = game.getGrid();

		expect(grid[2][2]).not.toBeNull();
		expect(typeof grid[2][2]).toBe("object");
		// checking if it defaulted to vertical placement
		expect(grid[2][4]).toBe(destroyer);
	});

	test("testing receiveAttack", () => {
		const game = Gameboard();
		const destroyer = Ship("Destroyer", 3);
		game.placeShip(destroyer, 2, 2);
		game.receiveAttack(0, 1);
		game.receiveAttack(2, 2);
		const grid = game.getGrid();

		expect(grid[0][1]).toBe("miss");
		expect(grid[2][2]).toBe("hit");
	});

	test("testing if allSunk() returns true when all ships are sunk and false if not", () => {
		const game = Gameboard();
		const destroyer = Ship("Destroyer", 3);
		game.placeShip(destroyer, 2, 2);
		game.receiveAttack(2, 2);
		game.receiveAttack(2, 3);
		game.receiveAttack(2, 4);

		expect(game.allSunk()).toBe(true);
	});
});
