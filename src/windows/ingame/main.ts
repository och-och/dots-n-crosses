import "@/assets/ingame.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "@/windows/ingame/App.vue"
import { OWGames } from "@overwolf/overwolf-api-ts/dist"

createApp(App).use(createPinia()).mount("#app")

overwolf.windows.getCurrentWindow(async ({ window }) => {
	if (!window) return

	const game = await OWGames.getRunningGameInfo()

	const left = game.logicalWidth / 2 - 150
	const top = game.logicalHeight / 2 - 150

	overwolf.windows.changePosition(window.id, left, top)
})
