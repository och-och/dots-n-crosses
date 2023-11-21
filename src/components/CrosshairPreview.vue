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
	width: 300px;
	height: 300px;
	border-radius: var(--border-radius-small);
}
</style>
