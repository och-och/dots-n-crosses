/// <reference types="@overwolf/types" />

export {}

declare global {
	interface Options {
		selectedCrosshair: string
	}

	interface Crosshair {
		id: string
		dots: Dot[]
		lines: Line[]
		style: CustomProperties
	}

	interface Line {
		offset: number
		length: number
		thickness: number
		angle: number
		mirrorX: bool
		mirrorY: bool
		style: CustomProperties
	}

	interface Dot {
		position: { x: number; y: number }
		size: number
		mirrorX: bool
		mirrorY: bool
		style: CustomProperties
	}

	interface CustomProperties {
		color?: string
		outlineThickness?: number
		outlineColor?: string
	}
}
