<template>
  <main class="post-detail">
    <!-- 게시글 본문 -->
    <section class="post-card">
      <header class="post-header">
        <h2>{{ post.title }}</h2>
        <div class="post-meta">
          <span>{{ post.category }}</span> |
          <span>{{ post.createdAt }}</span> |
          <span>조회수: {{ post.viewCount }}</span>
        </div>
        <div class="post-actions" v-if="isAuthor">
          <button @click="editPost">수정</button>
          <button @click="confirmDelete('post')">삭제</button>
        </div>
      </header>

      <div class="post-content" v-html="post.content"></div>
    </section>

    <!-- 댓글 목록 -->
    <section class="comment-section">
      <h3>댓글</h3>
      <CommentList
        :comments="comments"
        @reply="openReplyForm"
        @edit="openEditForm"
        @delete="confirmDelete"
      />
    </section>

    <!-- 댓글 작성 -->
    <form class="comment-form" @submit.prevent="submitComment">
      <input
        type="text"
        v-model="newComment"
        placeholder="댓글을 입력하세요."
      />
      <button type="submit">작성하기</button>
    </form>

    <!-- 비밀번호 입력 모달 -->
    <PasswordModal
      v-if="showPasswordModal"
      @confirm="handlePasswordConfirm"
      @cancel="showPasswordModal = false"
    /> 
  </main>
</template>

<script setup>
import { ref } from "vue"
import CommentList from "@/components/comment/CommentList.vue"
// import PasswordModal from "@/components/comment/PasswordModal.vue"

const post = ref({
  id: 1,
  title: "제목1",
  content: "내용",
  category: "IT",
  createdAt: "2025.08.19 12:30",
  viewCount: 0,
  author: "닉네임"
})

const comments = ref([
  {
    id: 1,
    author: "익명1",
    content: "댓글 내용입니다.",
    replies: [
      { id: 11, author: "나", content: "답글 내용입니다." }
    ]
  }
])

const newComment = ref("")
const showPasswordModal = ref(false)
const targetAction = ref(null)

const isAuthor = true // 나중에 로그인 유저와 비교해서 처리

function editPost() {
  // 게시글 수정 페이지 이동
}
function confirmDelete(target) {
  targetAction.value = target
  showPasswordModal.value = true
}
function handlePasswordConfirm(password) {
  console.log("입력된 비밀번호:", password, "삭제 대상:", targetAction.value)
  showPasswordModal.value = false
}
function submitComment() {
  console.log("새 댓글:", newComment.value)
  newComment.value = ""
}
function openReplyForm(commentId) {
  console.log("댓글", commentId, "에 답글쓰기")
}
function openEditForm(commentId) {
  console.log("댓글", commentId, "수정하기")
}
</script>
