<script setup lang="ts">
const emit = defineEmits(["update:model-value"])
withDefaults(
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
		step: 0
	}
)

function update(event: Event) {
	const value = Number.parseInt((event.target as HTMLInputElement).value)
	emit("update:model-value", value)
}
</script>

<template>
	<div>
		<div class="title">
			<p>
				{{ title }}
			</p>
			<div class="number">
				<button
					class="number-button"
					type="button"
					tabindex="-1"
					@click="$emit('update:model-value', modelValue - 1)"
				>
					-
				</button>
				<input
					type="number"
					:min="min"
					:max="max"
					:step="step"
					:value="modelValue"
					@input="update($event)"
				/>
				<button
					class="number-button"
					type="button"
					tabindex="-1"
					@click="$emit('update:model-value', modelValue + 1)"
				>
					+
				</button>
			</div>
		</div>
		<input
			type="range"
			:min="min"
			:max="max"
			:step="step"
			:value="modelValue"
			@input="update($event)"
		/>
	</div>
</template>

<style scoped>
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
	line-height: var(--size);

	background-color: transparent;
	border: none;
	border-radius: var(--border-radius-small);
}
</style>
