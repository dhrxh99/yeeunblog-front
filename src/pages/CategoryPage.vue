<template>
<div class="container">
    <div class="row">
      <main >
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2>{{ category }} 게시판</h2>
          <div class="d-flex align-items-center">
            <span class="me-4 small">
              <a href="#" @click.prevent="changeSort('latest')">최신순</a>
              | 
              <a href="#" @click.prevent="changeSort('viewCount')">조회순</a>
              </span>
              <RouterLink to="/posting" class="d-flex align-items-center">
              <img :src='postingIcon' alt="" style="width:40px; height:40px; margin-right:8px; margin-left:1px;">
              </RouterLink>
          </div>
        </div>
    
        <div class="row g-3">
          <div class="col-md-4" v-for="post in posts" :key="post.id">
            <RouterLink :to="`/post/${post.id}`" class="text-decoration-none text-dark">
            <div class="card h-100 show=sm">
              <div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height:120px;">
                <img v-if="post.thumbnail" :src="post.thumbnail" alt="썸네일" style="max-height:100%; max-width:100%; object-fit:cover;"/>
                <span v-else>.img</span>
              </div>

              <div class="card-body text-center">
                <h5 class="card-title mb-2">{{ post.title }}</h5>
                <p class="card-text small text-muted">
                  {{ post.author }} · {{ post.createdAt }}
                </p>
              </div>
            </div>
            </RouterLink>
          </div>
        </div>

        <div class="d-flex justify-content-center align-items-center mt-4">
          <button 
            class="btn btn-outline-secondary btn-sm me-2"
            :disabled="currentPage === 1" 
            @click="fetchPosts(currentPage - 1)"
          >
            &lt;
          </button>

          <span>{{ currentPage }} / {{ totalPages }}</span>

          <button 
            class="btn btn-outline-secondary btn-sm ms-2"
            :disabled="currentPage === totalPages" 
            @click="fetchPosts(currentPage + 1)"
          >
            &gt;
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import postingIcon from '@/assets/images/postingButton.png'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const category = ref(route.params.category || "전체")

const posts = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const sort = ref("latest") 

async function fetchPosts(page = 1) {
  try {
    const res = await axios.get("/api/posts", {
      params: {
        category: category.value !== "전체" ? category.value : null,
        page: page -1,
        size: 9,
        sort: sort.value
      }
    })
    posts.value = res.data.items
    currentPage.value = res.data.page +1
    totalPages.value = res.data.totalPages
  } catch (e) {
    console.error("게시글 불러오기 실패: ", e)
  }
}

function changeSort(newSort) {
  sort.value = newSort
  fetchPosts(1)
}

onMounted(() => {
  fetchPosts()
})

watch(
  () => route.params.category,
  (newCategory) => {
    category.value = newCategory || "전체"
    fetchPosts(1)
  }
)

</script>
