export function tryExpression<T>(failable: () => T, catchCallback: (err: any) => T): T | null {
	try {
		return failable()
	} catch (err) {
		return catchCallback(err)
	}
}
