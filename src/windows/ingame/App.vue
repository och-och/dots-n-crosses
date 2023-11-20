<script setup lang="ts">
import { onMounted } from "vue"
import { useCrosshairs } from "@/stores/crosshairs"

const crosshairsStore = useCrosshairs()
const { loadCrosshairs } = crosshairsStore

onMounted(loadCrosshairs)
</script>

<template>
	<main>
		<h1>Hello!</h1>
	</main>
</template>
