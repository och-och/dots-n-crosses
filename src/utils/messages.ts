import { deproxy } from "./deproxy"

class Messager<T> {
	constructor(protected name: string) {}

	send(payload: T) {
		console.log(`Message ${this.name} sending`, payload)
		const event = new CustomEvent(this.name, { detail: deproxy(payload) })
		overwolf.windows.getMainWindow().dispatchEvent(event)
	}

	listen(callback: (payload: T) => void) {
		console.log(`Message ${this.name} added listener`)
		overwolf.windows
			.getMainWindow()
			.addEventListener(this.name as any, (event: CustomEvent<T>) => {
				callback(event.detail)
			})
	}
}

export const crosshairSelected = new Messager<{ id: string }>("crosshair-selected")
export const crosshairEdited = new Messager<{ crosshair: Crosshair }>("crosshair-edited")
export const scaleEdited = new Messager<{ scale: number }>("scale-edited")
export const gameEventEmitted = new Messager<{ events: { name: string; data: string }[] }>(
	"game-event"
)
export const gameInfoUpdated = new Messager<{ info: Record<string, any> }>("game-info")
