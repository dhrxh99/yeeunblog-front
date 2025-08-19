// Posting.vue 또는 PostEditor.vue (onSubmit 내부)
import http from '../services/http'

// src/services/http.js
import axios from 'axios'
export default axios.create({ baseURL: '/api' })


async function onSubmit () {
  if (!form.title || !form.category || !form.content) { alert('모두 입력'); return }
  const { data } = await http.post('/posts', {
    title: form.title,
    content: form.content,
    category: form.category,
  })
  router.push({ name: 'postDetail', params: { id: data.id } })
}
