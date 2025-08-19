<template>
  <div class="post__meta">
    <span class="chip">{{ category || '카테고리' }}</span>
    <span>|</span>
    <span>{{ format(createdAt) }}</span>
    <span>|</span>
    <span>조회수 : <b>{{ viewCount }}</b></span>
  </div>
</template>

<script setup>
import { useDateFormat } from '@/composables/useDateFormat'
const props = defineProps({ category: String, createdAt: String, viewCount: Number })
const { format } = useDateFormat()
</script>
