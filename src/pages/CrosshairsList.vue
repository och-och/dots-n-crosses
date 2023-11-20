<script setup lang="ts">
import { useCrosshairs } from "@/stores/crosshairs"
import DisplayCrosshair from "@/components/DisplayCrosshair.vue"
import { storeToRefs } from "pinia"

const crosshairsStore = useCrosshairs()
const { crosshairs } = storeToRefs(crosshairsStore)
const { deleteCrosshair } = crosshairsStore
</script>

<template>
	<main>
		<div class="crosshair-list">
			<button type="button" class="new-crosshair" @click="$router.push('/new')">➕</button>
			<div v-if="crosshairs == 'loading'" class="loading">
				<div class="spinner">+</div>
				<p>Loading your crosshairs...</p>
			</div>
			<template v-else-if="(crosshairs instanceof Array)">
				<div class="crosshair" v-for="(crosshair, index) in crosshairs" :key="index">
					<DisplayCrosshair :crosshair="crosshair" />
					<button type="button" @click="$router.push(`edit/${index}`)">✒️ Edit</button>
					<button type="button" @click="deleteCrosshair(index)">🗑️ Delete</button>
				</div>
			</template>
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
