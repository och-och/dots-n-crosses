<script setup lang="ts">
import NumberInput from "@/components/NumberInput.vue"

const emit = defineEmits(["update:model-value", "delete"])
const { modelValue } = defineProps<{
	modelValue: Dot
}>()
</script>

<template>
	<div>
		<NumberInput title="X" :min="-150" :max="150" v-model="modelValue.position.x" />
		<NumberInput title="Y" :min="-150" :max="150" v-model="modelValue.position.y" />
		<NumberInput title="Size" :max="150" v-model="modelValue.size" />
		<p>
			Mirror
			<input type="checkbox" v-model="modelValue.mirrorX"> x
			<input type="checkbox" v-model="modelValue.mirrorY"> y
		</p>
		<br />
		<button type="button" @click="$emit('delete')">&Cross;</button>
	</div>
</template>
