<script setup lang="ts">
import DisplayDot from "@/components/DisplayDot.vue"
import DisplayLine from "@/components/DisplayLine.vue"
import { stylize } from "@/utils/stylize"

defineProps<{
	crosshair: Crosshair
}>()
</script>

<template>
	<svg version="1.1" viewBox="-150 -150 300 300" xmlns="http://www.w3.org/2000/svg">
		<g :style="stylize(crosshair.style)">
			<DisplayDot v-for="(dot, index) in crosshair.dots" :key="index" :dot="dot" />
			<DisplayLine v-for="(line, index) in crosshair.lines" :key="index" :line="line" />
		</g>
	</svg>
</template>

<style scoped>
svg {
	width: 300px;
}
svg g {
	transform: translate(0.5px, 0.5px);
}
</style>
