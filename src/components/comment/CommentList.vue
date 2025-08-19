<template>
  <ul class="comment-list">
    <CommentItem
      v-for="c in comments"
      :key="c.id"
      :node="c"
      @edit="$emit('edit', $event)"
      @save-edit="$emit('save-edit', $event)"
      @remove="$emit('remove', $event)"
      @reply="$emit('reply', $event)"
      @save-reply="$emit('save-reply', $event)"
    />
  </ul>
</template>

<script setup>
import CommentItem from './CommentItem.vue'
defineProps({ comments: { type: Array, required: true } })
defineEmits(['edit','save-edit','remove','reply','save-reply'])
</script>
