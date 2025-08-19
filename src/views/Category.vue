<template>
  <main class="content">
    <div class="content__head">
      <h2 class="page-title">{{ pageTitle }}</h2>
      <div class="sort-write">
        <SortTabs :category="category" :sort="sort" :page="currentPage" />
        <router-link class="write-icon" :to="{ path: '/posting', query: { category } }" aria-label="작성 아이콘">✎</router-link>
      </div>
    </div>

    <section class="grid">
      <PostCard v-for="p in pagedPosts" :key="p.id" :post="p" :default-thumb="defaultThumb" />
      <div class="empty" v-if="pagedPosts.length === 0">게시글이 없습니다.</div>
    </section>

    <Paginator
      v-if="totalPages > 0"
      :category="category"
      :sort="sort"
      :current-page="safePage"
      :total-pages="totalPages"
    />
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouteState } from '../composables/useRouteState'
import { usePaginatedPosts } from '../composables/usePaginatedPosts'
import { usePostsStore} from '../composables/usePostsStore'
import SortTabs from '../components/category/SortTabs.vue'
import PostCard from '../components/category/PostCard.vue'
import Paginator from '../components/category/Paginator.vue'

// Category.vue (mounted/watch 시)
import http from '../services/http'

async function load() {
  const { data } = await http.get('/posts', {
    params: { category: category.value, sort: sort.value, page: currentPage.value, size: 9 }
  })
  posts.value = data.items
  totalPages.value = data.totalPages
}


const defaultThumb = '/images/default-thumb.png' // public/images/default-thumb.png 에 파일 두기
const { category, sort, currentPage } = useRouteState()

const pageTitle = computed(() => `${category.value} 게시판`)

const { posts: allPosts, setPosts } = usePostsStore()

onMounted(() => {
  // 목업 데이터 (나중에 API 연동)
  setPosts ([
    { id: 101, title: 'IT 글 A', category: 'it', viewCount: 25, createdAt: '2025-08-15T12:00:00', thumbnail: '' },
    { id: 102, title: 'IT 글 B', category: 'it', viewCount: 11, createdAt: '2025-08-16T10:00:00', thumbnail: '' },
    { id: 201, title: '일본어 글 A', category: '일본어', viewCount: 7,  createdAt: '2025-08-14T09:00:00', thumbnail: '' },
    { id: 202, title: '일본어 글 B', category: '일본어', viewCount: 19, createdAt: '2025-08-17T19:00:00', thumbnail: '' },
  ])
})

const { pagedPosts, totalPages, safePage } = usePaginatedPosts({
  allPosts, category, sort, currentPage, pageSize: 9
})
</script>
