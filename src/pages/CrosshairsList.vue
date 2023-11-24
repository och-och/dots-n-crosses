<script setup lang="ts">
import { useCrosshairs } from "@/stores/crosshairs"
import { useOptions } from "@/stores/options"
import CrosshairPreview from "@/components/CrosshairPreview.vue"
import { storeToRefs } from "pinia"
import IconNew from "@/components/icons/IconNew.vue"
import IconSelect from "@/components/icons/IconSelect.vue"
import IconEdit from "@/components/icons/IconEdit.vue"
import IconDelete from "@/components/icons/IconDelete.vue"
import { crosshairSelected, scaleEdited } from "@/utils/messages"
import { validateCrosshair } from "@/utils/crosshairValidator"
import { promisify } from "@/utils/promisify"
import { tryExpression } from "@/utils/tryExpression"
import ShapeEditor from "@/components/ShapeEditor.vue"
import NumberInput from "@/components/NumberInput.vue"
import { ref } from "vue"

const crosshairsStore = useCrosshairs()
const { crosshairs } = storeToRefs(crosshairsStore)
const { deleteCrosshair, loadCrosshairs, addCrosshair } = crosshairsStore

const optionsStore = useOptions()
const { options } = storeToRefs(optionsStore)
const { useCrosshair, save: saveOptions } = optionsStore

async function selectCrosshair(crosshair: Crosshair) {
	useCrosshair(crosshair)
	crosshairSelected.send({ id: crosshair.id })
}

function refresh() {
	loadCrosshairs()
}

async function pasteCrosshair() {
	const clipboardData = (await promisify(overwolf.utils.getFromClipboard)) || null
	if (!clipboardData) {
		alert("Copy a crosshair first!")
		return
	}

	const crosshair = tryExpression<Crosshair | void>(
		() => validateCrosshair(JSON.parse(clipboardData), crypto.randomUUID()),
		() => alert("Failed to parse the crosshair 😔 Make sure you copied the right thing.")
	)
	if (!crosshair) {
		return
	}

	tryExpression<void>(
		() => addCrosshair(crosshair),
		() => alert("Failed to save the crosshair 😔")
	)
}

async function setScale(scale: number) {
	console.log("setting scale", scale)
	options.value.scale = scale
	await saveOptions()
	scaleEdited.send({ scale })
}
</script>

<template>
	<main>
		<h1>Crosshair Library</h1>
		<div class="crosshair-list">
			<div class="crosshair">
				<button type="button" class="new-crosshair" @click="$router.push('/new')">
					<IconNew :size="64" :weight="4" />
				</button>
				<div class="buttons">
					<button type="button" @click="refresh">
						<!-- <IconSelect :weight="4" /> -->
						Refresh
					</button>
					<button type="button" @click="pasteCrosshair">
						<!-- <IconSelect :weight="4" /> -->
						Import
					</button>
				</div>
			</div>
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
						<IconSelect :weight="4" />
						<!-- Use -->
					</button>
					<button type="button" @click="$router.push(`edit/${crosshair.id}`)">
						<IconEdit :weight="4" />
						<!-- Edit -->
					</button>
					<button type="button" @click="deleteCrosshair(crosshair)">
						<IconDelete :weight="4" />
						<!-- Delete -->
					</button>
				</div>
			</div>
		</div>
		<div class="crosshair-list">
			<div class="options">
				<ShapeEditor>
					<NumberInput
						title="Scale"
						:min="0.1"
						:max="10"
						:step="0.1"
						:model-value="options.scale"
						@update:model-value="setScale"
					/>
				</ShapeEditor>
			</div>
		</div>
	</main>
</template>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

h1 {
	color: var(--color-primary);
	text-align: center;
}

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

	border-radius: var(--border-radius-small);
	border-top-left-radius: var(--border-radius-big);
	border-top-right-radius: var(--border-radius-big);
}
.crosshair.selected {
	background-color: var(--color-primary);
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
