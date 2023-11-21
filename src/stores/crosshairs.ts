import { validateCrosshair } from "@/utils/crosshairValidator"
import { deleteFile, readDir, readFile, writeFile } from "@/utils/fs"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCrosshairs = defineStore("crosshairs", () => {
	const crosshairsIndexed = ref<Record<string, Crosshair>>({})
	const crosshairs = computed(() => Object.values(crosshairsIndexed.value))

	async function loadCrosshairs() {
		console.log("Loading crosshairs")
		const { files } = await readDir("crosshairs").catch(() => ({ files: [] as string[] }))
		console.groupCollapsed("crosshairs")
		for (const fileName of files) {
			const rawCrosshair = await readFile(fileName).catch(() => "")
			try {
				const crosshair = validateCrosshair(JSON.parse(rawCrosshair))
				crosshairsIndexed.value[crosshair.id] = crosshair
				console.log(crosshair)
			} catch {
				console.error(fileName)
			}
		}
		console.groupEnd()
	}

	async function loadCrosshair(id: string): Promise<Crosshair> {
		console.log(`Loading crosshair ${id}`)
		const rawCrosshair = await readFile(`crosshairs/${id}.json`).catch(() => "")
		try {
			const crosshair = validateCrosshair(JSON.parse(rawCrosshair))
			return crosshair
		} catch {
			console.error(`Couldn't validate crosshair ${id}`)
			throw new Error(`Couldn't validate crosshair ${id}`)
		}
	}

	function saveCrosshair(crosshair: Crosshair) {
		console.log("Saving crosshair", crosshair)
		writeFile(`crosshairs/${crosshair.id}.json`, JSON.stringify(crosshair))
	}

	function addCrosshair(crosshair: Crosshair) {
		crosshairsIndexed.value[crosshair.id] = crosshair
		saveCrosshair(crosshair)
	}

	function updateCrosshair(crosshair: Crosshair) {
		crosshairsIndexed.value[crosshair.id] = crosshair
		saveCrosshair(crosshair)
	}

	function deleteCrosshair(crosshair: Crosshair) {
		if (crosshair.id in crosshairsIndexed.value) {
			delete crosshairsIndexed.value[crosshair.id]
		}
		deleteFile(`crosshairs/${crosshair.id}.json`)
	}

	return {
		crosshairsIndexed,
		crosshairs,
		loadCrosshairs,
		loadCrosshair,
		saveCrosshair,
		updateCrosshair,
		addCrosshair,
		deleteCrosshair
	}
})
