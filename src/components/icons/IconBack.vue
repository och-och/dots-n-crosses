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
			<polyline
				fill="none"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				:stroke-width="weight"
				points="46.1964,16.2048 26.8036,35.6651 46.1964,55.1254"
			/>
		</g>
	</svg>
</template>
