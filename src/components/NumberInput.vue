<script setup lang="ts">
const emit = defineEmits(["update:model-value"])
withDefaults(
	defineProps<{
		modelValue?: number
		title?: string
		min?: number
		max?: number
		step?: number
	}>(),
	{
		modelValue: 0,
		title: "Value",
		min: 0,
		max: 0,
		step: 0
	}
)

function update(event: Event) {
	const value = Number.parseInt((event.target as HTMLInputElement).value)
	emit("update:model-value", value)
}
</script>

<template>
	<div>
		<label>
			<p>
				{{ title }}
				<input
					type="number"
					:min="min"
					:max="max"
					:step="step"
					:value="modelValue"
					@input="update($event)"
				/>
			</p>
		</label>
		<input
			type="range"
			:min="min"
			:max="max"
			:step="step"
			:value="modelValue"
			@input="update($event)"
		/>
	</div>
</template>
