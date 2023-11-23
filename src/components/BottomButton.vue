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

	width: 4rem;
	height: 2rem;

	display: flex;
	place-content: center;
	place-items: center;

	font-weight: bold;
	color: var(--color-primary);
	background-color: var(--color-background);
	border: 0.3rem solid var(--color-primary);
	border-radius: var(--border-radius-small);
}
.bottom-button:hover {
	color: var(--color-text-section);
	background-color: var(--color-primary);
	border-color: var(--color-background);
	scale: 1;
}
.bottom-button:focus {
	outline: none;
	box-shadow: 0 0 1rem var(--color-primary);
	z-index: 1;
}
</style>
