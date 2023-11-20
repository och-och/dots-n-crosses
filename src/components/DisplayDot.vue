<script setup lang="ts">
import { stylize } from "@/utils/stylize"

defineProps<{
	dot: Dot
}>()
</script>

<template>
	<circle
		:cx="dot.position.x"
		:cy="dot.position.y"
		:r="dot.size / 2"
		:style="stylize(dot.style)"
	/>
	<circle
		v-if="dot.mirrorX || dot.mirrorY"
		:cx="dot.position.x * (dot.mirrorX ? -1 : 1)"
		:cy="dot.position.y * (dot.mirrorY ? -1 : 1)"
		:r="dot.size / 2"
		:style="stylize(dot.style)"
	/>
</template>

<style scoped>
circle {
	fill: var(--color);
	stroke: var(--outline-color);
	stroke-width: var(--outline-thickness);
	stroke-linejoin: round;
}
</style>
