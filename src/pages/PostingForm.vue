<template>
  <main class="content">
    <section class="post-editor">
      <form class="post-form" @submit.prevent="handleSubmit">
        
        <!-- 제목 -->
        <div class="form-group">
          <label for="title"><strong>제목</strong></label>
          <input type="text" id="title" v-model="form.title" placeholder="제목을 입력하세요." required />
        </div>

        <!-- 카테고리 -->
        <div class="form-group">
          <label for="category">카테고리 선택</label>
          <select id="category" v-model="form.category" required>
            <option value="">-- 선택 --</option>
            <option value="it">IT</option>
            <option value="japanese">일본어</option>
          </select>
        </div>

        <!-- 닉네임 -->
        <div class="form-group">
          <label for="nickname">닉네임</label>
          <input type="text" id="nickname" v-model="form.nickname" placeholder="닉네임을 입력하세요." required />
        </div>

        <!-- 비밀번호 -->
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="form.password" placeholder="비밀번호를 입력하세요." required />
        </div>

        <!-- 내용 -->
        <div class="form-group">
          <label for="content"><strong>내용</strong></label>
          <textarea id="content" v-model="form.content" placeholder="내용을 입력하세요." required></textarea>
        </div>

        <!-- 버튼 -->
        <div class="form-actions">
          <button type="submit" class="btn-submit">작성하기</button>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import { reactive } from 'vue'
import '@/assets/css/PostingForm.css'

const form = reactive({
  title: '',
  category: '',
  nickname: '',
  password: '',
  content: ''
})

function handleSubmit() {
  console.log("폼 데이터:", form)
  // 👉 나중에 axios.post('/api/posts', form) 이런 식으로 서버 전송하면 됨
  alert("게시글이 등록되었습니다!")
}
</script>
