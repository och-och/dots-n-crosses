import { validateArray, validateBoolean, validateNumber, validateString } from "@/utils/validator"
import { defaultCrosshair, defaultDot, defaultLine, defaultStyle } from "./defaults"

const crosshairDefaults = defaultCrosshair("")
const dotDefaults = defaultDot()
const lineDefaults = defaultLine()

export function validateCrosshairs(crosshairs: Crosshair[]): Crosshair[] {
	return validateArray(crosshairs, validateCrosshair)
}

export function validateCrosshair(crosshair: Crosshair): Crosshair {
	return {
		id:
			crosshair.id ||
			(() => {
				throw new Error("Validation error, crosshair has no id :(")
			})(),
		dots: validateArray(crosshair.dots, validateDot),
		lines: validateArray(crosshair.lines, validateLine),
		style: validateStyle(crosshair.style) ?? defaultStyle(),
		previewBackground: validateString(
			crosshair.previewBackground,
			crosshairDefaults.previewBackground
		)
	}
}

function validateDot(dots: Dot): Dot {
	return {
		position: {
			x: validateNumber(dots.position.x, dotDefaults.position.x),
			y: validateNumber(dots.position.y, dotDefaults.position.y)
		},
		size: validateNumber(dots.size, dotDefaults.size),
		mirrorX: validateBoolean(dots.mirrorX, dotDefaults.mirrorX),
		mirrorY: validateBoolean(dots.mirrorY, dotDefaults.mirrorY),
		style: validateStyle(dots.style)
	}
}

function validateLine(line: Line): Line {
	return {
		offset: validateNumber(line.offset, lineDefaults.offset),
		length: validateNumber(line.length, lineDefaults.length),
		thickness: validateNumber(line.thickness, lineDefaults.thickness),
		roundness: validateNumber(line.roundness, lineDefaults.roundness),
		angle: validateNumber(line.angle, lineDefaults.angle),
		mirrorX: validateBoolean(line.mirrorX, lineDefaults.mirrorX),
		mirrorY: validateBoolean(line.mirrorY, lineDefaults.mirrorY),
		style: validateStyle(line.style)
	}
}

function validateStyle<T extends CustomProperties | undefined>(rawStyle: T) {
	if (!rawStyle || !(typeof rawStyle == "object")) {
		return undefined
	}

	const style: CustomProperties = defaultStyle()

	if ("color" in rawStyle) {
		style.color = validateString(rawStyle.color as string, style.color)
	}

	if ("outlineColor" in rawStyle) {
		style.outlineColor = validateString(rawStyle.outlineColor as string, style.outlineColor)
	}

	if ("outlineThickness" in rawStyle) {
		style.outlineThickness = validateNumber(
			rawStyle.outlineThickness as number,
			style.outlineThickness
		)
	}

	return style
}
