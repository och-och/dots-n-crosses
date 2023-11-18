import { validateCrosshairs } from "@/utils/styles/crosshairValidator"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useCrosshairs = defineStore("crosshairs", () => {
	const crosshairs = ref<Crosshair[]>([])

	function load() {
		const rawCrosshairs = localStorage.getItem("crosshairs")
		if (!rawCrosshairs) {
			return
		}

		crosshairs.value = validateCrosshairs(JSON.parse(rawCrosshairs))
	}

	function save() {
		localStorage.setItem("crosshairs", JSON.stringify(crosshairs.value))
	}

	function addCrosshair(crosshair: Crosshair) {
		crosshairs.value.push(crosshair)
		save()
	}

	function deleteCrosshair(index: number) {
		if (index < 0 || index >= crosshairs.value.length) {
			return
		}
		crosshairs.value.splice(index, 1)
		save()
	}

	return { crosshairs, load, save, addCrosshair, deleteCrosshair }
})
