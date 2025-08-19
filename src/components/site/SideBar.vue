<template>
  <aside class="sidebar">
    <div class="profile-card">
      <div class="avatar" aria-hidden="true"></div>
      <div class="nick">{{ nickname }}</div>
      <RouterLink class="mypage" :to="myPageTo">마이페이지</RouterLink>
    </div>

    <ul class="category-list">
      <li>· <RouterLink to="/study/it">IT</RouterLink></li>
      <li>· <RouterLink :to="jpCatTo">일본어</RouterLink></li>
    </ul>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  nickname: { type: String, default: '닉네임' },
  myPagePath: { type: String, default: '/mypage' }
})

const myPageTo = computed(() => props.myPagePath)

// '일본어' 카테고리 경로 인코딩
const jpCatTo = computed(() => `/study/${encodeURIComponent('일본어')}`)
</script>

