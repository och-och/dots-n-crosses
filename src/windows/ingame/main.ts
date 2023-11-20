import "@/assets/ingame.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "@/windows/ingame/App.vue"

createApp(App).use(createPinia()).mount("#app")
