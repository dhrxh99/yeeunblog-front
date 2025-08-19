<template>
  <header class="post__head">
    <h2 class="post__title">{{ title }}</h2>
    <div class="post__actions">
      <a href="#" @click.prevent="$emit('edit')">수정</a>
      <span>|</span>
      <button type="button" class="linklike" @click="$emit('remove')">삭제</button>
    </div>
  </header>
</template>

<script setup>
defineProps({ title: String, category: String })
defineEmits(['edit','remove'])
</script>
