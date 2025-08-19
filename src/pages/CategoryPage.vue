<!-- src/views/CategoryPage.vue -->
<template>
  <div class="page">
    <TopBar />

    <div class="layout">
      <SideBar />

      <main class="content">
        <div class="content__head">
          <h2 class="page-title">{{ resolvedTitle }}</h2>

          <div class="sort-write">
            <div class="sort">
              <RouterLink
                :class="{ 'is-active': sort==='latest' }"
                :to="linkTo({ sort: 'latest', page: currentPage })"
              >최신순</RouterLink>
              <span>|</span>
              <RouterLink
                :class="{ 'is-active': sort==='latest' }"
                :to="linkTo({ sort: 'views', page: currentPage })"
              >조회순</RouterLink>
            </div>

            <!-- 글쓰기 (category 쿼리로 전달) -->
            <RouterLink
              class="write-icon"
              :to="{ name: 'posting', query: { category } }"
              aria-label="작성 아이콘"
            >✎</RouterLink>
          </div>
        </div>

        <!-- 목록 -->
        <section class="grid">
          <RouterLink
            v-for="p in posts"
            :key="p.id"
            class="card"
            :to="{ name: 'post', params: { id: p.id } }"
          >
            <div class="card__img">
              <img
                :src="(p.thumbnail && p.thumbnail.trim()) ? p.thumbnail : defaultThumb"
                :alt="p.title"
                loading="lazy"
              />
            </div>
            <div class="card__title">{{ p.title }}</div>
          </RouterLink>

          <div v-if="posts.length === 0" class="empty">게시글이 없습니다.</div>
        </section>

        <!-- 페이지네이션 -->
        <div v-if="totalPages > 0" class="pagination">
          <RouterLink
            :class="['page-btn', currentPage === 0 && 'is-disabled']"
            :to="linkTo({ sort, page: Math.max(0, currentPage - 1) })"
            aria-label="이전 페이지"
          >‹</RouterLink>

          <span>{{ currentPage + 1 }} / {{ totalPages }}</span>

          <RouterLink
            :class="['page-btn', currentPage + 1 === totalPages && 'is-disabled']"
            :to="linkTo({ sort, page: Math.min(totalPages - 1, currentPage + 1) })"
            aria-label="다음 페이지"
          >›</RouterLink>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import TopBar from '@/components/site/TopBar.vue'
import SideBar from '@/components/site/SideBar.vue'

/**
 * 부모/스토어에서 주입할 데이터
 * - posts: [{ id, title, thumbnail, createdAt, viewCount, ... }]
 * - totalPages: 페이지 전체 개수 (0이면 비표시)
 * - title: 상단 제목(생략 시 route params로 대체)
 */
const props = defineProps({
  posts: { type: Array, default: () => [] },
  totalPages: { type: Number, default: 0 },
  title: { type: String, default: '' }
})

const route = useRoute()
const router = useRouter()

// URL 파라미터/쿼리
const category = computed(() => route.params.category ?? '')
const sort = computed(() => (route.query.sort === 'views' ? 'views' : 'latest'))
const currentPage = computed(() => {
  const p = parseInt(route.query.page ?? '0', 10)
  return Number.isNaN(p) ? 0 : Math.max(0, p)
})

// 제목: prop 우선, 없으면 카테고리에서 생성
const resolvedTitle = computed(() =>
  props.title || (decodeURIComponent(String(category.value)) || '카테고리')
)

// 라우팅 헬퍼 (같은 라우트 안에서 파라미터/쿼리 갱신)
function linkTo({ sort, page }) {
  return {
    name: 'study-category',
    params: { category: category.value },
    query: { sort, page }
  }
}

// sort 기본값 보정 (?sort 없을 때 latest로 세팅)
watch(
  () => route.query.sort,
  (v) => {
    if (!v) {
      router.replace(linkTo({ sort: 'latest', page: currentPage.value }))
    }
  },
  { immediate: true }
)

// 썸네일 기본 이미지 (public/images/default-thumb.png 사용)
const defaultThumb = '/images/default-thumb.png'
</script>

<style src="./CategoryPage.css"></style>
