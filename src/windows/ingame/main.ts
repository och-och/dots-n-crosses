import "@/assets/ingame.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "@/windows/ingame/App.vue"
import { OWGames } from "@overwolf/overwolf-api-ts/dist"

createApp(App).use(createPinia()).mount("#app")

overwolf.windows.getCurrentWindow(async ({ window }) => {
	updateWindowPosition(window, await OWGames.getRunningGameInfo())

	overwolf.games.onGameInfoUpdated.addListener(({ gameInfo, resolutionChanged }) => {
		if (resolutionChanged) updateWindowPosition(window, gameInfo!)
	})
})

async function updateWindowPosition(
	window: overwolf.windows.WindowInfo,
	gameSize: { logicalWidth: number; logicalHeight: number }
) {
	overwolf.windows.changePosition(window.id, 0, 0)
	overwolf.windows.changeSize({
		window_id: window.id,
		width: gameSize.logicalWidth,
		height: gameSize.logicalHeight,
		auto_dpi_resize: true
	})
}
