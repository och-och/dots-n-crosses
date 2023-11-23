<script setup lang="ts">
import { useCrosshairs } from "@/stores/crosshairs"
import { useOptions } from "@/stores/options"
import { storeToRefs } from "pinia"
import { onMounted, ref } from "vue"
import DisplayCrosshair from "@/components/DisplayCrosshair.vue"
import { crosshairEdited, crosshairSelected, gameEventEmitted } from "@/utils/messages"

const optionsStore = useOptions()
const { options } = storeToRefs(optionsStore)
const { loadOptions } = optionsStore

const crosshairsStore = useCrosshairs()
const { loadCrosshair } = crosshairsStore

const fallbackCrosshair: Crosshair = {
	id: "fallback",
	dots: [],
	lines: [
		{
			id: "1",
			offset: 2,
			length: 10,
			thickness: 2,
			roundness: 0,
			mirrorX: true,
			mirrorY: true,
			angle: 0
		},
		{
			id: "2",
			offset: 2,
			length: 10,
			thickness: 2,
			roundness: 0,
			mirrorX: true,
			mirrorY: true,
			angle: 90
		}
	],
	style: {
		color: "#F00",
		outlineColor: "#000",
		outlineThickness: 0
	},
	previewBackground: "#fff"
}

const crosshair = ref<Crosshair | "pending" | "error">("pending")

function setCrosshairId(id: string) {
	loadCrosshair(id)
		.then(ch => (crosshair.value = ch))
		.catch(() => (crosshair.value = "error"))
}

onMounted(() => {
	loadOptions()
		.then(() => options.value.selectedCrosshair)
		.then(id => setCrosshairId(id))
})

crosshairSelected.listen(({ id }) => {
	console.log("Selected another crosshair")
	setCrosshairId(id)
})

crosshairEdited.listen(({ crosshair: newCrosshair }) => {
	console.log("Crosshair edited", newCrosshair)

	const id = typeof crosshair.value != "string" && crosshair.value.id
	if (newCrosshair.id != id) return

	crosshair.value = newCrosshair
})

const isDisplayed = ref(false)

gameEventEmitted.listen(({ events }) => {
	for (const event of events) {
		if (event.name == "match_start") isDisplayed.value = true
		if (event.name == "match_end") isDisplayed.value = false
	}
})

overwolf.games.events.getInfo(
	({ success, res }) => success && res.match_info.pseudo_match_id && (isDisplayed.value = true)
)
</script>

<template>
	<main v-if="isDisplayed">
		<div v-if="crosshair == 'pending'" class="message">
			<p>Loading crosshair...</p>
		</div>
		<div v-else-if="crosshair == 'error'" class="message">
			<DisplayCrosshair :crosshair="fallbackCrosshair" />
			<p>Error loading crosshair...</p>
		</div>
		<DisplayCrosshair v-else :crosshair="crosshair" />
	</main>
</template>

<style scoped>
.message {
	position: relative;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: center;
}
.message p {
	font-family:
		Gill Sans,
		Gill Sans MT,
		Calibri,
		Trebuchet MS,
		sans-serif;
	color: #fff;
	background-color: #0006;
	border-radius: var(--border-radius-small);
	font-weight: bold;
	padding: 0.2rem 1rem;
}
</style>
