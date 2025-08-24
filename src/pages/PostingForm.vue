<template>
  <div class="card shadow-sm p-4">
    <!-- 제목 -->
    <div class="mb-3">
      <input 
        type="text" 
        class="form-control form-control-lg fw-bold"
        placeholder="제목을 입력하세요."
        v-model="title"
      />
    </div>

    <!-- 카테고리 + 이름 + 비밀번호 -->
    <div class="row g-2 align-items-center mb-3">
      <!-- 카테고리 선택 -->
      <div class="col-md-4">
        <select class="form-select" v-model="category">
          <option disabled value="카테고리 선택">카테고리 선택</option>
          <option value="it">IT</option>
          <option value="japanese">일본어</option>
        </select>
      </div>

      <!-- 이름 입력 -->
      <div class="col-md-4">
        <input 
          type="text" 
          class="form-control"
          placeholder="이름"
          v-model="author"
        />
      </div>

      <!-- 비밀번호 입력 -->
      <div class="col-md-4">
        <input 
          type="password" 
          class="form-control"
          placeholder="비밀번호"
          v-model="password"
        />
      </div>
    </div>

    <!-- 본문 -->
    <div class="mb-3">
      <textarea 
        class="form-control" 
        rows="10" 
        placeholder="내용을 입력하세요."
        v-model="content"
      ></textarea>
    </div>

    <!-- 작성 버튼 -->
    <div class="text-end">
      <button class="btn btn-outline-dark" @click="submitPost">작성하기</button>
    </div>
  </div>
</template>


<script setup>
import {ref} from "vue"
import axios from "axios"
import { useRouter } from "vue-router"


const router = useRouter()

const category = ref("카테고리 선택")
const title = ref("")
const content = ref("")
const author = ref("")
const password = ref("")

const submitPost = async () => {

  if (category.value === "카테고리 선택" || !title.value.trim() || !content.value.trim()) {
    alert("필수 항목을 입력하세요.") 
    return 
  }

  try {
    const res = await axios.post("/api/posts", {
      category: category.value,
      title: title.value,
      content: content.value,
      author: author.value,
      password: password.value
    })
    router.push(`/study/${category.value}`)
  } catch (e) {
    console.error("게시글 저장 실패", e)
    alert("게시글 저장 실패")
  }
}
</script>

