<script setup lang="ts">
withDefaults(
	defineProps<{
		size: number
		weight: number
	}>(),
	{
		size: 24,
		weight: 2
	}
)
</script>

<template>
	<svg class="emoji" viewBox="0 0 72 72" :height="size" xmlns="http://www.w3.org/2000/svg">
		<g id="line">
			<line
				x1="17.5"
				x2="54.5"
				y1="17.5"
				y2="54.5"
				fill="none"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				:stroke-width="weight"
			/>
			<line
				x1="54.5"
				x2="17.5"
				y1="17.5"
				y2="54.5"
				fill="none"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				:stroke-width="weight"
			/>
		</g>
	</svg>
</template>
