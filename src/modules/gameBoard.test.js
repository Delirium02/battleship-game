import { describe } from "node:test";
import { Ship } from "./ship";
import { Gameboard } from "./gameBoard";

describe("collective testing of the Gameboard() factory", () => {
	// getBoard() test
	test("testing getBoard() function", () => {
		const board = Gameboard().getBoard();

		// test that the board has 10 arrays, each having a length of 10
		expect(board).toHaveLength(10);
		board.forEach((row) => {
			expect(row).toHaveLength(10);
		});
	});

	test("testing placeShip() function", () => {
		const game = Gameboard();
		const destroyer = Ship("Destroyer", 3);
		game.placeShip(destroyer, 2, 2);
    const board = game.getBoard();

		expect(board[2][2]).not.toBeNull();
    expect(typeof board[2][2]).toBe('object');
    // checking if it defaulted to vertical placement
    expect(board[4][2]).toBe(destroyer);
	});

  test("testing receiveAttack", () => {
    const game = Gameboard();
		const destroyer = Ship("Destroyer", 3);
		game.placeShip(destroyer, 2, 2);
    game.receiveAttack(0, 1);
		game.receiveAttack(2, 2);
    const board = game.getBoard()
    
    expect(board[0][1]).toBe("miss");
    expect(board[2][2]).toBe("hit");
  })

	test("testing if allSunk() returns true when all ships are sunk and false if not", () => {
		const game = Gameboard();
		const destroyer = Ship("Destroyer", 3);
		game.placeShip(destroyer, 2, 2);
		game.receiveAttack(2, 2);
		game.receiveAttack(3, 2);
    game.receiveAttack(4, 2);

		expect(game.allSunk()).toBe(true);
	});
});
