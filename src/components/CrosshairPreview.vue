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
	background-color: antiquewhite;
	width: 300px;
	height: 300px;
}
</style>
