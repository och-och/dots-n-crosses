<script setup lang="ts">
import { toRefs } from "vue"
import { stylize } from "@/utils/stylize"

const props = defineProps<{
	line: Line
}>()

const { line } = toRefs(props)

function mirroredAngle(line: Line) {
	let angle = line.angle
	if (line.mirrorX) {
		angle = -angle
	}
	if (line.mirrorY) {
		angle = 180 - angle
	}
	return angle
}
</script>

<template>
	<rect
		:x="0 - line.thickness / 2"
		:y="0 - line.offset - line.length"
		:width="line.thickness"
		:height="line.length"
		:rx="line.roundness"
		:transform="`rotate(${line.angle})`"
		:style="stylize(line.style)"
	/>
	<rect
		v-if="line.mirrorX || line.mirrorY"
		:x="0 - line.thickness / 2"
		:y="0 - line.offset - line.length"
		:width="line.thickness"
		:height="line.length"
		:rx="line.roundness"
		:transform="`rotate(${mirroredAngle(line)})`"
		:style="stylize(line.style)"
	/>
</template>

<style scoped>
rect {
	fill: var(--color);
	stroke: var(--outline-color);
	stroke-width: var(--outline-thickness);
	stroke-linejoin: round;
}
</style>
@/utils/stylize
