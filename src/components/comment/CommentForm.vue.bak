<template>
  <form class="comment-form" @submit.prevent="$emit('submit', text)">
    <input type="text" v-model.trim="text" placeholder="댓글을 입력하세요." required />
    <button type="submit">작성하기</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const text = ref('')
</script>
