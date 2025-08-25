<template>
  <div class="container my-4">
    <div v-if="post" class="card shadow-sm">
      <!-- 게시글 헤더 -->
      <div class="card-header bg-white">
        <h3 class="mb-1">{{ post.title }}</h3>
        <div class="d-flex justify-content-between small text-muted">
          <div>
            <span>{{ post.category }}</span> |
            <span>{{ post.author }}</span> |
            <span>{{ post.createdAt }}</span> |
            <span>조회수: {{ post.viewCount }}</span>
          </div>
          <div>
            <button class="btn btn-sm btn-outline-secondary me-2" @click="editPost">수정</button>
            <button class="btn btn-sm btn-outline-danger" @click="confirmDelete">삭제</button>
          </div>
        </div>
      </div>

      <!-- 게시글 본문 -->
      <div class="card-body">
        <p v-html="post.content" class="fs-5"></p>
      </div>

      <hr />

      <CommentSection :postId="Number(postId)" />
      </div>       

    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import axios from "axios"
import CommentSection from "@/pages/CommentSection.vue"

const route = useRoute()
const router = useRouter()
const postId = computed(() => Number(route.params.id))

const post = ref(null)

async function fetchPosts() {
  try {
    const res = await axios.get(`/api/posts/${postId.value}`)
    post.value = res.data 
  } catch (e) {
    console.error("게시글 로드 실패", e)
  }
}

function editPost() {
  const password = prompt("비밀번호를 입력하세요.")
  if (!password) return 
    router.push({ path: `/posting/${postId.value}`, query: {password} })
}

function confirmDelete() {
  const password = prompt("비밀번호를 입력하세요.")
  if (!password) return
  axios.delete(`/api/posts/${postId.value}`, { data: {password: password } } )
  .then(() => {
    alert("게시글이 삭제되었습니다.")
    router.push(`/study/${post.value.category}`)
  })
  .catch(() => alert("비밀번호가 일치하지 않습니다."))
}

onMounted(fetchPosts)

watch(postId, () => {
  fetchPosts()
  })

</script>
