import SaveGameGenerator from './SaveGameGenerator.js';
import HeroesResources from '../resources/HeroesResources.js';

self.onmessage = (e) => {
	const {width, height} = e.data;
	const generator = new SaveGameGenerator(new HeroesResources(), width, height);
	const savegame = generator.createSaveGame();
	self.postMessage(savegame.getState());
};
