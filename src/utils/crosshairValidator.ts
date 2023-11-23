import { validateArray, validateBoolean, validateNumber, validateString } from "@/utils/validator"
import { defaultCrosshair, defaultDot, defaultLine, defaultStyle } from "./defaults"

const crosshairDefaults = defaultCrosshair("")
const dotDefaults = defaultDot()
const lineDefaults = defaultLine()

export function validateCrosshair(crosshair: Crosshair, id: string): Crosshair {
	return {
		id: crosshair.id || id,
		dots: validateArray(crosshair.dots, validateDot),
		lines: validateArray(crosshair.lines, validateLine),
		style: validateStyle(crosshair.style) ?? defaultStyle(),
		previewBackground: validateString(
			crosshair.previewBackground,
			crosshairDefaults.previewBackground
		)
	}
}

function validateDot(dot: Dot): Dot {
	return {
		id: validateString(dot.id, crypto.randomUUID()),
		position: {
			x: validateNumber(dot.position.x, dotDefaults.position.x),
			y: validateNumber(dot.position.y, dotDefaults.position.y)
		},
		size: validateNumber(dot.size, dotDefaults.size),
		mirrorX: validateBoolean(dot.mirrorX, dotDefaults.mirrorX),
		mirrorY: validateBoolean(dot.mirrorY, dotDefaults.mirrorY),
		style: validateStyle(dot.style)
	}
}

function validateLine(line: Line): Line {
	return {
		id: validateString(line.id, crypto.randomUUID()),
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
