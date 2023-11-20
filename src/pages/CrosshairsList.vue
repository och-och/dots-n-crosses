<script setup lang="ts">
import { useCrosshairs } from "@/stores/crosshairs"
import { useOptions } from "@/stores/options"
import DisplayCrosshair from "@/components/DisplayCrosshair.vue"
import { storeToRefs } from "pinia"

const crosshairsStore = useCrosshairs()
const { crosshairs } = storeToRefs(crosshairsStore)
const { deleteCrosshair } = crosshairsStore

const optionsStore = useOptions()
const { options } = storeToRefs(optionsStore)
const { useCrosshair } = optionsStore
</script>

<template>
	<main>
		<div class="crosshair-list">
			<button type="button" class="new-crosshair" @click="$router.push('/new')">➕</button>
			<div class="crosshair" v-for="crosshair in crosshairs" :key="crosshair.id">
				<DisplayCrosshair :crosshair="crosshair" />
				<span v-if="crosshair.id == options.selectedCrosshair">✅</span>
				<button v-else type="button" @click="useCrosshair(crosshair)">☑️ Use</button>
				<button type="button" @click="$router.push(`edit/${crosshair.id}`)">✒️ Edit</button>
				<button type="button" @click="deleteCrosshair(crosshair)">🗑️ Delete</button>
			</div>
		</div>
	</main>
</template>

<style scoped>
.crosshair-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, 300px);
	gap: 1rem;
}

.new-crosshair {
	width: 300px;
	height: 300px;
	display: flex;
	place-content: center;
	place-items: center;
}

.loading {
	display: flex;
	flex-direction: column;
	place-content: center;
	place-items: center;
}
</style>
