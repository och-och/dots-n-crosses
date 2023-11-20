<script setup lang="ts">
import DisplayCrosshair from "@/components/DisplayCrosshair.vue"

defineProps<{
	crosshair: Crosshair
}>()
</script>

<template>
	<div class="display-crosshair">
		<DisplayCrosshair :crosshair="crosshair" />
	</div>
</template>

<style scoped>
.display-crosshair {
	background-color: rgb(245, 241, 236);
	width: 300px;
	height: 300px;
	border-radius: var(--border-radius-small);
}
</style>
