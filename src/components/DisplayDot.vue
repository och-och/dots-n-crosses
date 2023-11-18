<script setup lang="ts">
import { stylize } from '@/utils/styles/stylize';

defineProps<{
	dot: Dot
}>()
</script>

<template>
	<circle
		:cx="dot.position.x"
		:cy="dot.position.y"
		:r="dot.size"
		:style="stylize(dot.style)"
	/>
</template>

<style scoped>
circle {
	fill: var(--color);
}
</style>
