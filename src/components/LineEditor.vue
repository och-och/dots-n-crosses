<script setup lang="ts">
import NumberInput from "@/components/NumberInput.vue"

const emit = defineEmits(["update:model-value", "delete"])
const { modelValue } = defineProps<{
	modelValue: Line
}>()

// function update() {
// 	emit("update:model-value", modelValue)
// }
</script>

<template>
	<div>
		<NumberInput title="Offset" :max="100" v-model="modelValue.offset"/>
		<NumberInput title="Length" :max="100" v-model="modelValue.length"/>
		<NumberInput title="Thickness" :max="100" v-model="modelValue.thickness"/>
		<NumberInput title="Angle" :max="360" v-model="modelValue.angle"/>
		<br />
		<button @click="$emit('delete')">&Cross;</button>
	</div>
</template>
