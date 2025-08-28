<!-- src/components/ToastEditor.vue -->
<template>
  <div ref="editorRoot"></div>
</template>

<script setup>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/editor'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const editorRoot = ref(null)
let instance = null

onMounted(() => {
  instance = new Editor({
    el: editorRoot.value,      // Vue div에 mount
    height: '500px',
    initialEditType: 'wysiwyg',
    hideModeSwitch: true,
    initialValue: props.modelValue || '',
    hooks: {
        addImageBlobHook: async (blob, callback) => {
            const formData = new FormData()
            formData.append("image", blob)

            try {
                const res = await axios.post("/api/uploads", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                callback(res.data.url, "image alt text")
            } catch (e) {
                alert("이미지 업로드 실패")
                console.error(e)
            }
        }
    }
  })

  instance.on('change', () => {
    emit('update:modelValue', instance.getHTML())
  })
})

watch(() => props.modelValue, (newVal) => {
    if (instance && newVal !== instance.getHTML()) {
        instance.setHTML(newVal || '')
    }
})

</script>
