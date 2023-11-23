<script setup lang="ts">
import { computed, ref, toRaw, watch } from "vue"
import DotShape from "@/components/DotShape.vue"
import DotEditor from "@/components/DotEditor.vue"
import LineShape from "@/components/LineShape.vue"
import CrosshairPreview from "@/components/CrosshairPreview.vue"
import StyleEditor from "@/components/StyleEditor.vue"
import { useRoute, useRouter } from "vue-router"
import { useCrosshairs } from "@/stores/crosshairs"
import { storeToRefs } from "pinia"
import { requireString } from "@/utils/validator"
import ShapeEditor from "@/components/ShapeEditor.vue"
import LineEditor from "@/components/LineEditor.vue"
import ColorInput from "@/components/ColorInput.vue"
import IconSave from "@/components/icons/IconSave.vue"
import IconNew from "@/components/icons/IconNew.vue"
import IconBack from "@/components/icons/IconBack.vue"
import IconShare from "@/components/icons/IconShare.vue"
import { defaultCrosshair, defaultDot, defaultLine } from "@/utils/defaults"
import { crosshairEdited } from "@/utils/messages"
import { deproxy } from "@/utils/deproxy"
import { serializeCrosshair } from "@/utils/serialize"

const router = useRouter()
const route = useRoute()
const editingId = requireString(route.params.id)

const crosshairsStore = useCrosshairs()
const { crosshairsIndexed } = storeToRefs(crosshairsStore)
const { updateCrosshair, addCrosshair } = crosshairsStore

const crosshair = ref<Crosshair>(
	editingId ? deproxy(crosshairsIndexed.value[editingId]) : defaultCrosshair(crypto.randomUUID())
)

const sameId = (id: string) => (thing: { id: string }) => id == thing.id

function addDot() {
	const dot = defaultDot()
	crosshair.value.dots.push(dot)
	selection.value = { type: "dot", id: dot.id }
}

function addLine() {
	const line = defaultLine()
	crosshair.value.lines.push(line)
	selection.value = { type: "line", id: line.id }
}

function deleteDot(id: string) {
	crosshair.value.dots.splice(crosshair.value.dots.findIndex(sameId(id)), 1)
}

function deleteLine(id: string) {
	crosshair.value.lines.splice(crosshair.value.lines.findIndex(sameId(id)), 1)
}

function updateDot(dot: Dot) {
	crosshair.value.dots.splice(crosshair.value.dots.findIndex(sameId(dot.id)), 1, dot)
}

function updateLine(line: Line) {
	crosshair.value.lines.splice(crosshair.value.lines.findIndex(sameId(line.id)), 1, line)
}

async function save() {
	if (editingId !== null) {
		await updateCrosshair(crosshair.value)
	} else {
		await addCrosshair(crosshair.value)
	}

	crosshairEdited.send({ crosshair: crosshair.value })

	router.back()
}

const exportText = ref("Export")
function copy() {
	overwolf.utils.placeOnClipboard(serializeCrosshair(crosshair.value))
	exportText.value = "Copied!"
}
watch(crosshair, () => {
	exportText.value = "Export"
})

type Selection =
	| { type: "line"; id: string }
	| { type: "dot"; id: string }
	| { type: "none"; id: string }

const none = { type: "none" as const, id: "none" }

const selection = ref<Selection>(none)
</script>

<template>
	<main>
		<form class="options" @submit.prevent="">
			<!-- Top bar -->

			<div class="topbar">
				<h1>Options</h1>
				<button type="button" class="topbar-button with-icon" @click="$router.back()">
					<IconBack :weight="4" />
					Back
				</button>
				<button type="button" class="topbar-button with-icon" @click="save">
					<IconSave :weight="4" />
					Save
				</button>
				<button type="button" class="topbar-button with-icon" @click="copy">
					<IconShare :weight="4" />
					{{ exportText }}
				</button>
			</div>

			<!-- Styles -->

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

			<!-- Dots -->

			<div class="section">
				<h2>Dots</h2>
				<div class="shape-list">
					<DotShape
						v-for="dot in crosshair.dots"
						:key="dot.id"
						:crosshair="crosshair"
						:dot="dot"
						:selected="selection.type == 'dot' && selection.id == dot.id"
						@select="selection = { type: 'dot', id: dot.id }"
						@delete="deleteDot(dot.id)"
					/>
					<button type="button" class="add-shape" @click="addDot">
						<IconNew :size="64" :weight="4" />
					</button>
				</div>
			</div>

			<!-- Lines -->

			<div class="section">
				<h2>Lines</h2>
				<div class="shape-list">
					<LineShape
						v-for="line in crosshair.lines"
						:key="line.id"
						:crosshair="crosshair"
						:line="line"
						:selected="selection.type == 'line' && selection.id == line.id"
						@select="selection = { type: 'line', id: line.id }"
						@delete="deleteLine(line.id)"
					/>
					<button type="button" class="add-shape" @click="addLine">
						<IconNew :size="64" :weight="4" />
					</button>
				</div>
			</div>
		</form>

		<!-- Preview -->

		<div class="right-panel">
			<h1>Preview</h1>
			<CrosshairPreview :crosshair="crosshair" />

			<!-- Properties -->

			<h1 v-if="selection.type != 'none'">Properties</h1>

			<LineEditor
				v-if="selection.type == 'line'"
				:line="crosshair.lines.find(sameId(selection.id))!"
				@update:line="line => updateLine(line)"
			/>
			<DotEditor
				v-if="selection.type == 'dot'"
				:dot="crosshair.dots.find(sameId(selection.id))!"
				@update:dot="dot => updateDot(dot)"
			/>
		</div>
	</main>
</template>

<style scoped>
main {
	display: flex;
	flex-wrap: wrap-reverse;
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
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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

.right-panel {
	position: sticky;
	top: -3rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.topbar {
	display: flex;
	gap: 1rem;
}

.topbar-button {
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
.topbar-button.with-icon {
	padding-left: 0.6rem;
}
</style>
