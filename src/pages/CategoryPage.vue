<template>
  <main class="content">
    <h2>{{ category }} 게시판</h2> <!-- IT → IT 게시판 / 일본어 → 일본어 게시판 -->
    
    <div class="sort">
      <button>최신순</button> | <button>조회순</button>
    </div>
    
    <div class="post-grid">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <div class="post-img">.img</div>
        <div class="post-title">{{ post.title }}</div>
      </div>
    </div>

    <div class="pagination">
      <button :disabled="currentPage === 1" @click="fetchPosts(currentPage - 1)">
        &lt;
      </button>

      <span>{{ currentPage }} / {{ totalPages }}</span>

      <button :disabled="currentPage === totalPages" @click="fetchPosts(currentPage + 1)">
        &gt;
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
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

<style src="@/assets/css/CategoryPage.css"></style>
