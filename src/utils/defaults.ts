export const defaultCrosshair = (id: string): Crosshair => ({
	id,
	dots: [],
	lines: [],
	style: defaultStyle(),
	previewBackground: "#f5f1ec"
})

export const defaultDot = (): Dot => ({
	id: crypto.randomUUID(),
	position: { x: 0, y: 0 },
	size: 3,
	mirrorX: false,
	mirrorY: false,
	style: undefined
})

export const defaultLine = (): Line => ({
	id: crypto.randomUUID(),
	angle: 0,
	length: 5,
	offset: 5,
	thickness: 1,
	roundness: 0,
	mirrorX: false,
	mirrorY: false,
	style: undefined
})

export const defaultStyle = (): CustomProperties => ({
	color: "#ff6ab5",
	outlineColor: "#000000",
	outlineThickness: 0
})
