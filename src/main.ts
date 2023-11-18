import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { createRouter, createWebHashHistory } from "vue-router"
import { routes } from "./routes"
import App from "./App.vue"

createApp(App)
	.use(createPinia())
	.use(
		createRouter({
			history: createWebHashHistory(),
			routes
		})
	)
	.mount("#app")
