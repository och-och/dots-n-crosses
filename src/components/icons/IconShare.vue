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
			<circle
				cx="50"
				cy="22"
				r="5"
				fill="none"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				:stroke-width="weight"
			/>
			<circle
				cx="22"
				cy="38"
				r="5"
				fill="none"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				:stroke-width="weight"
			/>
			<circle
				cx="50"
				cy="50"
				r="5"
				fill="none"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				:stroke-width="weight"
			/>
			<line
				x1="27"
				x2="45"
				y1="40"
				y2="48"
				fill="none"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				:stroke-width="weight"
			/>
			<line
				x1="45"
				x2="27"
				y1="25"
				y2="35"
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
