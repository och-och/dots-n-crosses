<script setup lang="ts">
import NumberInput from "@/components/NumberInput.vue"
import MirrorInput from "@/components/MirrorInput.vue"

const emit = defineEmits<{
	(e: "update:dot", dot: Dot): void
}>()

defineProps<{
	dot: Dot
}>()

function update(dot: Dot) {
	emit("update:dot", dot)
}
</script>

<template>
	<NumberInput
		title="Horizontal"
		:min="-150"
		:max="150"
		:model-value="dot.position.x"
		@update:model-value="x => update({ ...dot, position: { ...dot.position, x } })"
	/>
	<NumberInput
		title="Vertical"
		:min="-150"
		:max="150"
		:model-value="dot.position.y"
		@update:model-value="y => update({ ...dot, position: { ...dot.position, y } })"
	/>
	<NumberInput
		title="Size"
		:max="150"
		:model-value="dot.size"
		@update:model-value="size => update({ ...dot, size })"
	/>
	<MirrorInput
		:x="dot.mirrorX"
		:y="dot.mirrorY"
		@update:x="x => update({ ...dot, mirrorX: x })"
		@update:y="y => update({ ...dot, mirrorY: y })"
	/>
</template>
