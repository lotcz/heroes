import Wgge from "wgge";
import HeroesGameModel from "./game/HeroesGameModel";
import HeroesGameController from "./game/HeroesGameController";
import HeroesGameRenderer from "./game/HeroesGameRenderer";

const DEBUG_ENABLED = true;

const game = new HeroesGameModel(DEBUG_ENABLED);

game.isInDebugMode.set(false);

const wgge = new Wgge(
	new HeroesGameController(game),
	new HeroesGameRenderer(game, window.document.body)
)

wgge.start();

