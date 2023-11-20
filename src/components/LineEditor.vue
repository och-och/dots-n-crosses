<script setup lang="ts">
import NumberInput from "@/components/NumberInput.vue"
import ShapeEditor from "@/components/ShapeEditor.vue"
import BottomButton from "@/components/BottomButton.vue"
import MirrorInput from "@/components/MirrorInput.vue"

const emit = defineEmits<{
	(e: "update:model-value", line: Line): void
	(e: "delete"): void
}>()

const { modelValue } = defineProps<{
	modelValue: Line
}>()

function update(line: Line) {
	emit("update:model-value", line)
}
</script>

<template>
	<ShapeEditor has-bottom-button>
		<NumberInput
			title="Offset"
			:max="100"
			:model-value="modelValue.offset"
			@update:model-value="offset => update({ ...modelValue, offset })"
		/>
		<NumberInput
			title="Length"
			:max="100"
			:model-value="modelValue.length"
			@update:model-value="length => update({ ...modelValue, length })"
		/>
		<NumberInput
			title="Thickness"
			:max="100"
			:model-value="modelValue.thickness"
			@update:model-value="thickness => update({ ...modelValue, thickness })"
		/>
		<NumberInput
			title="Roundness"
			:max="100"
			:model-value="modelValue.roundness"
			@update:model-value="roundness => update({ ...modelValue, roundness })"
		/>
		<NumberInput
			title="Angle"
			:max="360"
			:model-value="modelValue.angle"
			@update:model-value="angle => update({ ...modelValue, angle })"
		/>
		<MirrorInput
			:x="modelValue.mirrorX"
			:y="modelValue.mirrorY"
			@update:x="x => update({ ...modelValue, mirrorX: x })"
			@update:y="y => update({ ...modelValue, mirrorY: y })"
		/>
		<BottomButton @click="$emit('delete')">✖</BottomButton>
	</ShapeEditor>
</template>
