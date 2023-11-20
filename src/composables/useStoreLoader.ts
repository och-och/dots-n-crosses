import { useCrosshairs } from "@/stores/crosshairs"
import { useOptions } from "@/stores/options"

export function useStoreLoader() {
	const crosshairsStore = useCrosshairs()
	const { loadCrosshairs } = crosshairsStore

	const optionsStore = useOptions()
	const { loadOptions } = optionsStore

	loadOptions()
	loadCrosshairs()
}
