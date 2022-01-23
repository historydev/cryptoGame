
import {PreviewGame} from './gamePreview.class.mjs';
import {gameConfig} from "./game.config.mjs";

//console.log(new Date(2022, 2, 10, 1, 55, 10))


const game = new PreviewGame(gameConfig.general);
gameConfig.lands.forEach(el => game.addLand(el));
gameConfig.machines.forEach(el => game.addMachine(el));