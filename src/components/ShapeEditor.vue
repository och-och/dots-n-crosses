<script setup lang="ts">
withDefaults(
	defineProps<{
		hasBottomButton: boolean
		selected: boolean
	}>(),
	{
		hasBottomButton: false,
		selected: false
	}
)
</script>

<template>
	<div class="shape-editor" :class="{ 'has-bottom-button': hasBottomButton, 'selected': selected }">
		<slot></slot>
	</div>
</template>

<style scoped>
.shape-editor {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 1rem;
	color: var(--color-text);
	background-color: var(--color-background);
	border-radius: var(--border-radius-small);
	box-shadow: 0 0 0 0 var(--color-background-transparent);
}
.shape-editor.has-bottom-button {
	padding-bottom: 2rem;
	margin-bottom: 0.5rem;
}

.shape-editor.selected {
	background-color: var(--color-primary);
	box-shadow: 0 .5rem 1.5rem -1rem var(--color-shadow);
	background-image: linear-gradient(to bottom, var(--color-highlight), var(--color-primary));
}
</style>
