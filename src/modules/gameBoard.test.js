import { describe } from "node:test";
import { Gameboard } from "./gameBoard";

describe("Collective testing of the Gameboard() function", () => {
  // getBoard() test
  test("Testing getBoard() function", () => {
    const board = Gameboard().getBoard();

    // test that the board has 10 arrays, each having a length of 10
    expect(board).toHaveLength(10);
    board.forEach(row => {
      expect(row).toHaveLength(10);
    })
  });


})