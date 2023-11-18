<script setup lang="ts">
import { onMounted } from "vue"
import { useCrosshairs } from "@/stores/crosshairs"
import CrosshairEditor from "@/components/CrosshairEditor.vue"
import DisplayCrosshair from "@/components/DisplayCrosshair.vue"
import { storeToRefs } from "pinia";

const crosshairsStore = useCrosshairs()
const { crosshairs } = storeToRefs(crosshairsStore)
const { load, deleteCrosshair } = crosshairsStore


onMounted(load)
</script>

<template>
	<main>
		<div class="crosshair-list">
			<button type="button" class="new-crosshair">
				➕
			</button>
			<div class="crosshair" v-for="(crosshair, index) in crosshairs" :key="index">
				<DisplayCrosshair :crosshair="crosshair" />
				<button type="button">✒️ Edit</button>
				<button type="button" @click="deleteCrosshair(index)">🗑️ Delete</button>
			</div>
		</div>
	</main>
	<CrosshairEditor />
</template>

<style scoped>
.crosshair-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, 300px);
	gap: 1em;
}

.new-crosshair {
	width: 300px;
	height: 300px;
	display: flex;
	place-content: center;
	place-items: center;
}
</style>
