<template>
  <li class="comment" :style="{ marginLeft: (node.depth * 16) + 'px' }">
    <div class="comment__row">
      <div class="comment__author">{{ node.author }}</div>

      <div class="comment__content" v-if="!node._editing">{{ node.content }}</div>

      <div class="comment__meta">
        <span>{{ format(node.createdAt) }}</span>
        <span class="sep">|</span>
        <a href="#" @click.prevent="$emit('reply', node.id)">답글쓰기</a>
        <span class="sep">|</span>
        <a href="#" @click.prevent="$emit('edit', node.id)">수정</a>
        <span class="sep">|</span>
        <button type="button" class="linklike" @click="$emit('remove', node.id)">삭제</button>
      </div>
    </div>

    <!-- 수정 -->
    <form v-if="node._editing" class="edit-form" @submit.prevent="$emit('save-edit', { id: node.id, text: editText })">
      <input type="text" v-model.trim="editText" required />
      <button type="submit">저장</button>
      <a href="#" @click.prevent="$emit('edit', node.id)">취소</a>
    </form>

    <!-- 답글 -->
    <form v-if="node._replying" class="reply-form" @submit.prevent="$emit('save-reply', { parentId: node.id, text: replyText })">
      <input type="text" v-model.trim="replyText" placeholder="답글을 입력하세요." required />
      <button type="submit">작성하기</button>
      <a href="#" @click.prevent="$emit('reply', node.id)">취소</a>
    </form>

    <ul v-if="node.children?.length">
      <CommentItem
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @edit="$emit('edit', $event)"
        @save-edit="$emit('save-edit', $event)"
        @remove="$emit('remove', $event)"
        @reply="$emit('reply', $event)"
        @save-reply="$emit('save-reply', $event)"
      />
    </ul>
  </li>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDateFormat } from '@/composables/useDateFormat'
const props = defineProps({ node: { type: Object, required: true } })
const { format } = useDateFormat()
const editText = ref(props.node.content)
const replyText = ref('')
watch(() => props.node.content, v => { editText.value = v })
</script>
