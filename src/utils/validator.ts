export const validateNumber = validateType<number>("number")
export const validateString = validateType<string>("string")
export const validateBoolean = validateType<boolean>("boolean")

export const validateArray = <T>(array: T[], elementValidator: (element: T) => T) => {
	assert(
		typeof array == "object" && array instanceof Array,
		() => new Error(`Validation error: ${array} is not an array!`)
	)
	return array.map(elementValidator)
}

export function validateType<T>(type: "string" | "number" | "boolean") {
	return (value: T, defaultValue: T) => {
		if (typeof value == type) return value as T
		return defaultValue
	}
}

export function requireString(value: any): string | null {
	if (typeof value == "string") return value
	return null
}

export function assert(expression: unknown, error: () => Error): asserts expression {
	if (!expression) throw error()
}
