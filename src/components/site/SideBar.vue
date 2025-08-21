<template>
  <aside class="col-3">
    <div class="card">
      <div class="card-body text-center">
        <img src="https://via.placeholder.com/80" class="rounded-circle mb-2" alt="avatar">
        <h5 class="card-title">{{ nickname }}</h5>
        <RouterLink :to="myPagePath" class="btn btn-sm btn-outline-primary mb-3">마이페이지</RouterLink>

        <ul class="list-group list-group-flush text-start">
          <li class="list-group-item d-flex align-items-center">
            <img :src="itIcon" alt="IT" style="width:24px; height:24px; margin-right:8px;">
            <RouterLink to="/study/it">IT</RouterLink>
          </li>
          <li class="list-group-item d-flex align-items-center">
            <img :src="jpIcon" alt="일본어" style="width:24px; height:24px; margin-right:8px;">
            <RouterLink :to="jpCatTo">일본어</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

// props
const props = defineProps({
  nickname: { type: String, default: '닉네임' },
  myPagePath: { type: String, default: '/mypage' }
})

// 카테고리 링크
const jpCatTo = computed(() => `/study/${encodeURIComponent('일본어')}`)

// 이미지 import
import itIcon from '@/assets/images/itCategory.png'
import jpIcon from '@/assets/images/japaneseCategory.png'
</script>
