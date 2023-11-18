<script setup lang="ts">
import { onMounted, ref } from "vue"
import CrosshairEditor from "@/components/CrosshairEditor.vue"
import DisplayCrosshair from "@/components/DisplayCrosshair.vue"
import { validateCrosshairs } from "@/utils/styles/crosshairValidator"

const crosshairs = ref<Crosshair[]>([])

onMounted(() => {
	const rawCrosshairs = localStorage.getItem("crosshairs")
	if (!rawCrosshairs) {
		return
	}

	crosshairs.value = validateCrosshairs(JSON.parse(rawCrosshairs))
})

function addCrosshair(crosshair: Crosshair) {
	crosshairs.value.push(crosshair)
	save()
}

function deleteCrosshair(index: number) {
	crosshairs.value.splice(index, 1)
	save()
}

function save() {
	localStorage.setItem("crosshairs", JSON.stringify(crosshairs.value))
}
</script>

<template>
	<main>
		<div class="crosshair-list">
			<button type="button" class="new-crosshair">
				➕
			</button>
			<div class="crosshair" v-for="(crosshair, index) in crosshairs" :key="index">
				<DisplayCrosshair :crosshair="crosshair" />
				<button type="button">✒️ Edit</button>
				<button type="button" @click="deleteCrosshair(index)">🗑️ Delete</button>
			</div>
		</div>
	</main>
	<CrosshairEditor />
</template>

<style scoped>
.crosshair-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, 300px);
	gap: 1em;
}

.new-crosshair {
	width: 300px;
	height: 300px;
	display: flex;
	place-content: center;
	place-items: center;
}
</style>
