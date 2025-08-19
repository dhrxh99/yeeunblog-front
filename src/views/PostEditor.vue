<!-- src/views/PostEditor.vue -->
<template>
  <main class="content">
    <section class="editor">
      <h2 class="page-title">{{ isEdit ? '제목을 수정하세요.' : '제목을 입력하세요.' }}</h2>

      <form class="editor" @submit.prevent="onSubmit">
        <div class="field">
          <input
            type="text"
            v-model.trim="form.title"
            placeholder="제목을 입력하세요."
            required
          />
        </div>

        <div class="field meta-line">
          <label class="sr-only">카테고리</label>
          <!-- 필요 시 select로 바꿔도 OK -->
          <input
            type="text"
            v-model.trim="form.category"
            placeholder="카테고리 선택"
            required
          />
        </div>

        <div class="editor__divider"></div>

        <div class="field">
          <textarea
            v-model.trim="form.content"
            placeholder="내용을 입력하세요."
            required
          ></textarea>
        </div>

        <div class="field align-right">
          <button type="submit" class="primary">{{ isEdit ? '수정하기' : '작성하기' }}</button>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import http from '../services/http' // axios 인스턴스: baseURL '/api'

const route = useRoute()
const router = useRouter()

// 수정 모드 여부: /post/:id/edit 에서 id가 있으면 true
const id = computed(() => route.params.id ? String(route.params.id) : null)
const isEdit = computed(() => !!id.value)

const form = reactive({
  title: '',
  category: '',
  content: '',
})

onMounted(async () => {
  if (isEdit.value) {
    // 수정: 기존 글 로드
    const { data } = await http.get(`/posts/${id.value}`)
    form.title = data.title ?? ''
    form.category = data.category ?? ''
    form.content = data.content ?? ''
  } else {
    // 작성: 쿼리로 프리셋 (예: /posting?category=it)
    const qc = route.query.category
    if (typeof qc === 'string' && qc) form.category = qc
  }
})

async function onSubmit () {
  console.log(">>>눌림")
  if (!form.title || !form.category || !form.content) {
    alert('제목/카테고리/내용을 모두 입력하세요.')
    return
  }

  if (isEdit.value) {
    await http.put(`/posts/${id.value}`, {
      title: form.title,
      content: form.content,
      category: form.category,
    })
    router.push({ name: 'postDetail', params: { id: id.value } })
  } else {
    const { data } = await http.post('/posts', {
      title: form.title,
      content: form.content,
      category: form.category,
    })
    router.push({ name: 'postDetail', params: { id: data.id } })
  }
}
</script>
