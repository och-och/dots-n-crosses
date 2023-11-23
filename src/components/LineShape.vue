<script setup lang="ts">
import ShapeEditor from "@/components/ShapeEditor.vue"
import BottomButton from "@/components/BottomButton.vue"
import IconClose from "@/components/icons/IconClose.vue"
import CrosshairPreview from "@/components/CrosshairPreview.vue"
import { toRefs } from "vue"

defineEmits<{
	(e: "select"): void
	(e: "delete"): void
}>()

const props = defineProps<{
	crosshair: Crosshair
	line: Line
	selected: boolean
}>()

const {crosshair, line, selected} = toRefs(props)
</script>

<template>
	<ShapeEditor
		has-bottom-button
		:selected="selected"
		@click="$emit('select')"
	>
		<CrosshairPreview :crosshair="{ ...crosshair, dots:[], lines:[line] }" />
		<BottomButton @click.stop="$emit('delete')">
			<IconClose :size="16" :weight="8" />
		</BottomButton>
	</ShapeEditor>
</template>

<style scoped>
.shape-editor {
	cursor: pointer;
}
</style>
