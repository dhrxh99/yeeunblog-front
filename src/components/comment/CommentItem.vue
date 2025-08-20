<template>
  <div class="comment-item">
    <div class="comment-header">
      <strong>{{ comment.author }}</strong>
      <span class="date">{{ comment.createdAt }}</span>
    </div>

    <div class="comment-body">
      <span>{{ comment.content }}</span>
    </div>

    <div class="comment-actions">
      <button @click="$emit('reply', comment)">답글쓰기</button>
      <button @click="$emit('edit', comment)">수정</button>
      <button @click="$emit('remove', comment)">삭제</button>
    </div>

    <!-- 자식 댓글들 (답글) -->
    <div class="replies" v-if="comment.replies && comment.replies.length">
      <CommentList
        :comments="comment.replies"
        @edit="$emit('edit', $event)"
        @remove="$emit('remove', $event)"
        @reply="$emit('reply', $event)"
        @save-edit="$emit('save-edit', $event)"
        @save-reply="$emit('save-reply', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import CommentList from './CommentList.vue'

defineProps({
  comment: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'remove', 'reply', 'save-edit', 'save-reply'])
</script>

<style scoped>
.comment-item {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 6px;
}

.replies {
  margin-left: 16px;
  margin-top: 6px;
  border-left: 2px solid #ccc;
  padding-left: 10px;
}
</style>
