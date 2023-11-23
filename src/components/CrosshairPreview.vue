<script setup lang="ts">
import DisplayCrosshair from "@/components/DisplayCrosshair.vue"

defineProps<{
	crosshair: Crosshair
}>()
</script>

<template>
	<div
		class="display-crosshair"
		:style="`--color-preview-background: ${crosshair.previewBackground}`"
	>
		<DisplayCrosshair :crosshair="crosshair" />
	</div>
</template>

<style scoped>
.display-crosshair {
	background-color: var(--color-preview-background);
	max-width: 300px;
	width: 100%;
	aspect-ratio: 1;
	margin: 0 auto;
	border-radius: var(--border-radius-small);
}
.display-crosshair :deep(svg) {
	width: 100%;
	aspect-ratio: 1;
}
</style>
