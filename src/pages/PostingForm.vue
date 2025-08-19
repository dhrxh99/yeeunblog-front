<!-- src/views/PostingFrom.vue -->
<template>
  <div class="page">
    <TopBar />

    <div class="layout">
      <SideBar />

      <main class="content">
        <section class="editor">
          <h2 class="page-title">제목을 입력하세요.</h2>

          <form class="editor" @submit.prevent="onSubmit">
            <div class="field meta-line">
              <input
                type="text"
                v-model.trim="form.title"
                placeholder="제목을 입력하세요."
                required
              />
            </div>

            <div class="field meta-line">
              <label for="category">카테고리</label>
              <select id="category" v-model="form.category" required>
                <option value="" disabled>선택</option>
                <option value="it">it</option>
                <option value="일본어">일본어</option>
              </select>
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
              <button type="submit" class="primary" :disabled="pending">
                {{ pending ? '작성 중…' : '작성하기' }}
              </button>
            </div>
          </form>

          <p v-if="error" class="flash flash--error">{{ error }}</p>
          <p v-if="message" class="flash">{{ message }}</p>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopBar from '@/components/site/TopBar.vue'
import SideBar from '@/components/site/SideBar.vue'

const route = useRoute()
const router = useRouter()

const form = ref({
  title: '',
  category: '',
  content: ''
})

const pending = ref(false)
const error = ref('')
const message = ref('')

// 쿼리로 넘어온 category 기본값 세팅 (?category=it / ?category=일본어)
onMounted(() => {
  const c = route.query.category
  if (typeof c === 'string' && c.length) {
    form.value.category = c
  }
})

// Spring Security Cookie → Header(XSRF) 전송 헬퍼
function getCookie(name) {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([$?*|{}\]\\/+.^])/g, '\\$1') + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : null
}
function csrfHeaders() {
  // CookieCsrfTokenRepository 사용 시 기본: cookie "XSRF-TOKEN" → header "X-XSRF-TOKEN"
  const token = getCookie('XSRF-TOKEN')
  return token ? { 'X-XSRF-TOKEN': token } : {}
}

async function onSubmit() {
  error.value = ''
  message.value = ''

  if (!form.value.title || !form.value.category || !form.value.content) {
    error.value = '모든 필드를 입력해 주세요.'
    return
  }

  pending.value = true
  try {
    // 기존 컨트롤러(@ModelAttribute)와 호환되도록 FormData로 전송
    const fd = new FormData()
    fd.append('title', form.value.title)
    fd.append('category', form.value.category)
    fd.append('content', form.value.content)

    const res = await fetch('/save-posting', {
      method: 'POST',
      body: fd,
      credentials: 'include', // 세션/CSRF 쿠키 전달
      headers: {
        ...csrfHeaders()
        // JSON API로 바꿀 경우:
        // 'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || `서버 오류 (${res.status})`)
    }

    // 서버는 보통 카테고리 목록으로 리다이렉트 했으므로 프론트에서도 동일 동작
    const cat = form.value.category
    message.value = '작성 완료!'
    router.push({ name: 'study-category', params: { category: encodeURIComponent(cat) }, query: { sort: 'latest', page: 0 } })
  } catch (e) {
    error.value = e.message || '작성에 실패했습니다.'
  } finally {
    pending.value = false
  }
}
</script>

<style src="./PostingForm.css"></style>