<template>
  <div class="card-body">
    <h5 class="mb-3">댓글</h5>

    <!-- 댓글 목록 -->
    <ul class="list-group mb-3">
      <li v-for="c in comments" :key="c.id" class="list-group-item">
        <div v-if="editTarget === c.id">
          <!-- 댓글 수정 폼 -->
          <input type="text" class="form-control mb-2" v-model="editContent" />
          <input type="password" class="form-control mb-2" v-model="newPassword" placeholder="비밀번호" />
          <button class="btn btn-sm btn-success me-2" @click="saveEdit(c.id)">수정 완료</button>
          <button class="btn btn-sm btn-secondary" @click="cancelEdit">취소</button>
        </div>
        <div v-else>
          <strong>{{ c.author }}</strong>
          <span class="text-muted small">{{ c.content }}</span>
          <div class="mt-2 d-flex gap-2">
            <button class="btn btn-sm btn-outline-primary" @click="reply(c.id)">답글쓰기</button>
            <button class="btn btn-sm btn-outline-secondary" @click="startEdit(c)">수정</button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteComment(c.id)">삭제</button>
          </div>
        </div>

        <!-- 대댓글 -->
        <ul class="list-group list-group-flush mt-2 ms-4">
          <li v-for="r in c.replies || []" :key="r.id" class="list-group-item">
            <div v-if="editTarget === r.id">
              <!-- 대댓글 수정 폼 -->
              <input type="text" class="form-control mb-2" v-model="editContent" />
              <input type="password" class="form-control mb-2" v-model="newPassword" 
              placeholder="비밀번호 (4자리 숫자)" pattern="\d{4}" maxlength="4" inputmode="numeric" />
              <button class="btn btn-sm btn-success me-2" @click="saveEdit(r.id)">수정 완료</button>
              <button class="btn btn-sm btn-secondary" @click="cancelEdit">취소</button>
            </div>
            <div v-else>
              <strong>{{ r.author }}</strong>
              <span class="text-muted small">{{ r.content }}</span>
              <div class="mt-2 d-flex gap-2">
                <button class="btn btn-sm btn-outline-secondary" @click="startEdit(r)">수정</button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteComment(r.id)">삭제</button>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 댓글 작성 -->
    <form class="d-flex gap-2" @submit.prevent="submitComment">
      <input 
      type="text" 
      class="form-control"
       v-model="newAuthor" 
       placeholder="작성자명"
       @keydown.enter.prevent 
       />
      <input 
      type="password" 
      class="form-control" 
      placeholder="비밀번호 (4자리 숫자)" 
      v-model="newPassword"
      pattern="\d{4}" 
      maxlength="4" 
      inputmode="numeric" 
      required
      @keydown.enter.prevent
      />
      <textarea
      class="form-control"
      v-model="newComment" 
      placeholder="댓글 내용" 
      @keydown.enter.prevent="insertNewLine"
      />
      <button type="submit" class="btn btn-success">작성하기</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const props = defineProps({ postId: Number })

const comments = ref([])

// 댓글 작성용 state
const newAuthor = ref("")
const newPassword = ref("")
const newComment = ref("")

// 수정용 state
const editTarget = ref(null) // 수정 중인 댓글 id
const editContent = ref("")
const editPassword = ref("")

function insertNewLine(e) {
  newComment.value += "\n"
}

async function fetchComments() {
  try {
    const res = await axios.get(`/api/posts/${props.postId}/comments`)
    comments.value = res.data
  } catch (e) {
    console.error("댓글 로드 실패", e)
  }
}

async function submitComment() {

  if (!newAuthor.value.trim() || !newPassword.value.trim() || !newComment.value.trim()) {
    alert("작성자, 비밀번호, 내용을 모두 입력하세요.")
    return
  }

  try {
    await axios.post(`/api/posts/${Number(props.postId)}/comments`, {
      content: newComment.value,
      author: newAuthor.value,
      password: newPassword.value.trim(),
      parentId: null
    })
    newAuthor.value = ""
    newPassword.value = ""
    newComment.value = ""
    fetchComments()
  } catch (e) {
    console.error("댓글 작성 실패", e.response?.data || e)
    alert("댓글 작성 실패")
  }
}

function startEdit(comment) {
  editTarget.value = comment.id
  editContent.value = comment.content
  editPassword.value = ""
}

async function saveEdit(commentId) {
  if (!editPassword.value.trim()) {
    alert("비밀번호를 입력하세요.")
    return
  }
  try {
    await axios.put(`/api/posts/${props.postId}/comments/${commentId}`, {
      content: editContent.value,
      password: editPassword.value
    })
    editTarget.value = null
    fetchComments()
  } catch (e) {
    alert("비밀번호가 일치하지 않습니다.")
  }
}

function cancelEdit() {
  editTarget.value = null
  editContent.value = ""
  editPassword.value = ""
}

async function deleteComment(commentId) {
  const pw = prompt("비밀번호를 입력하세요:")
  if (!pw) return
  try {
    await axios.delete(`/api/posts/${props.postId}/comments/${commentId}`, {
      data: { password: pw }
    })
    fetchComments()
  } catch (e) {
    alert("비밀번호가 일치하지 않습니다.")
  }
}

// 답글
async function reply(parentId) {
  const content = prompt("답글 내용을 입력하세요:")
  const author = prompt("작성자 이름을 입력하세요:") || "익명"
  const pw = prompt("비밀번호를 입력하세요:")
  if (!content || !pw) return
  try {
    await axios.post(`/api/posts/${props.postId}/comments`, {
      content,
      author,
      password: pw,
      parentId: Number(parentId)
    })
    fetchComments()
  } catch (e) {
    alert("답글 작성 실패")
  }
}

onMounted(fetchComments)
</script>
