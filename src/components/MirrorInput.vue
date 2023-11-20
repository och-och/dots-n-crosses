<script setup lang="ts">
defineEmits<{
	(e: "update:x", x: boolean): void
	(e: "update:y", y: boolean): void
}>()

defineProps<{
	x: boolean
	y: boolean
}>()
</script>

<template>
	<div class="mirror-input">
		<p>Mirror</p>
		<div class="buttons">
			<button
				type="button"
				class="button"
				:class="{ checked: x }"
				@click="$emit('update:x', !x)"
			>
				X
			</button>
			<button
				type="button"
				class="button"
				:class="{ checked: y }"
				@click="$emit('update:y', !y)"
			>
				Y
			</button>
		</div>
	</div>
</template>

<style scoped>
.mirror-input {
	display: flex;
	place-content: space-between;
	place-items: center;
}

.mirror-input p {
	color: var(--color-text-primary);
	font-weight: bold;
}

.buttons {
	display: flex;
	gap: 0.5rem;
}

.button {
	padding: 0rem 1rem;
	height: 2rem;
	font-size: 1rem;
	font-weight: bold;
	color: var(--color-primary);
	background-color: var(--color-background);
	border: 0.3rem solid var(--color-primary);
	border-radius: var(--border-radius-small);
}
.button.checked {
	color: var(--color-text-section);
	background-color: var(--color-primary);
}

.button:focus {
	outline: none;
	box-shadow: 0 0 1rem var(--color-primary);
	z-index: 1;
}
</style>
