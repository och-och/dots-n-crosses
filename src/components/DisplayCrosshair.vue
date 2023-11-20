<script setup lang="ts">
import DisplayDot from "@/components/DisplayDot.vue"
import DisplayLine from "@/components/DisplayLine.vue"
import { stylize } from "@/utils/stylize"

defineProps<{
	crosshair: Crosshair
}>()
</script>

<template>
	<div class="display-crosshair">
		<svg version="1.1" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
			<g :style="stylize(crosshair.style)" transform="translate(150, 150)">
				<!-- Center Dot -->
				<DisplayDot v-for="(dot, index) in crosshair.dots" :key="index" :dot="dot" />
				<!-- Crosshair -->
				<DisplayLine v-for="(line, index) in crosshair.lines" :key="index" :line="line" />
			</g>
		</svg>
	</div>
</template>

<style scoped>
.display-crosshair {
	background-color: antiquewhite;
	width: 300px;
	height: 300px;
}
</style>
@/utils/stylize
