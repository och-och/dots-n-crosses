export function promisify<T>(func: (cb: (value: T) => void) => void): Promise<T> {
	return new Promise((res, rej) => {
		try {
			func(value => res(value))
		} catch (err) {
			rej(err)
		}
	})
}
