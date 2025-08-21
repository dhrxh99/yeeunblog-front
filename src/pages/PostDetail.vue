<template>
  <div class="container my-4">
    <div class="card shadow-sm">
      <!-- 게시글 헤더 -->
      <div class="card-header bg-white">
        <h3 class="mb-1">{{ post.title }}</h3>
        <div class="d-flex justify-content-between small text-muted">
          <div>
            <span>{{ post.category }}</span> |
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
          <li class="list-group-item">
            <strong>익명1</strong> <span class="text-muted small">댓글 내용입니다.</span>
            <div class="mt-2 d-flex gap-2">
              <button class="btn btn-sm btn-outline-primary">답글쓰기</button>
              <button class="btn btn-sm btn-outline-secondary">수정</button>
              <button class="btn btn-sm btn-outline-danger">삭제</button>
            </div>

            <!-- 대댓글 -->
            <ul class="list-group list-group-flush mt-2 ms-4">
              <li class="list-group-item">
                <strong>나</strong> <span class="text-muted small">답글 내용입니다.</span>
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
  </div>
</template>

<script setup>
import { ref } from "vue"

const post = ref({
  id: 1,
  title: "제목1",
  content: "내용",
  category: "IT",
  createdAt: "2025.08.21 12:30",
  viewCount: 0,
  author: "닉네임"
})

const newComment = ref("")
const isAuthor = true

function editPost() {
  console.log("수정 페이지 이동")
}
function confirmDelete(target) {
  console.log("삭제 대상:", target)
}
function submitComment() {
  console.log("새 댓글:", newComment.value)
  newComment.value = ""
}
</script>
