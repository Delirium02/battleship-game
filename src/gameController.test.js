import { GameController } from "./gameController";

describe("game controller factory functions testing", () => {
  test("switch turn function", () => {
    let game = GameController();
    expect(game.getActivePlayer().getPlayerName()).toBe("Player");
    game.switchTurn();
    expect(game.getActivePlayer().getComputerName()).toBe("Computer");
  });
})