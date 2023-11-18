export { }

declare global {
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
		position: { x: number, y: number }
		size: number
		style: CustomProperties
	}

	interface CustomProperties {
		color?: string
		outlineThickness?: number
		outlineColor?: string
	}
}
