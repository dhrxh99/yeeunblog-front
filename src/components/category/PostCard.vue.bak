<template>
  <router-link class="card" :to="`/post/${post.id}`">
    <div class="card__img">
      <img :src="imgSrc" :alt="post.title" />
    </div>
    <div class="card__title">{{ post.title }}</div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: { type: Object, required: true },
  defaultThumb: { type: String, required: true }
})

const imgSrc = computed(() => {
  const t = props.post.thumbnail
  return t && String(t).trim() ? t : props.defaultThumb
})
</script>
