import "@/assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { createRouter, createWebHashHistory } from "vue-router"
import { routes } from "@/windows/main/routes"
import App from "@/windows/main/App.vue"

createApp(App)
	.use(createPinia())
	.use(
		createRouter({
			history: createWebHashHistory(),
			routes
		})
	)
	.mount("#app")
