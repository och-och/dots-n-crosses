<script setup lang="ts">
import { useStoreLoader } from "@/composables/useStoreLoader"
import { useCrosshairs } from "@/stores/crosshairs"
import { useOptions } from "@/stores/options"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import DisplayCrosshair from "@/components/DisplayCrosshair.vue"

useStoreLoader()

const optionsStore = useOptions()
const { options } = storeToRefs(optionsStore)
const { loadOptions } = optionsStore

const crosshairsStore = useCrosshairs()
const { crosshairsIndexed } = storeToRefs(crosshairsStore)

const crosshair = computed(() => crosshairsIndexed.value[options.value.selectedCrosshair])

overwolf.windows.getMainWindow().addEventListener("message", ({ data }) => {
	if (data == "refresh-ingame-crosshair") {
		console.log("Refreshing")
		loadOptions()
	}
})
</script>

<template>
	<main>
		<DisplayCrosshair :crosshair="crosshair" />
	</main>
</template>
