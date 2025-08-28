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
          placeholder="작성자명"
          v-model="author" :disabled="isEditMode"
        />
      </div>

      <!-- 비밀번호 입력 -->
      <div class="col-md-4">
        <input 
          type="password" 
          class="form-control"
          placeholder="비밀번호 (4자리 숫자)"
          v-model="password" 
          pattern="\d{4}"
          inputmode="numeric"
          :disabled="isEditMode"
          required
        />
      </div>
    </div>

    <!-- 본문 -->
    <div class="mb-3">
      <ToastEditor
        class="form-control" 
        rows="10" 
        placeholder="내용을 입력하세요."
        v-model="content"
      />
    </div>

    <!-- 작성/수정 버튼 -->
    <div class="text-end">
      <button class="btn btn-outline-dark" @click="submitPost">
        {{ isEditMode ? '수정하기' : '작성하기' }}
      </button>
    </div>
  </div>
</template>


<script setup>
import {computed, onMounted, ref} from "vue"
import axios from "axios"
import { useRoute, useRouter } from "vue-router"
import ToastEditor from '@/components/site/ToastEditor.vue'


const router = useRouter()
const route = useRoute()

const postId = route.params.postId
const editPassword = ref(route.query.password ?? "") // 수정 시 비밀번호 

const category = ref("카테고리 선택")
const title = ref("")
const content = ref("")
const author = ref("")
const password = ref("") // 신규 작성용 비밀번호

const isEditMode = computed(() => !!postId)

async function submitPost() {
  if (!title.value.trim() || !content.value.trim() || category.value === "카테고리 선택") {
    alert("필수 항목을 입력하세요.")
    return
  }

   if (!postId) {
    if (!/^\d{4}$/.test(password.value)) {
      alert("비밀번호는 반드시 4자리 숫자를 입력하세요.")
      return
    }
  }

  try {
    if (postId) {
      // 수정 모드
      await axios.put(`/api/posts/${postId}`, {
        title: title.value,
        content: content.value,
        category: category.value,
        password: editPassword.value.trim() // 상세에서 넘겨받은 pw
      })
      alert("게시글이 수정되었습니다.")
      router.push(`/post/${postId}`) // 수정 완료 후 상세로
    } else {
      // 작성 모드
      await axios.post("/api/posts", {
        title: title.value,
        content: content.value,
        category: category.value,
        author: author.value,
        password: password.value
      })
      alert("게시글이 작성되었습니다.")
      router.push(`/study/${category.value}`)
    }
  } catch (e) {
    alert("게시글 저장 실패")
    console.error(e)
  }
}

onMounted(async () => {
  if (isEditMode.value) {
    const res = await axios.get(`/api/posts/${postId}`)
    category.value = res.data.category
    title.value = res.data.title
    content.value = res.data.content
    author.value = res.data.author
  }
})

</script>

