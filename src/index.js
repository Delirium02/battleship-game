import { Ship } from "./modules/ship.js";
import { GameController } from "./gameController";
import { DOM } from "./ui/dom";
import "./ui/style.css";

const game = GameController();

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
