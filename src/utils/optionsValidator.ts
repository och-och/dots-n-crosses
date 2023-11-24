import { validateNumber, validateString } from "@/utils/validator"

export function validateOptions(options: Options): Options {
	return {
		selectedCrosshair: validateString(options.selectedCrosshair, ""),
		scale: validateNumber(options.scale, 1)
	}
}
