export function stylize(style: CustomProperties) {
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
