<script setup lang="ts">
import { onMounted } from "vue"
import { useCrosshairs } from "@/stores/crosshairs"
import { useOptions } from "@/stores/options"

const crosshairsStore = useCrosshairs()
const { loadCrosshairs } = crosshairsStore

const optionsStore = useOptions()
const { load: loadOptions } = optionsStore

onMounted(() => {
	loadOptions()
	loadCrosshairs()
})
</script>

<template>
	<RouterView />
</template>
