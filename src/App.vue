<script setup lang="ts">
import { ref } from "vue"
import DotEditor from "@/components/DotEditor.vue"
import LineEditor from "@/components/LineEditor.vue"
import DisplayCrosshair from "@/components/DisplayCrosshair.vue"

const crosshair = ref<Crosshair>({
	dots: [],
	lines: [],
	style: {
		color: "#ff6ab5"
	}
})

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
</script>

<template>
	<main>
		<form class="options" @submit.prevent="">
			<h1>Options</h1>
			<div class="section">
				<h2>Style</h2>
				<div>
					<label>
						<p>
							Color
							<input type="text" v-model="crosshair.style.color" />
						</p>
					</label>
					<input type="color" v-model="crosshair.style.color" />
				</div>
			</div>

			<div class="section">
				<h2>Dots</h2>
				<DotEditor
					v-for="(_, index) in crosshair.dots"
					:key="index"
					v-model="crosshair.dots[index]"
					@delete="deleteDot(index)"
				/>
				<button type="button" @click="addDot">+</button>
			</div>

			<div class="section">
				<h2>Lines</h2>
				<LineEditor
					v-for="(_, index) in crosshair.lines"
					:key="index"
					v-model="crosshair.lines[index]"
					@delete="deleteLine(index)"
				/>
				<button type="button" @click="addLine">+</button>
			</div>
		</form>
		<div class="preview">
			<h1>Preview</h1>
			<DisplayCrosshair :crosshair="crosshair" />
		</div>
	</main>
</template>

<style scoped>
main {
	display: flex;
	place-content: center;
	place-items: start;
	gap: 2em;
}

.preview {
	position: sticky;
	top: 2em;
}
</style>
