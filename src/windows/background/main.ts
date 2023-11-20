import {
	OWGames,
	OWGameListener,
	OWWindow
} from '@overwolf/overwolf-api-ts';


const VALORANT_ID = 21640
let mainWindow: OWWindow
let ingameWindow: OWWindow
let gameListener: OWGameListener

launch()


async function launch() {
	mainWindow = new OWWindow("MainWindow")
	ingameWindow = new OWWindow("IngameWindow")
	gameListener = new OWGameListener({ onGameStarted, onGameEnded })
	gameListener.start()

	onGameStarted(await OWGames.getRunningGameInfo())
}


function onGameStarted(gameInfo?: overwolf.games.RunningGameInfo) {
	console.log(`Running game`)
	if (!gameInfo) {
		return console.log(`Or not. Info is ${gameInfo}`)
	}

	console.log(`Got it, the game id is ${gameInfo.classId}`)
	if (gameInfo.classId == VALORANT_ID) {
		console.log("(It is valorant)")
		ingameWindow.restore()
	}
}


function onGameEnded(gameInfo?: overwolf.games.RunningGameInfo) {
	console.log(`Ending game`)
	if (!gameInfo) {
		return console.log(`Or not. Info is ${gameInfo}`)
	}

	console.log(`Got it, the game id is ${gameInfo.classId}`)
	if (gameInfo.classId == VALORANT_ID) {
		console.log("(It is valorant)")
		ingameWindow.close()
	}
}
