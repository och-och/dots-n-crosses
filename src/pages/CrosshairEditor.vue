<script setup lang="ts">
import { ref, toRaw } from "vue"
import DotEditor from "@/components/DotEditor.vue"
import LineEditor from "@/components/LineEditor.vue"
import CrosshairPreview from "@/components/CrosshairPreview.vue"
import StyleEditor from "@/components/StyleEditor.vue"
import { useRoute, useRouter } from "vue-router"
import { useCrosshairs } from "@/stores/crosshairs"
import { storeToRefs } from "pinia"
import { requireString } from "@/utils/validator"
import ShapeEditor from "@/components/ShapeEditor.vue"
import ColorInput from "@/components/ColorInput.vue"
import IconSave from "@/components/icons/IconSave.vue"
import IconClose from "@/components/icons/IconClose.vue"
import IconNew from "@/components/icons/IconNew.vue"
import { defaultCrosshair, defaultDot, defaultLine } from "@/utils/defaults"

const router = useRouter()
const route = useRoute()
const editingId = requireString(route.params.id)

const crosshairsStore = useCrosshairs()
const { crosshairsIndexed } = storeToRefs(crosshairsStore)
const { updateCrosshair, addCrosshair } = crosshairsStore

const crosshair = ref<Crosshair>(
	editingId ? crosshairsIndexed.value[editingId] : defaultCrosshair(crypto.randomUUID())
)

function addDot() {
	crosshair.value.dots.push(defaultDot())
}

function addLine() {
	crosshair.value.lines.push(defaultLine())
}

function deleteDot(index: number) {
	crosshair.value.dots.splice(index, 1)
}

function deleteLine(index: number) {
	crosshair.value.lines.splice(index, 1)
}

async function save() {
	if (editingId !== null) {
		await updateCrosshair(crosshair.value)
	} else {
		await addCrosshair(crosshair.value)
	}
	overwolf.windows
		.getMainWindow()
		.postMessage({ type: "update-ingame-crosshair", payload: { id: editingId } })
	router.back()
}
</script>

<template>
	<main>
		<form class="options" @submit.prevent="">
			<h1>Options</h1>
			<div class="section">
				<h2>Style</h2>
				<div class="shape-list">
					<StyleEditor
						:model-value="crosshair.style"
						@update:model-value="style => (crosshair = { ...crosshair, style })"
					/>
					<ShapeEditor>
						<ColorInput
							title="Preview Background"
							v-model="crosshair.previewBackground"
						/>
					</ShapeEditor>
				</div>
			</div>

			<div class="section">
				<h2>Dots</h2>
				<div class="shape-list">
					<DotEditor
						v-for="(_, index) in crosshair.dots"
						:key="index"
						v-model="crosshair.dots[index]"
						@delete="deleteDot(index)"
					/>
					<button type="button" class="add-shape" @click="addDot">
						<IconNew :size="64" :weight="4"/>
					</button>
				</div>
			</div>

			<div class="section">
				<h2>Lines</h2>
				<div class="shape-list">
					<LineEditor
						v-for="(_, index) in crosshair.lines"
						:key="index"
						v-model="crosshair.lines[index]"
						@delete="deleteLine(index)"
					/>
					<button type="button" class="add-shape" @click="addLine">
						<IconNew :size="64" :weight="4"/>
					</button>
				</div>
			</div>
		</form>
		<div class="preview">
			<h1>Preview</h1>
			<CrosshairPreview :crosshair="crosshair" />
			<div class="preview-buttons">
				<button type="button" class="preview-button with-icon" @click="save">
					<IconSave :weight="4"/>
					Save
				</button>
				<button type="button" class="preview-button" @click="$router.back()">
					Cancel
				</button>
			</div>
			<pre>{{ toRaw(crosshair) }}</pre>
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

h1 {
	color: var(--color-primary);
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
	transition: font-size 0.2s;
}
.add-shape:hover {
	font-size: 6rem;
	scale: 1;
	transition: font-size 0.1s;
}
.add-shape:first-child {
	margin-bottom: 0;
}

.preview {
	position: sticky;
	top: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.preview-buttons {
	display: flex;
	gap: 1rem;
}

.preview-button {
	display: flex;
	place-content: center;
	place-items: center;
	padding: 0.3rem 1rem;
	font-size: 1.2rem;
	font-weight: bold;
	color: var(--color-text-section);
	background-color: var(--color-primary);
	border: none;
	border-radius: var(--border-radius-small);
}
.preview-button.with-icon {
	padding-left: 0.6rem;
}
</style>
