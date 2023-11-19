<script setup lang="ts">
import { ref, toRaw } from "vue"
import DotEditor from "@/components/DotEditor.vue"
import LineEditor from "@/components/LineEditor.vue"
import DisplayCrosshair from "@/components/DisplayCrosshair.vue"
import ShapeEditor from "@/components/ShapeEditor.vue"
import ColorInput from "@/components/ColorInput.vue"
import { useRoute, useRouter } from "vue-router"
import { useCrosshairs } from "@/stores/crosshairs"
import { storeToRefs } from "pinia"

defineEmits<{
	(e: "save", crosshair: Crosshair): void
}>()

const router = useRouter()
const route = useRoute()
const editingIndex = (() => {
	if (route.name != "edit") return null
	const number = Number.parseInt(String(route.params.index))
	if (isNaN(number)) return null
	return number
})()

const crosshairsStore = useCrosshairs()
const { crosshairs } = storeToRefs(crosshairsStore)
const { deleteCrosshair, addCrosshair } = crosshairsStore

const crosshair = ref<Crosshair>(
	(() => {
		if (editingIndex !== null) {
			return structuredClone(toRaw(crosshairs.value[editingIndex]))
		}

		return {
			dots: [],
			lines: [],
			style: {
				color: "#ff6ab5"
			}
		}
	})()
)

function addLine() {
	crosshair.value.lines.push({
		angle: 0,
		length: 5,
		offset: 5,
		thickness: 1,
		mirrorX: false,
		mirrorY: false,
		style: {}
	})
}

function deleteLine(index: number) {
	crosshair.value.lines.splice(index, 1)
}

function addDot() {
	crosshair.value.dots.push({
		position: { x: 0, y: 0 },
		size: 3,
		mirrorX: false,
		mirrorY: false,
		style: {}
	})
}

function deleteDot(index: number) {
	crosshair.value.dots.splice(index, 1)
}

function save() {
	if (editingIndex !== null) {
		deleteCrosshair(editingIndex)
	}
	addCrosshair(crosshair.value)
	router.back()
}
</script>

<template>
	<main>
		<form class="options" @submit.prevent="">
			<h1>Options</h1>
			<div class="section">
				<h2><span>Style</span><span>🎨</span></h2>
				<ShapeEditor>
					<ColorInput
						:model-value="crosshair.style.color"
						@update:model-value="
							color =>
								(crosshair = { ...crosshair, style: { ...crosshair.style, color } })
						"
					/>
				</ShapeEditor>
			</div>

			<div class="section">
				<h2><span>Dots</span><span>&middot;&middot;&middot;</span></h2>
				<div class="shape-list">
					<DotEditor
						v-for="(_, index) in crosshair.dots"
						:key="index"
						v-model="crosshair.dots[index]"
						@delete="deleteDot(index)"
					/>
					<button type="button" class="add-shape" @click="addDot">+</button>
				</div>
			</div>

			<div class="section">
				<h2><span>Lines</span><span>///</span></h2>
				<div class="shape-list">
					<LineEditor
						v-for="(_, index) in crosshair.lines"
						:key="index"
						v-model="crosshair.lines[index]"
						@delete="deleteLine(index)"
					/>
					<button type="button" class="add-shape" @click="addLine">+</button>
				</div>
			</div>
		</form>
		<div class="preview">
			<h1>Preview</h1>
			<DisplayCrosshair :crosshair="crosshair" />
			<button type="button" @click="save">💾 Save</button>
		</div>
	</main>
</template>

<style scoped>
main {
	display: flex;
	place-content: center;
	place-items: start;
	gap: 2rem;
}

.options {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.section {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
	color: var(--color-text-section);
	background-color: var(--color-background-section);
	border-radius: var(--border-radius-small);
}

h2 {
	display: flex;
	place-content: space-between;
}

.shape-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, auto));
	gap: 1rem;
}

.add-shape {
	display: flex;
	place-content: center;
	place-items: center;
	min-height: 250px;
	margin-bottom: 0.5rem;
	font-size: 2rem;
	color: var(--color-primary);
	background: var(--color-background);
	border: none;
	border-radius: var(--border-radius-small);
}
.add-shape:first-child {
	margin-bottom: 0;
}

.preview {
	position: sticky;
	top: 2rem;
}
</style>
