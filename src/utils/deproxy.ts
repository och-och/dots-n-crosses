export function deproxy<T>(object: T): T {
	if (object instanceof Array) {
		return [...object].map(deproxy) as any
	} else if (object instanceof Object) {
		return Object.fromEntries(Object.entries(object).map(deproxy)) as any
	} else {
		return object
	}
}
