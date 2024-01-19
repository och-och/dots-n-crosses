import { gameEventEmitted, gameInfoUpdated } from "@/utils/messages"
import { OWGames, OWGameListener, OWWindow, OWGamesEvents } from "@overwolf/overwolf-api-ts"

const VALORANT_ID = 21640
const launchOriginsToOpenMainWindow = [
	"dock",
	"hotkey",
	"storeapi",
	"odk",
	"commandline",
	"tray",
	"startup",
	"after-install",
	"urlscheme"
]

const features = [
	"gep_internal",
	"me",
	"game_info",
	"match_info",
	"kill",
	"death"
]

let mainWindow: OWWindow
let ingameWindow: OWWindow
let gameListener: OWGameListener

launch()

async function launch() {
	// await setRequiredFeatures(features)
	gameListener = new OWGameListener({ onGameStarted, onGameEnded })
	gameListener.start()

	mainWindow = new OWWindow("MainWindow")
	ingameWindow = new OWWindow("IngameWindow")

	createTrayIcon()

	overwolf.extensions.onAppLaunchTriggered.addListener(event => {
		console.log(event)
		if (launchOriginsToOpenMainWindow.includes(event.origin)) {
			mainWindow.restore()
		}
	})
}

function listenForGameData() {
	new OWGamesEvents(
		{
			onNewEvents(event) {
				gameEventEmitted.send(event)
			},
			onInfoUpdates(info) {
				gameInfoUpdated.send(info)
			}
		},
		features,
		5
	).start()
}

async function setRequiredFeatures(features: string[], max_retries = 10) {
	let tries = 1

	while ( tries <= max_retries ) {
		const result: any = await new Promise(resolve => {
			overwolf.games.events.setRequiredFeatures(features, (v:any)=>resolve(v))
		})

		if ( result.success === true ) {
			// make sure our required features were registered
			return (result.supportedFeatures.length > 0)
		}

		// wait 3 sec before retry
		await new Promise(resolve => {
			setTimeout(resolve, 3000)
		})
		tries++
	}

	console.warn('setRequiredFeatures(): failure after '+ tries +' tries')
	return false
}

function createTrayIcon() {
	const actions: { [action: string]: (() => void) | undefined } = {
		open() {
			mainWindow.restore()
		},

		quit() {
			overwolf.windows.getMainWindow().close()
		}
	}

	const trayOptions: overwolf.os.tray.ExtensionTrayMenu = {
		menu_items: [
			{ id: "open", label: "Open Dots&Crosses" },
			{ id: "quit", label: "Exit" }
		]
	}

	overwolf.os.tray.setMenu(trayOptions, res => {
		if (res.error) return console.error(res.error)
		console.log("Created a tray icon")
	})

	overwolf.os.tray.onTrayIconClicked.addListener(() => mainWindow.restore())
	overwolf.os.tray.onMenuItemClicked.addListener(event => {
		actions[event.item]?.()
	})
}

function onGameStarted(gameInfo?: overwolf.games.RunningGameInfo) {
	console.log(`Running game`)
	if (!gameInfo) return console.log(`Or not. Info is ${gameInfo}`)

	console.log(`Got it, the game id is ${gameInfo.classId}`)
	if (gameInfo.classId != VALORANT_ID) return

	console.log("(It is valorant)")
	ingameWindow.restore()
	listenForGameData()
}

function onGameEnded(gameInfo?: overwolf.games.RunningGameInfo) {
	console.log(`Ending game`)
	if (!gameInfo) return console.log(`Or not. Info is ${gameInfo}`)

	console.log(`Got it, the game id is ${gameInfo.classId}`)
	if (gameInfo.classId != VALORANT_ID) console.log("(It is valorant)")
	ingameWindow.close()
}
