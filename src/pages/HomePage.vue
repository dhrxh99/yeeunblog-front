<template>
  <div class="container">
    <div class="row">
      <!-- Main Content -->
      <main >
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="h4">전체 게시글</h2>
          <div class="d-flex align-items-center">
            <span class="me-4 small">최신순 | 조회순</span>
              <RouterLink to="/posting" class="d-flex align-items-center">
              <img :src="postingIcon" alt="" style="width:40px; height:40px; margin-right:8px; margin-left:1px;">
              </RouterLink>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-md-4" v-for="post in posts" :key="post.id">
            <RouterLink :to="`/post/${post.id}`" class="text-decoration-none text-dark">
            <div class="card h-100">
              <div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height:120px;">
                  <img v-if="post.thumbnail" :src="post.thumbnail" style="max-height:100%; object-fit:cover;" />
                  <span v-else>.img</span>
              </div>
              <div class="card-body text-center">
                  <h5 class="card-title">{{ post.title }}</h5>
                  <p class="card-text small text-muted">
                    {{ post.author }} · {{ post.createdAt }}
                  </p>
              </div>
            </div>
            </RouterLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import postingIcon from '@/assets/images/postingButton.png'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const posts = ref([])

async function fetchPosts() {
  try{
    const res = await axios.get("/api/posts", {
    params: {sort: "latest", size: 6}
  })
  posts.value = res.data.items
} catch (e) {
  console.error("메인 게시글 불러오깃 실패", e)
 }
}

onMounted(fetchPosts)

</script>