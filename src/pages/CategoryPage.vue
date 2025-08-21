<template>
<div class="container">
    <div class="row">
      <main >
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2>{{ category }} 게시판</h2>
          <div class="d-flex align-items-center">
            <span class="me-4 small">최신순 | 조회순</span>
              <RouterLink to="/posting" class="d-flex align-items-center">
              <img :src='postingIcon' alt="" style="width:40px; height:40px; margin-right:8px; margin-left:1px;">
              </RouterLink>
          </div>
        </div>
    
        <div class="row g-3">
          <div class="col-md-4" v-for="post in posts" :key="post.id">
            <div class="card h-100">
              <div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height:120px;">
                .img
              </div>
              <div class="card-body text-center">
                <h5 class="card-title">{{ post.title }}</h5>
              </div>
            </div>
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
import { ref } from 'vue'
import postingIcon from '@/assets/images/postingButton.png'

const props = defineProps({ category: String })
const posts = ref([
  { id: 1, title: '제목1' },
  { id: 2, title: '제목2' },
  { id: 3, title: '제목3' },
  { id: 4, title: '제목4' },
  { id: 5, title: '제목5' },
  { id: 6, title: '제목6' }
])
</script>

<!-- <style src="@/assets/css/CategoryPage.css"></style> -->
