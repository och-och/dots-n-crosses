import { deproxy } from "./deproxy"

export function serializeCrosshair(crosshair: Crosshair): string {
	const serialCrosshair: any = deproxy(crosshair)

	// Remove ids
	serialCrosshair.id = undefined
	serialCrosshair.dots.map((dot: any) => (dot.id = undefined))
	serialCrosshair.lines.map((line: any) => (line.id = undefined))

	return JSON.stringify(serialCrosshair)
}
