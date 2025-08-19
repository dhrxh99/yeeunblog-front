<!-- src/views/PostDetail.vue -->
<template>
  <div class="page">
    <TopBar />

    <div class="layout">
      <SideBar />

      <main class="content">
        <section class="post">
          <header class="post__head">
            <h2 class="post__title">{{ post.title }}</h2>

            <div class="post__actions">
              <RouterLink :to="{ name: 'post-edit', params: { id: post.id } }">수정</RouterLink>
              <span>|</span>
              <button class="linklike" @click="onDeletePost">삭제</button>
            </div>
          </header>

          <div class="post__meta">
            <span class="chip">{{ post.category || '카테고리' }}</span>
            <span>|</span>
            <span>{{ formatDate(post.createdAt) }}</span>
            <span>|</span>
            <span>조회수 : <b>{{ post.viewCount ?? 0 }}</b></span>
          </div>

          <div class="post__divider"></div>

          <!-- 원본 Thymeleaf는 th:text(escape)였으므로 그대로 텍스트 렌더링 -->
          <article class="post__body">
            {{ post.content }}
          </article>

          <!-- 댓글 -->
          <section class="comments" id="comments">
            <h3 class="comments__title">댓글</h3>

            <ul class="comment-list">
              <li
                v-for="c in comments"
                :key="c.id"
                class="comment"
                :style="{ marginLeft: (c.depth || 0) * 16 + 'px' }"
              >
                <div class="comment__row">
                  <div class="comment__author">{{ c.author || '익명' }}</div>
                  <div class="comment__content" v-if="!editing[c.id]">{{ c.content }}</div>

                  <!-- 수정 폼 -->
                  <form v-else class="edit-form" @submit.prevent="saveEdit(c.id)">
                    <input type="text" v-model.trim="editBuffer[c.id]" required />
                    <button type="submit">저장</button>
                    <a href="#comments" @click.prevent="toggleEdit(c.id, false)">취소</a>
                  </form>

                  <div class="comment__meta">
                    <span>{{ formatDate(c.createdAt) }}</span>
                    <span class="sep">|</span>
                    <a href="#" @click.prevent="toggleReply(c.id, true)">답글쓰기</a>
                    <span class="sep">|</span>
                    <a href="#" @click.prevent="toggleEdit(c.id, true, c.content)">수정</a>
                    <span class="sep">|</span>
                    <button class="linklike" @click="onDeleteComment(c.id)">삭제</button>
                  </div>
                </div>

                <!-- 답글 폼 -->
                <form v-if="replying[c.id]" class="reply-toggle" @submit.prevent="saveReply(c.id)">
                  <input type="text" v-model.trim="replyBuffer[c.id]" placeholder="답글을 입력하세요." required />
                  <button type="submit">작성하기</button>
                  <a href="#comments" @click.prevent="toggleReply(c.id, false)">취소</a>
                </form>
              </li>
            </ul>

            <!-- 새 댓글 -->
            <form class="comment-form" @submit.prevent="saveNew">
              <input type="text" v-model.trim="newComment" placeholder="댓글을 입력하세요." required />
              <button type="submit">작성하기</button>
            </form>
          </section>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import TopBar from '@/components/site/TopBar.vue'
import SideBar from '@/components/site/SideBar.vue'

/**
 * props로 데이터를 받는 구조(부모/스토어에서 주입)
 * 필요 시 이 컴포넌트 안에서 fetch로 교체 가능.
 */
const props = defineProps({
  post: {
    type: Object,
    default: () => ({ id: null, title: '', category: '', createdAt: '', viewCount: 0, content: '' })
  },
  comments: {
    type: Array,
    default: () => [] // [{id, author, content, createdAt, depth}]
  }
})

const route = useRoute()
const router = useRouter()

// 로컬 상태
const post = reactive({ ...props.post })
const comments = ref([ ...props.comments ])

const newComment = ref('')
const replying = reactive({})     // { [cid]: boolean }
const replyBuffer = reactive({})  // { [cid]: string }
const editing = reactive({})      // { [cid]: boolean }
const editBuffer = reactive({})   // { [cid]: string }

// 날짜 포맷: yyyy.MM.dd HH:mm
function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  if (isNaN(d)) return String(value)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// CSRF (CookieCsrfTokenRepository 가정)
function getCookie(name) {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([$?*|{}\]\\/+.^])/g, '\\$1') + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : null
}
function csrfHeaders() {
  const token = getCookie('XSRF-TOKEN')
  return token ? { 'X-XSRF-TOKEN': token } : {}
}

// 게시글 삭제
async function onDeletePost() {
  if (!post.id) return
  if (!confirm('삭제하시겠습니까?')) return

  const fd = new FormData()
  try {
    const res = await fetch(`/post/${post.id}/delete`, {
      method: 'POST',
      body: fd,
      credentials: 'include',
      headers: { ...csrfHeaders() }
    })
    if (!res.ok) throw new Error(`삭제 실패 (${res.status})`)
    // 보통 목록으로 이동
    router.push({ name: 'home' })
  } catch (e) {
    alert(e.message || '삭제 중 오류가 발생했습니다.')
  }
}

// 새 댓글
async function saveNew() {
  if (!post.id || !newComment.value) return
  const fd = new FormData()
  fd.append('content', newComment.value)
  try {
    const res = await fetch(`/post/${post.id}/comments`, {
      method: 'POST',
      body: fd,
      credentials: 'include',
      headers: { ...csrfHeaders() }
    })
    if (!res.ok) throw new Error('댓글 작성 실패')
    newComment.value = ''
    await refreshComments()
  } catch (e) {
    alert(e.message || '댓글 작성 중 오류가 발생했습니다.')
  }
}

// 답글
async function saveReply(parentId) {
  if (!post.id || !replyBuffer[parentId]) return
  const fd = new FormData()
  fd.append('parentId', String(parentId))
  fd.append('content', replyBuffer[parentId])

  try {
    const res = await fetch(`/post/${post.id}/comments`, {
      method: 'POST',
      body: fd,
      credentials: 'include',
      headers: { ...csrfHeaders() }
    })
    if (!res.ok) throw new Error('답글 작성 실패')
    replyBuffer[parentId] = ''
    replying[parentId] = false
    await refreshComments()
  } catch (e) {
    alert(e.message || '답글 작성 중 오류가 발생했습니다.')
  }
}

// 댓글 수정
async function saveEdit(cid) {
  if (!post.id || !editBuffer[cid]) return
  const fd = new FormData()
  fd.append('content', editBuffer[cid])

  try {
    const res = await fetch(`/post/${post.id}/comments/${cid}/edit`, {
      method: 'POST',
      body: fd,
      credentials: 'include',
      headers: { ...csrfHeaders() }
    })
    if (!res.ok) throw new Error('댓글 수정 실패')
    editing[cid] = false
    await refreshComments()
  } catch (e) {
    alert(e.message || '댓글 수정 중 오류가 발생했습니다.')
  }
}

// 댓글 삭제
async function onDeleteComment(cid) {
  if (!confirm('댓글을 삭제할까요?')) return
  const fd = new FormData()
  try {
    const res = await fetch(`/post/${post.id}/comments/${cid}/delete`, {
      method: 'POST',
      body: fd,
      credentials: 'include',
      headers: { ...csrfHeaders() }
    })
    if (!res.ok) throw new Error('댓글 삭제 실패')
    await refreshComments()
  } catch (e) {
    alert(e.message || '댓글 삭제 중 오류가 발생했습니다.')
  }
}

// UI 토글
function toggleReply(cid, open) {
  replying[cid] = open
  if (open && !replyBuffer[cid]) replyBuffer[cid] = ''
}
function toggleEdit(cid, open, init = '') {
  editing[cid] = open
  if (open) editBuffer[cid] = init
}

// (선택) 댓글 새로고침: 실제 API 경로에 맞게 변경
async function refreshComments() {
  // 예시: /api/posts/:id/comments 로 교체 가능
  // 여기서는 간단히 페이지 리로드 대신 임시로 새로고침 요청을 유보.
  // 필요 시 부모에서 props를 갱신하거나, 아래처럼 fetch를 구현하세요.
  // const res = await fetch(`/api/posts/${post.id}/comments`)
  // comments.value = await res.json()
  // 임시: 하드 리로드로 서버 렌더 결과에 맞춰 표시하고 싶을 때:
  // location.reload()
}
</script>

<style src="./PostDetail.css"></style>