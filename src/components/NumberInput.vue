<script setup lang="ts">
import { computed, toRefs } from "vue"

const emit = defineEmits<{
	(e: "update:model-value", modelValue: number): void
}>()

const props = withDefaults(
	defineProps<{
		modelValue?: number
		title?: string
		min?: number
		max?: number
		step?: number
	}>(),
	{
		modelValue: 0,
		title: "Value",
		min: 0,
		max: 0,
		step: 1
	}
)

const { modelValue, step } = toRefs(props)

const fixed = computed(() =>
	modelValue.value.toFixed(Math.max(-Math.floor(Math.log10(step.value)), 0))
)
const rounded = computed(() => Number.parseFloat(fixed.value))

function update(event: Event) {
	const value = Number.parseFloat((event.target as HTMLInputElement).value)
	emit("update:model-value", value)
}
</script>

<template>
	<div class="number-input">
		<div class="title">
			<p>
				{{ title }}
			</p>
			<div class="number">
				<button
					class="number-button"
					type="button"
					tabindex="-1"
					@click="$emit('update:model-value', rounded - step)"
				>
					-
				</button>
				<input
					type="number"
					:min="min"
					:max="max"
					:step="step"
					:value="fixed"
					@input="update($event)"
				/>
				<button
					class="number-button"
					type="button"
					tabindex="-1"
					@click="$emit('update:model-value', rounded + step)"
				>
					+
				</button>
			</div>
		</div>
		<input type="range" :min="min" :max="max" :step="step" @input="update($event)" />
	</div>
</template>

<style scoped>
.number-input {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.title {
	display: flex;
	place-content: space-between;
	place-items: center;
}

.title p {
	color: var(--color-text-primary);
	font-weight: bold;
}

.number {
	display: flex;
	place-items: center;
	border: 0.3rem solid var(--color-primary);
	border-radius: var(--border-radius-small);
	--size: 1.5rem;
}
.number:focus-within {
	box-shadow: 0 0 1rem var(--color-primary);
	z-index: 1;
}

input[type="number"] {
	-moz-appearance: textfield;
	appearance: textfield;
	width: 3rem;
	height: var(--size);
	line-height: var(--size);
	padding: 2px 0;

	text-align: center;
	font-size: 1rem;
	background-color: transparent;
	border: none;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
input[type="number"]:focus {
	outline: none;
}

.number-button {
	display: flex;
	place-content: center;
	place-items: center;
	width: var(--size);
	height: var(--size);

	font-family: "Courier New", Courier, monospace;
	font-weight: bold;
	line-height: var(--size);
	color: var(--color-primary);

	background-color: transparent;
	border: none;
	border-radius: var(--border-radius-small);
}
.number-button:hover {
	scale: 1;
}
</style>
