<script setup lang="ts">
import NumberInput from "@/components/NumberInput.vue"
import ShapeEditor from "@/components/ShapeEditor.vue"
import BottomButton from "@/components/BottomButton.vue"
import MirrorInput from "@/components/MirrorInput.vue"

const emit = defineEmits<{
	(e: "update:model-value", dot: Dot): void
	(e: "delete"): void
}>()

const { modelValue } = defineProps<{
	modelValue: Dot
}>()

function update(dot: Dot) {
	emit("update:model-value", dot)
}
</script>

<template>
	<ShapeEditor has-bottom-button>
		<NumberInput
			title="X"
			:min="-150"
			:max="150"
			:model-value="modelValue.position.x"
			@update:model-value="
				x => update({ ...modelValue, position: { ...modelValue.position, x } })
			"
		/>
		<NumberInput
			title="Y"
			:min="-150"
			:max="150"
			:model-value="modelValue.position.y"
			@update:model-value="
				y => update({ ...modelValue, position: { ...modelValue.position, y } })
			"
		/>
		<NumberInput
			title="Size"
			:max="150"
			:model-value="modelValue.size"
			@update:model-value="size => update({ ...modelValue, size })"
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
