import { readFile, writeFile } from "@/utils/fs"
import { validateOptions } from "@/utils/optionsValidator"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useOptions = defineStore("options", () => {
	const options = ref({
		selectedCrosshair: ""
	})

	async function loadOptions() {
		const rawOptions = await readFile("options.json").catch(() => null)
		if (!rawOptions) {
			return
		}

		console.log(rawOptions)

		options.value = validateOptions(JSON.parse(rawOptions))
	}

	async function save() {
		await writeFile("options.json", JSON.stringify(options.value))
	}

	async function useCrosshair(crosshair: Crosshair) {
		options.value.selectedCrosshair = crosshair.id
		await save()
	}

	return { options, loadOptions, save, useCrosshair }
})
