import { deleteFile, readFile, writeFile } from "@/utils/fs"
import { validateOptions } from "@/utils/optionsValidator"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useOptions = defineStore("options", () => {
	const options = ref({
		selectedCrosshair: ""
	})

	async function load() {
		const rawOptions = await readFile("options.json").catch(() => null)
		if (!rawOptions) {
			return
		}

		console.log(rawOptions)

		options.value = validateOptions(JSON.parse(rawOptions))
	}

	async function save() {
		writeFile("options.json", JSON.stringify(options.value))
	}

	function useCrosshair(crosshair: Crosshair) {
		options.value.selectedCrosshair = crosshair.id
		save()
	}

	return { options, load, save, useCrosshair }
})
