// const enums are broken :(
// const space = overwolf.extensions.io.enums.StorageSpace.appData
const space = "appData" as overwolf.extensions.io.enums.StorageSpace

export const readFile = (path: string): Promise<string> =>
	new Promise<string>((res, rej) =>
		overwolf.extensions.io.readTextFile(space, path, ({ success, error, content }) =>
			success ? res(content) : rej(error)
		)
	)
	.catch(e => (console.error(e), Promise.reject(e)))

export const writeFile = (path: string, content: string): Promise<void> =>
	new Promise<void>((res, rej) =>
		overwolf.extensions.io.writeTextFile(space, path, content, ({ success, error }) =>
			success ? res(undefined) : rej(error)
		)
	)
	.catch(e => (console.error(e), Promise.reject(e)))

export const exists = (path: string): Promise<string> =>
	new Promise<string>((res, rej) =>
		overwolf.extensions.io.exist(space, path, ({ success, error }) =>
			success ? res(path) : rej(error)
		)
	)
	.catch(e => (console.error(e), Promise.reject(e)))
