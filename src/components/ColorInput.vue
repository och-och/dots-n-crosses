<script setup lang="ts">
const emit = defineEmits(["update:model-value"])
withDefaults(
	defineProps<{
		modelValue?: string
		title?: string
	}>(),
	{
		modelValue: "#ffffff",
		title: "Color"
	}
)

function update(event: Event) {
	const value = (event.target as HTMLInputElement).value
	emit("update:model-value", value)
}

function updateFromText(event: Event) {
	const value = (event.target as HTMLInputElement).value
	emit("update:model-value", "#" + value)
}

function toText(value: string): string {
	if (value.charAt(0) == "#") value = value.substring(1)

	return value.toUpperCase()
}
</script>

<template>
	<div>
		<div class="title">
			<p>
				{{ title }}
			</p>
			<div class="text">
				#
				<input type="text" :value="toText(modelValue)" @input="updateFromText($event)" />
			</div>
		</div>
		<input type="color" :value="modelValue" @input="update($event)" />
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

.text {
	display: flex;
	place-items: center;
	padding-left: 5px;
	border: 0.3rem solid var(--color-primary);
	border-radius: var(--border-radius-small);
	--size: 1.5rem;
	line-height: var(--size);
}

.text:focus-within {
	box-shadow: 0 0 1rem var(--color-primary);
	z-index: 1;
}

.text input {
	-moz-appearance: textfield;
	appearance: textfield;
	width: 4rem;
	height: var(--size);
	line-height: var(--size);
	padding: 2px 0;

	text-align: center;
	background-color: transparent;
	border: none;
}

.text input {
	outline: none;
}
</style>
