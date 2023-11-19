<template>
	<button class="bottom-button" type="button">
		<slot />
	</button>
</template>

<style scoped>
.bottom-button {
	position: absolute;
	bottom: 0;
	left: 50%;
	translate: -50% 50%;

	width: 4em;
	height: 2em;

	border: 2px solid var(--color-background);
	border-radius: var(--border-radius-small);
}
</style>
