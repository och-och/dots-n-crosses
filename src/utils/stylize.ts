export function stylize(style?: CustomProperties): string {
	if (!style) return ""

	const styles: string[] = []
	if (style.color) {
		styles.push(`--color: ${style.color}`)
	}
	if (style.outlineThickness !== undefined) {
		styles.push(`--outline-thickness: ${style.outlineThickness}px`)
	}
	if (style.outlineColor) {
		styles.push(`--outline-color: ${style.outlineColor}`)
	}
	return styles.join(";")
}
