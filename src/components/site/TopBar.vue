<template>
  <header class="topbar">
    <div class="topbar__inner">
      <RouterLink class="home-btn" to="/">홈버튼</RouterLink>
      <h1 class="site-title">{{ title }}</h1>
    </div>
    <div class="topbar__divider"></div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  title: { type: String, default: 'Welcome to my Blog' }
})
</script>

