<script setup lang="ts">
withDefaults(defineProps<{
	hasBottomButton: boolean
}>(), {
	hasBottomButton: false
})
</script>

<template>
	<div class="shape-editor" :class="{ 'has-bottom-button': hasBottomButton }">
		<slot></slot>
	</div>
</template>

<style scoped>
.shape-editor {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 1em;
	padding: 1em;
	background-color: var(--color-background);
	border-radius: var(--border-radius-small);
}
.shape-editor.has-bottom-button {
	padding-bottom: 2em;
	margin-bottom: .5em;
}
</style>
