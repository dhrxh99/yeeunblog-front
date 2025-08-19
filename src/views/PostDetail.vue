<template>
  <main class="content">
    <section class="post">
      <PostHeader
        :title="post.title"
        :category="post.category"
        @edit="goEdit"
        @remove="removePost"
      />
      <PostMeta
        :category="post.category"
        :created-at="post.createdAt"
        :view-count="post.viewCount"
      />
      <div class="post__divider" />
      <PostBody :content="post.content" />

      <section class="comments" id="comments">
        <h3 class="comments__title">댓글</h3>
        <CommentList
          :comments="commentsTree"
          @edit="editComment"
          @remove="removeComment"
          @reply="replyTo"
          @save-edit="saveEdit"
          @save-reply="saveReply"
        />
        <CommentForm @submit="saveNew" />
      </section>
    </section>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import PostHeader from '@/components/post/PostHeader.vue'
import PostMeta from '@/components/post/PostMeta.vue'
import PostBody from '@/components/post/PostBody.vue'
import CommentList from '@/components/comment/CommentList.vue'
import CommentForm from '@/components/comment/CommentForm.vue'
import { usePost } from '@/composables/usePost'
import { useComments } from '@/composables/useComments'
import { onMounted, ref, computed, watch } from 'vue'
// PostDetail.vue
import http from '../services/http'

// 댓글 작성
// await http.post(`/posts/${id.value}/comments`, { content: text, parentId })
// 댓글 수정
// await http.put(`/posts/${id.value}/comments/${commentId}`, { content: newText })
// 댓글 삭제
// await http.delete(`/posts/${id.value}/comments/${commentId}`)


const route = useRoute()
const router = useRouter()
const id = computed(() => String(route.params.id))

const { post, removePost } = usePost({ id, router })
const {
  commentsTree,        // 트리형 배열
  saveNew,             // 새 댓글
  saveEdit,            // 수정 저장
  editComment,         // 수정 모드 토글
  removeComment,       // 삭제
  replyTo,             // 답글 모드 토글
  saveReply,           // 답글 저장
  setInitial = setComments, // 이름 바꾸리 (존재 안 하면 undifined)
  load: loadComments        // 내부 로더
} = useComments({ postId: id })

const isReady = ref(false)

async function load() {
  isReady.value = false
  try {
    const { data } = await http.get(`/posts/${id.value}`) // 게시글 로딩
    post.value = data

    await http.post(`/posts/${id.value}/view`).catch(() => {}) // 조회수 +1

    try {
      const c = await http.get(`/posts/${id.value}/comments`) // 댓글 로딩
      if (typeof setComments === 'function') setComments(c.data)
    } catch (_) {
  
  }
  } finally {
    isReady.value = true
  }
}

onMounted(load)
watch(() => id.value, load) // 라우트 변경 시 재로딩

function goEdit() {
  router.push({ name: 'posting', query: { category: post.value?.category, edit: id.value } })
}
</script>
