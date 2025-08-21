<template>
  <nav class="navbar navbar-light bg-light border-bottom px-3 mb-9" style="height:100px; ">
    <RouterLink to="/" class="d-flex align-items-center" style="margin-left:150px;">
      <!-- 홈버튼 아이콘 -->
      <img :src='homeIcon' alt="홈버튼" style="width:40px; height:40px; margin-right:8px; margin-left:1px;">
      홈버튼
    </RouterLink>
    <span class="mx-auto h4 mb-0">{{ title }}</span>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import homeIcon from '@/assets/images/homeButton.png'

const props = defineProps({
  title: { type: String, default: 'Welcome to my Blog' }
})
</script>
