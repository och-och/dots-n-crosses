import { validateCrosshairs } from "@/utils/crosshairValidator"
import { readFile, writeFile } from "@/utils/fs"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useCrosshairs = defineStore("crosshairs", () => {
	const crosshairs = ref<"loading" | Crosshair[]>("loading")

	async function load() {
		const rawCrosshairs = await readFile("crosshairs.json").catch(() => null)
		if (!rawCrosshairs) {
			crosshairs.value = []
			return
		}

		crosshairs.value = validateCrosshairs(JSON.parse(rawCrosshairs))
	}

	function save() {
		writeFile("crosshairs.json", JSON.stringify(crosshairs.value))
	}

	function addCrosshair(crosshair: Crosshair) {
		if (!(crosshairs.value instanceof Array)) {
			return
		}
		crosshairs.value.push(crosshair)
		save()
	}

	function deleteCrosshair(index: number) {
		if (!(crosshairs.value instanceof Array)) {
			return
		}
		if (index < 0 || index >= crosshairs.value.length) {
			return
		}
		crosshairs.value.splice(index, 1)
		save()
	}

	return { crosshairs, load, save, addCrosshair, deleteCrosshair }
})
