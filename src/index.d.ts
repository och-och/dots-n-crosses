/// <reference types="@overwolf/types" />

export {}

declare global {
	interface Options {
		selectedCrosshair: string
		scale: number
	}

	interface Crosshair {
		id: string
		dots: Dot[]
		lines: Line[]
		style: CustomProperties
		previewBackground: string
	}

	interface Line {
		id: string
		offset: number
		length: number
		thickness: number
		roundness: number
		angle: number
		mirrorX: bool
		mirrorY: bool
		style?: CustomProperties
	}

	interface Dot {
		id: string
		position: { x: number; y: number }
		size: number
		mirrorX: bool
		mirrorY: bool
		style?: CustomProperties
	}

	interface CustomProperties {
		color: string
		outlineThickness: number
		outlineColor: string
	}
}
