import { requireString, validateArray, validateBoolean, validateNumber, validateString } from "@/utils/validator"

export function validateCrosshairs(crosshairs: Crosshair[]): Crosshair[] {
	return validateArray(crosshairs, validateCrosshair)
}

export function validateCrosshair(crosshair: Crosshair): Crosshair {
	return {
		id: crosshair.id || (()=>{throw new Error("Validation error, crosshair has no id :(")})(),
		dots: crosshair.dots.map(validateDot),
		lines: validateArray(crosshair.lines, validateLine),
		style: validateStyle(crosshair.style)
	}
}

function validateDot(dots: Dot): Dot {
	return {
		position: { x: validateNumber(dots.position.x, 0), y: validateNumber(dots.position.y, 0) },
		size: validateNumber(dots.size, 1),
		mirrorX: validateBoolean(dots.mirrorX, false),
		mirrorY: validateBoolean(dots.mirrorY, false),
		style: validateStyle(dots.style)
	}
}

function validateLine(line: Line): Line {
	return {
		offset: validateNumber(line.offset, 0),
		length: validateNumber(line.length, 5),
		thickness: validateNumber(line.thickness, 1),
		roundness: validateNumber(line.roundness, 0),
		angle: validateNumber(line.angle, 0),
		mirrorX: validateBoolean(line.mirrorX, true),
		mirrorY: validateBoolean(line.mirrorY, true),
		style: validateStyle(line.style)
	}
}

function validateStyle(style: CustomProperties): CustomProperties {
	const recreated: CustomProperties = {}
	if ("color" in style) recreated.color = validateString(style.color as string, "#FFFFFF")
	if ("outlineColor" in style)
		recreated.outlineColor = validateString(style.outlineColor as string, "#000000")
	if ("outlineThickness" in style)
		recreated.outlineThickness = validateNumber(style.outlineThickness as number, 0)
	return recreated
}
