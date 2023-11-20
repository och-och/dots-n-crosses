<script setup lang="ts">
import NumberInput from "@/components/NumberInput.vue"
import ShapeEditor from "@/components/ShapeEditor.vue"
import ColorInput from "./ColorInput.vue"

const emit = defineEmits<{
	(e: "update:model-value", style: CustomProperties): void
}>()

const { modelValue } = defineProps<{
	modelValue: CustomProperties
}>()

function update(style: CustomProperties) {
	emit("update:model-value", style)
}
</script>

<template>
	<ShapeEditor>
		<ColorInput
			:model-value="modelValue.color"
			@update:model-value="color => update({ ...modelValue, color })"
		/>
		<NumberInput
			title="Outline Width"
			:min="0"
			:max="10"
			:model-value="modelValue.outlineThickness"
			@update:model-value="outlineThickness => update({ ...modelValue, outlineThickness })"
		/>
		<ColorInput
			title="Outline Color"
			:model-value="modelValue.outlineColor"
			@update:model-value="outlineColor => update({ ...modelValue, outlineColor })"
		/>
	</ShapeEditor>
</template>
