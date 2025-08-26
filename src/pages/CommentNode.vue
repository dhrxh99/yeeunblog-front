<template>
  <li class="list-group-item">
    <!-- 수정 모드 -->
    <div v-if="editTarget === comment.id">
      <input type="text" class="form-control mb-2" :value="editContent" @input="$emit('update-edit-content', $event.target.value)" />
      <button class="btn btn-sm btn-success me-2" @click="$emit('save-edit', comment.id)">수정 완료</button>
      <button class="btn btn-sm btn-secondary" @click="$emit('cancel-edit')">취소</button>
    </div>
    <!-- 일반 표시 -->
    <div v-else>
      <strong>{{ comment.author }}</strong>
      <span class="text-muted small">{{ comment.content }}</span>
      <div class="mt-2 d-flex gap-2">
        <button class="btn btn-sm btn-outline-primary" @click="$emit('open-reply-form', comment.id)">답글쓰기</button>
        <button class="btn btn-sm btn-outline-secondary" @click="$emit('start-edit', comment)">수정</button>
        <button class="btn btn-sm btn-outline-danger" @click="$emit('delete-comment', comment.id)">삭제</button>
      </div>
    </div>

    <!-- 답글 입력폼 -->
    <div v-if="replyForm.target === comment.id" class="mt-2 ms-4">
      <input v-model="replyForm.author" placeholder="작성자명" class="form-control mb-2" />
      <input v-model="replyForm.password" placeholder="비밀번호 (4자리)" class="form-control mb-2" type="password" />
      <textarea v-model="replyForm.content" placeholder="답글 내용" class="form-control mb-2"></textarea>
      <button class="btn btn-sm btn-success me-2" @click="$emit('submit-reply', comment.id)">답글 등록</button>
      <button class="btn btn-sm btn-secondary" @click="$emit('cancel-reply')">취소</button>
    </div>

    <!-- 🔁 재귀적으로 자식 출력 -->
    <ul v-if="comment.replies && comment.replies.length" class="list-group list-group-flush mt-2 ms-4">
      <CommentNode
        v-for="child in comment.replies"
        :key="child.id"
        :comment="child"
        :edit-target="editTarget"
        :edit-content="editContent"
        :reply-form="replyForm"
        @save-edit="$emit('save-edit', $event)"
        @cancel-edit="$emit('cancel-edit')"
        @delete-comment="$emit('delete-comment', $event)"
        @start-edit="$emit('start-edit', $event)"
        @open-reply-form="$emit('open-reply-form', $event)"
        @cancel-reply="$emit('cancel-reply')"
        @submit-reply="$emit('submit-reply', $event)"
      />
    </ul>
  </li>
</template>

<script setup>
defineProps({
  comment: Object,
  editTarget: Number,
  editContent: String,
  replyForm: Object
})
</script>
