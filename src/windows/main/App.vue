<script setup lang="ts">
import { onMounted } from "vue"
import { useCrosshairs } from "@/stores/crosshairs"

const crosshairsStore = useCrosshairs()
const { load } = crosshairsStore

onMounted(load)
</script>

<template>
	<RouterView />
</template>
