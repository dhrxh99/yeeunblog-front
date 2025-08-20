<template>
  <div class="comment-list">
    <CommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @edit="$emit('edit', $event)"
      @remove="$emit('remove', $event)"
      @reply="$emit('reply', $event)"
      @save-edit="$emit('save-edit', $event)"
      @save-reply="$emit('save-reply', $event)"
    />
  </div>
</template>

<script setup>
import CommentItem from './CommentItem.vue'

defineProps({
  comments: {
    type: Array,
    required: true
  }
})

defineEmits(['edit', 'remove', 'reply', 'save-edit', 'save-reply'])
</script>

<style scoped>
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
