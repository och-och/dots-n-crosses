<script setup lang="ts">
import { useCrosshairs } from "@/stores/crosshairs"
import { useOptions } from "@/stores/options"
import CrosshairPreview from "@/components/CrosshairPreview.vue"
import { storeToRefs } from "pinia"

const crosshairsStore = useCrosshairs()
const { crosshairs } = storeToRefs(crosshairsStore)
const { deleteCrosshair } = crosshairsStore

const optionsStore = useOptions()
const { options } = storeToRefs(optionsStore)
const { useCrosshair } = optionsStore

async function selectCrosshair(crosshair: Crosshair) {
	await useCrosshair(crosshair)
	overwolf.windows.getMainWindow().postMessage({ type: "update-ingame-crosshair-selection" })
}
</script>

<template>
	<main>
		<div class="crosshair-list">
			<button type="button" class="new-crosshair" @click="$router.push('/new')">+</button>
			<div
				class="crosshair"
				:class="{ selected: crosshair.id == options.selectedCrosshair }"
				v-for="crosshair in crosshairs"
				:key="crosshair.id"
			>
				<CrosshairPreview :crosshair="crosshair" />
				<div class="buttons">
					<button
						v-if="crosshair.id != options.selectedCrosshair"
						type="button"
						@click="selectCrosshair(crosshair)"
					>
						Use
					</button>
					<button type="button" @click="$router.push(`edit/${crosshair.id}`)">
						Edit
					</button>
					<button type="button" @click="deleteCrosshair(crosshair)">Delete</button>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped>
.crosshair-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, 300px);
	gap: 1rem;
	place-content: center;
}

.new-crosshair {
	width: 300px;
	height: 300px;
	display: flex;
	place-content: center;
	place-items: center;

	font-size: 2rem;
	color: var(--color-primary);
	background: var(--color-background);
	border: 0.3rem solid var(--color-primary);
	border-radius: var(--border-radius-small);
	transition:
		0.2s border-width,
		0.2s border-radius,
		0.2s font-size;
}
.new-crosshair:hover {
	scale: 1;
	font-size: 6rem;
	border-width: 1rem;
	border-radius: var(--border-radius-big);
	transition:
		0.1s border-width,
		0.1s border-radius,
		0.1s font-size;
}

.crosshair {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding-bottom: 0.5rem;
}
.crosshair.selected {
	background-color: var(--color-primary);
	border-radius: var(--border-radius-small);
}

.crosshair .buttons {
	display: flex;
	gap: 0.5rem;
	place-content: center;
}

.crosshair .buttons button {
	padding: 0.3rem 1rem;
	font-size: 1.2rem;
	font-weight: bold;
	color: var(--color-text-section);
	background-color: var(--color-primary);
	border: none;
	border-radius: var(--border-radius-small);
}
.crosshair.selected .buttons button {
	color: var(--color-primary);
	background-color: var(--color-text-section);
}
</style>
