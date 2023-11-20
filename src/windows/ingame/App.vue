<script setup lang="ts">
import { onMounted } from "vue"
import { useCrosshairs } from "@/stores/crosshairs"

const crosshairsStore = useCrosshairs()
const { load } = crosshairsStore

onMounted(load)
</script>

<template>
	<main>
		<h1>Hello!</h1>
	</main>
</template>
