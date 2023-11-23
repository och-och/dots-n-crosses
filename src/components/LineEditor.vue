<script setup lang="ts">
import NumberInput from "@/components/NumberInput.vue"
import MirrorInput from "@/components/MirrorInput.vue"

const emit = defineEmits<{
	(e: 'update:line', line: Line): void
}>()

defineProps<{
	line: Line
}>()

function update(line: Line) {
	emit("update:line", line)
}
</script>

<template>
	<NumberInput
		title="Offset"
		:max="100"
		:model-value="line.offset"
		@update:model-value="offset => update({ ...line, offset })"
	/>
	<NumberInput
		title="Length"
		:max="100"
		:model-value="line.length"
		@update:model-value="length => update({ ...line, length })"
	/>
	<NumberInput
		title="Thickness"
		:max="100"
		:model-value="line.thickness"
		@update:model-value="thickness => update({ ...line, thickness })"
	/>
	<NumberInput
		title="Roundness"
		:max="100"
		:model-value="line.roundness"
		@update:model-value="roundness => update({ ...line, roundness })"
	/>
	<NumberInput
		title="Angle"
		:max="360"
		:model-value="line.angle"
		@update:model-value="angle => update({ ...line, angle })"
	/>
	<MirrorInput
		:x="line.mirrorX"
		:y="line.mirrorY"
		@update:x="x => update({ ...line, mirrorX: x })"
		@update:y="y => update({ ...line, mirrorY: y })"
	/>
</template>
