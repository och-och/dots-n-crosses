<script setup lang="ts">
import { ref, reactive } from "vue"
import NumberInput from "@/components/NumberInput.vue"
import LineEditor from "@/components/LineEditor.vue"
import DisplayLine from "./components/DisplayLine.vue"
import DisplayDot from "./components/DisplayDot.vue"
import { stylize } from "./utils/styles/stylize";

const style = ref<CustomProperties>({color: "#ff6ab5"})
const centerDot = ref<Dot>({ position: { x: 0, y: 0}, size: 3, style: {} })
const lines = reactive<Line[]>([])

function addLine() {
	lines.push({
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
	lines.splice(index, 1)
}
</script>

<template>
	<main>
		<form class="options" @submit.prevent="">
			<h1>Options</h1>
			<div>
				<h2>Color</h2>
				<div>
					<label>
						<p>
							Color
							<input type="text" v-model="style.color" />
						</p>
					</label>
					<input type="color" v-model="style.color" />
				</div>
			</div>

			<div>
				<h2>Center Dot</h2>
				<NumberInput title="Size" :max="150" v-model="centerDot.size" />
			</div>

			<div>
				<h2>Lines</h2>
				<LineEditor
					v-for="(_, index) in lines"
					:key="index"
					v-model="lines[index]"
					@delete="deleteLine(index)"
				/>
				<button @click="addLine">+</button>
			</div>
		</form>
		<div class="preview">
			<h1>Preview</h1>
			<div class="preview-render">
				<svg version="1.1" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
					<g
						:style="stylize(style)"
						transform="translate(150, 150)"
					>
						<!-- Center Dot -->
						<DisplayDot :dot="centerDot" />
						<!-- Crosshair -->
						<DisplayLine v-for="line in lines" :key="line.angle" :line="line" />
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
