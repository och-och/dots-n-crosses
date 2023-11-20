// const enums are broken :(
// const space = overwolf.extensions.io.enums.StorageSpace.appData
const space = "appData" as overwolf.extensions.io.enums.StorageSpace

export const readFile = (path: string): Promise<string> =>
	new Promise<string>((res, rej) =>
		overwolf.extensions.io.readTextFile(space, path, ({ success, error, content }) =>
			success ? res(content) : rej(error)
		)
	).catch(
		e => (console.error(`Tried reading ${path}. Encountered error (${e})`), Promise.reject(e))
	)

export const writeFile = (path: string, content: string): Promise<void> =>
	deleteFile(path).then(() =>
		new Promise<void>((res, rej) =>
			overwolf.extensions.io.writeTextFile(space, path, content, ({ success, error }) =>
				success ? res() : rej(error)
			)
		)
		.catch(
			e => (
				console.error(`Tried writing to ${path}. Encountered error (${e})`), Promise.reject(e)
			)
		)
	)

export const deleteFile = (path: string): Promise<void> =>
	new Promise<void>((res, rej) =>
		overwolf.extensions.io.delete(space, path, ({ success, error }) =>
			success ? res() : rej(error)
		)
	).catch(e => (console.error(`Tried deleting ${path}. Encountered error (${e})`), e))

export const exists = (path: string): Promise<string> =>
	new Promise<string>((res, rej) =>
		overwolf.extensions.io.exist(space, path, ({ success, error }) =>
			success ? res(path) : rej(error)
		)
	).catch(
		e => (
			console.error(`Tried testing existance of ${path}. Encountered error (${e})`),
			Promise.reject(e)
		)
	)

export const readDir = (path: string): Promise<{ files: string[]; directories: string[] }> =>
	new Promise<{ files: string[]; directories: string[] }>((res, rej) =>
		overwolf.extensions.io.dir(space, path, ({ success, error, files, directories }) =>
			success ? res({ files, directories }) : rej(error)
		)
	).catch(
		e => (console.error(`Tried iterating a directory at ${path}. Encountered error (${e})`), e)
	)
