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
				points="31,16 31,12 41,12 41,16"
			/>
			<path
				fill="none"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				:stroke-width="weight"
				d="M51,25v31c0,2.2091-1.7909,4-4,4H25c-2.2091,0-4-1.7909-4-4V25"
			/>
			<rect
				x="17"
				y="16"
				width="38"
				height="4"
				fill="none"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				:stroke-width="weight"
			/>
			<line
				x1="41"
				x2="41"
				y1="28.25"
				y2="55"
				fill="none"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				:stroke-width="weight"
			/>
			<line
				x1="31"
				x2="31"
				y1="28.25"
				y2="55"
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
