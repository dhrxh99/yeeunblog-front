<template>
  <div class="card-body">
    <h5 class="mb-3">댓글</h5>

    <!-- 루트 댓글 목록 -->
    <ul class="list-group mb-3">
      <CommentNode
        v-for="c in comments"
        :key="c.id"
        :comment="c"
        :edit-target="editTarget"
        :edit-content="editContent"
        :reply-form="replyForm"
        @update-edit-content="val => editContent.value = val"
        @start-edit="startEdit"
        @save-edit="saveEdit"
        @cancel-edit="cancelEdit"
        @delete-comment="deleteComment"
        @open-reply-form="openReplyForm"
        @cancel-reply="cancelReply"
        @submit-reply="submitReply"
      />
    </ul>

    <!-- 댓글 작성 -->
    <form class="d-flex gap-2" @submit.prevent="submitComment">
      <input type="text" class="form-control" v-model="newAuthor" placeholder="작성자명" />
      <input type="password" class="form-control" v-model="newPassword" placeholder="비밀번호 (4자리)" maxlength="4" required />
      <textarea class="form-control" v-model="newComment" placeholder="댓글 내용" />
      <button type="submit" class="btn btn-success">작성하기</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import CommentNode from "./CommentNode.vue"

const props = defineProps({ postId: Number })
const comments = ref([])

// state
const newAuthor = ref("")
const newPassword = ref("")
const newComment = ref("")

const editTarget = ref(null)
const editContent = ref("")
const editPassword = ref("")

const replyForm = ref({ target: null, author: "", password: "", content: "" })

async function fetchComments() {
  const res = await axios.get(`/api/posts/${props.postId}/comments`)
  comments.value = buildCommentTree(res.data)
}

function buildCommentTree(flatList) {
  const map = {}, roots = []
  flatList.forEach(c => (map[c.id] = { ...c, replies: [] }))
  flatList.forEach(c => {
    if (c.parentId && map[c.parentId]) map[c.parentId].replies.push(map[c.id])
    else roots.push(map[c.id])
  })
  return roots
}

async function submitComment() {
  if (!newAuthor.value || !newPassword.value || !newComment.value) {
    alert("작성자/비밀번호/내용을 모두 입력하세요.")
    return
  }

  if (!/^\d{4}$/.test(newPassword.value)) {
    alert("비밀번호는 반드시 4자리 숫자를 입력하세요.")
    return
  }

  await axios.post(`/api/posts/${props.postId}/comments`, {
    content: newComment.value,
    author: newAuthor.value,
    password: newPassword.value,
    parentId: null
  })
  newAuthor.value = newPassword.value = newComment.value = ""
  fetchComments()
}

async function startEdit(comment) {
  const pw = prompt("비밀번호를 입력하세요.")
  if (!pw) return
  const res = await axios.post(`/api/posts/${props.postId}/comments/${comment.id}/check`, { password: pw })
  if (res.data.valid) {
    editTarget.value = comment.id
    editContent.value = comment.content
    editPassword.value = pw
  } else {
    alert("비밀번호가 일치하지 않습니다.")
  }
}

async function saveEdit(commentId) {
  await axios.put(`/api/posts/${props.postId}/comments/${commentId}`, {
    content: editContent.value,
    password: editPassword.value
  })
  editTarget.value = null
  fetchComments()
}

function cancelEdit() {
  editTarget.value = null
  editContent.value = ""
  editPassword.value = ""
}

async function deleteComment(commentId) {
  const pw = prompt("비밀번호를 입력하세요:")
  if (!pw) return
  await axios.delete(`/api/posts/${props.postId}/comments/${commentId}`, { data: { password: pw } })
  fetchComments()
}

function openReplyForm(commentId) {
  replyForm.value = { target: commentId, author: "", password: "", content: "" }
}

function cancelReply() {
  replyForm.value.target = null
}

async function submitReply(parentId) {

  if (!/^\d{4}$/.test(replyForm.value.password)) {
    alert("비밀번호는 반드시 4자리 숫자를 입력하세요.")
    return
  }

  await axios.post(`/api/posts/${props.postId}/comments`, {
    content: replyForm.value.content,
    author: replyForm.value.author,
    password: replyForm.value.password,
    parentId
  })
  cancelReply()
  fetchComments()
}

onMounted(fetchComments)
</script>
