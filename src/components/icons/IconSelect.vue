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
			<path
				fill="none"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				:stroke-width="weight"
				d="M52.0844,28.991C52.9959,31.1452,53.5,33.5137,53.5,36c0,9.9411-8.0589,18-18,18s-18-8.0589-18-18s8.0589-18,18-18 c3.2668,0,6.3303,0.8703,8.9714,2.3916"
			/>
			<polygon
				fill="none"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				:stroke-width="weight"
				points="54.5737,12.7708 35.5,40.3333 25.1667,30.3333 25.1667,35.25 35.875,45.75 54.5737,18.625"
			/>
		</g>
	</svg>
</template>
