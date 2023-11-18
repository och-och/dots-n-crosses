<script setup lang="ts">
import NumberInput from "@/components/NumberInput.vue"

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
	<div>
		<NumberInput title="X" :min="-150" :max="150" :model-value="modelValue.position.x" @update:model-value="x => update({ ...modelValue, position: { ...modelValue.position, x } })" />
		<NumberInput title="Y" :min="-150" :max="150" :model-value="modelValue.position.y" @update:model-value="y => update({ ...modelValue, position: { ...modelValue.position, y } })"/>
		<NumberInput title="Size" :max="150" :model-value="modelValue.size" @update:model-value="size => update({ ...modelValue, size })" />
		<p>
			Mirror
			<input type="checkbox" :value="modelValue.mirrorX" @input="update({ ...modelValue, mirrorX: ($event.target as HTMLInputElement)?.checked })"> x
			<input type="checkbox" :value="modelValue.mirrorY" @input="update({ ...modelValue, mirrorY: ($event.target as HTMLInputElement)?.checked })"> y
		</p>
		<br />
		<button type="button" @click="$emit('delete')">&Cross;</button>
	</div>
</template>
