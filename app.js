// app.js
import { UIManager } from './src/utils/UIManager.js';
import { Player } from './src/models/Player.js';
import { Loader } from './src/services/Loader.js';
import { GameController } from './src/controllers/GameController.js';
import { MessageHandler } from './src/services/MessageHandler.js';

const INITIAL_DATA_FILE = '../data/js-for-loops.json';

const player = new Player();
const loader = new Loader();

const gameController = new GameController( { player, uiManager:null, loader } );
const messageHandler = new MessageHandler();

const uiManager = new UIManager(gameController, messageHandler);

// Update gameController with the actual uiManager instance
gameController.uiManager = uiManager;

gameController.startGame(INITIAL_DATA_FILE);