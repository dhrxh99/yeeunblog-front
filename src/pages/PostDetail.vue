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
          <div v-if="isAuthor">
            <button class="btn btn-sm btn-outline-secondary me-2" @click="editPost">수정</button>
            <button class="btn btn-sm btn-outline-danger" @click="confirmDelete('post')">삭제</button>
          </div>
        </div>
      </div>

      <!-- 게시글 본문 -->
      <div class="card-body">
        <p v-html="post.content" class="fs-5"></p>
      </div>

      <hr />

      <!-- 댓글 -->
      <div class="card-body">
        <h5 class="mb-3">댓글</h5>

        <!-- 댓글 목록 -->
        <ul class="list-group mb-3">
           <li v-for="c in comments" :key="c.id" class="list-group-item">
            <strong>{{ c.author }}</strong>
            <span class="text-muted small">{{ c.content }}</span>
            <div class="mt-2 d-flex gap-2">
              <button class="btn btn-sm btn-outline-primary">답글쓰기</button>
              <button class="btn btn-sm btn-outline-secondary">수정</button>
              <button class="btn btn-sm btn-outline-danger">삭제</button>
            </div>

            <!-- 대댓글 -->
            <ul class="list-group list-group-flush mt-2 ms-4">
              <li v-for="r in c.replies" :key="r.id" class="list-group-item">
                <strong>{{ r.author }}</strong>
                <span class="text-muted small">{{ r.content }}</span>
              </li>
            </ul>
          </li>
        </ul>

        <!-- 댓글 작성 -->
        <form class="d-flex gap-2" @submit.prevent="submitComment">
          <input type="text" class="form-control" v-model="newComment" placeholder="댓글을 입력하세요." />
          <button type="submit" class="btn btn-success">작성하기</button>
        </form>
      </div>
    </div>

     <!-- 로딩 표시 -->
    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue"
import { useRoute } from "vue-router"
import axios from "axios"

const route = useRoute()
const postId = computed(() => route.params.id)

const post = ref(null)
const comments = ref([])
const newComment = ref("")
const isAuthor = true

async function fetchPosts() {
  try {
    const res = await axios.get(`/api/posts/${postId.value}`)
    post.value = res.data // json 반환값 사용
  } catch (e) {
    console.error("게시글 로드 실패", e)
  }
}

// 댓글 불러오기
async function fetchComments() {
  try {
    const res = await axios.get(`/api/posts/${postId.value}/comments`)
    comments.value = res.data
  } catch (e) {
    console.error("댓글 로드 실패", e)
  }
}

// 댓글 작성
async function submitComment() {
  if (!newComment.value.trim()) return

  try {
    const res = await axios.post(`/api/posts/${postId.value}/comments`, {
      content: newComment.value,
      author: "익명" // 임시
    })
    comments.value.push(res.data) // 새 댓글 추가
    newComment.value = ""
  } catch (e) {
    console.error("댓글 작성 실패", e)
  }
}

function editPost() {
  console.log("수정 페이지 이동")
}
function confirmDelete(target) {
  console.log("삭제 대상:", target)
}
function openReplyForm(commentId) {
  console.log("답글쓰기:", commentId)
}
function openEditForm(commentId) {
  console.log("댓글 수정:", commentId)
}

onMounted(() => {
  fetchPosts()
  fetchComments()
})

watch(postId, () => {
  fetchPost()
  fetchComments()
})


</script>
