<script setup lang="ts">
import { ref, reactive } from "vue"
import NumberInput from "@/components/NumberInput.vue"
import LineEditor from "@/components/LineEditor.vue"

const defaultColor = ref("#8080ff")
const centerDotSize = ref(3)
const lines = reactive<Line[]>([])

function addLine() {
	lines.push({ angle: 0, length: 5, offset: 5, thickness: 1 })
}

function deleteLine(index: number) {
	lines.splice(index, 1)
}
</script>

<template>
	<main>
		<form class="options" @submit.prevent="">
			<h1>Options</h1>
			<h2>Color</h2>
			<label>
				<p>Color | {{ defaultColor }}</p>
				<input type="color" v-model="defaultColor" />
			</label>
			<h2>Center Dot</h2>
			<label>
				<p>Center dot size | {{ centerDotSize }}</p>
				<input type="range" min="0" max="150" step="0" v-model.number="centerDotSize" />
			</label>

			<h2>Lines</h2>
			<LineEditor
				v-for="(_, index) in lines"
				:key="index"
				v-model="lines[index]"
				@delete="deleteLine(index)"
			/>
			<button @click="addLine">+</button>
		</form>
		<div class="preview">
			<h1>Preview</h1>
			<div class="preview-render">
				<svg version="1.1" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(150, 150)">
						<!-- Center Dot -->
						<circle cx="0" cy="0" :r="centerDotSize" :fill="defaultColor" />
						<!-- Crosshair -->
						<line
							v-for="line in lines"
							:key="line.angle"
							:x1="line.offset"
							:x2="line.offset + line.length"
							y1="0"
							y2="0"
							:stroke="defaultColor"
							:stroke-width="line.thickness"
							:transform="`rotate(${line.angle - 90})`"
						/>
					</g>
				</svg>
			</div>
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

.preview-render {
	display: flex;
	place-content: center;
	place-items: center;
	background-color: antiquewhite;
}
</style>
