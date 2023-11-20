import { validateArray, validateBoolean, validateNumber, validateString } from "@/utils/validator"

export function validateCrosshairs(crosshairs: Crosshair[]): Crosshair[] {
	return validateArray(crosshairs, validateCrosshair)
}

export function validateCrosshair(crosshair: Crosshair): Crosshair {
	return {
		id: validateString(crosshair.id),
		dots: crosshair.dots.map(validateDot),
		lines: validateArray(crosshair.lines, validateLine),
		style: validateStyle(crosshair.style)
	}
}

function validateDot(dots: Dot): Dot {
	return {
		position: { x: validateNumber(dots.position.x), y: validateNumber(dots.position.y) },
		size: validateNumber(dots.size),
		mirrorX: validateBoolean(dots.mirrorX),
		mirrorY: validateBoolean(dots.mirrorY),
		style: validateStyle(dots.style)
	}
}

function validateLine(line: Line): Line {
	return {
		offset: validateNumber(line.offset),
		length: validateNumber(line.length),
		thickness: validateNumber(line.thickness),
		angle: validateNumber(line.angle),
		mirrorX: validateBoolean(line.mirrorX),
		mirrorY: validateBoolean(line.mirrorY),
		style: validateStyle(line.style)
	}
}

function validateStyle(style: CustomProperties): CustomProperties {
	const recreated: CustomProperties = {}
	if ("color" in style) recreated.color = validateString(style.color as string)
	if ("outlineColor" in style)
		recreated.outlineColor = validateString(style.outlineColor as string)
	if ("outlineThickness" in style)
		recreated.outlineThickness = validateNumber(style.outlineThickness as number)
	return recreated
}
