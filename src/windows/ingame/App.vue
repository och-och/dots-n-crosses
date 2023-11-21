<script setup lang="ts">
import { useCrosshairs } from "@/stores/crosshairs"
import { useOptions } from "@/stores/options"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import DisplayCrosshair from "@/components/DisplayCrosshair.vue"

const optionsStore = useOptions()
const { options } = storeToRefs(optionsStore)
const { loadOptions } = optionsStore

const crosshairsStore = useCrosshairs()
const { crosshairsIndexed } = storeToRefs(crosshairsStore)
const { loadCrosshair } = crosshairsStore

const crosshair = computed<Crosshair | undefined>(
	() => crosshairsIndexed.value[options.value.selectedCrosshair]
)

overwolf.windows.getMainWindow().addEventListener("message", ({ data }) => {
	if (data.type == "update-ingame-crosshair-selection") {
		console.log("Refreshing selected crosshair")
		loadOptions()
	} else if (data.type == "update-ingame-crosshair") {
		console.log("Updating a crosshair")
		loadCrosshair(data.payload.id)
	}
})
</script>

<template>
	<main>
		<DisplayCrosshair v-if="crosshair" :crosshair="crosshair" />
		<div v-else>Loading crosshair...</div>
	</main>
</template>
