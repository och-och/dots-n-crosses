import CrosshairsList from "@/pages/CrosshairsList.vue"
import CrosshairEditor from "@/pages/CrosshairEditor.vue"
import type { RouteRecordRaw } from "vue-router"

export const routes: readonly RouteRecordRaw[] = [
	{ name: "index", path: "/", component: CrosshairsList },
	{ name: "edit", path: "/edit/:id", component: CrosshairEditor },
	{ name: "new", path: "/new", component: CrosshairEditor }
]
