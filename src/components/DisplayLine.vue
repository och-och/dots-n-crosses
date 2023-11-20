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
	angle -= 90
	if (line.mirrorY) {
		angle = -angle
	}
	return angle
}
</script>

<template>
	<line
		:x1="line.offset"
		:x2="line.offset + line.length"
		y1="0"
		y2="0"
		:stroke-width="line.thickness"
		:transform="`rotate(${line.angle - 90})`"
		:style="stylize(line.style)"
	/>
	<line
		v-if="line.mirrorX || line.mirrorY"
		:x1="line.offset"
		:x2="line.offset + line.length"
		y1="0"
		y2="0"
		:stroke-width="line.thickness"
		:transform="`rotate(${mirroredAngle(line)})`"
		:style="stylize(line.style)"
	/>
</template>

<style scoped>
line {
	stroke: var(--color);
	outline: var(--outline-thickness) solid var(--outline-color);
}
</style>
@/utils/stylize
