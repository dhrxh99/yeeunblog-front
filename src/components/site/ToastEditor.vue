<!-- src/components/ToastEditor.vue -->
<template>
  <div ref="editorRoot"></div>
</template>

<script setup>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/editor'
import { ref, onMounted } from 'vue'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const editorRoot = ref(null)
let instance = null

onMounted(() => {
  instance = new Editor({
    el: editorRoot.value,      // Vue div에 mount
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    initialValue: props.modelValue || ''
  })

  instance.on('change', () => {
    emit('update:modelValue', instance.getMarkdown())
  })
})
</script>
