import { validateCrosshair } from "@/utils/crosshairValidator"
import { deleteFile, readDir, readFile, writeFile } from "@/utils/fs"
import { serializeCrosshair } from "@/utils/serialize"
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
			const id = fileName.match(/^crosshairs[/\\](?<id>.*)\.json$/)?.groups?.id
			if (!id) {
				console.log(`Encountered file with incorrect file name, skipping. (${fileName})`)
				continue
			}
			const rawCrosshair = await readFile(fileName).catch(() => "")
			try {
				const crosshair = validateCrosshair(JSON.parse(rawCrosshair), id)
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
			const crosshair = validateCrosshair(JSON.parse(rawCrosshair), id)
			return crosshair
		} catch {
			console.error(`Couldn't validate crosshair ${id}`)
			throw new Error(`Couldn't validate crosshair ${id}`)
		}
	}

	async function saveCrosshair(crosshair: Crosshair) {
		console.log("Saving crosshair", crosshair)
		await writeFile(`crosshairs/${crosshair.id}.json`, serializeCrosshair(crosshair))
	}

	async function addCrosshair(crosshair: Crosshair) {
		crosshairsIndexed.value[crosshair.id] = crosshair
		await saveCrosshair(crosshair)
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
