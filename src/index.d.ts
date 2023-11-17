export { Line }

declare global {
	interface Line {
		offset: number
		length: number
		thickness: number
		angle: number
	}
}
