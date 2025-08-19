<!-- src/views/Home.vue -->
<template>
  <main class="content">
    <div class="content__head">
      <h2 class="page-title">전체 게시글</h2>

      <div class="sort-write">
        <div class="sort">
          <router-link
            :class="{ 'is-active': sort === 'latest' }"
            :to="{ path: '/', query: { sort: 'latest' } }"
          >최신순</router-link>
          <span>|</span>
          <router-link
            :class="{ 'is-active': sort === 'views' }"
            :to="{ path: '/', query: { sort: 'views' } }"
          >조회순</router-link>
        </div>

        <router-link class="write-icon" :to="{ path: '/posting' }" aria-label="작성 아이콘">
          ✎
        </router-link>
      </div>
    </div>

    <!-- 플래시 메시지 -->
    <div class="flash" v-if="message">{{ message }}</div>
    <div class="flash flash--error" v-if="error">{{ error }}</div>

    <!-- 카드 그리드 (최대 6개) -->
    <section class="grid">
      <router-link
        class="card"
        v-for="p in posts"
        :key="p.id"
        :to="`/post/${p.id}`"
      >
        <div class="card__img">.img</div>
        <div class="card__title">{{ p.title }}</div>
      </router-link>

      <!-- 텅 비었을 때 -->
      <div class="empty" v-if="posts.length === 0">게시글이 없습니다.</div>
    </section>

    <!-- 홈은 고정 1페이지 표시 -->
    <div class="pagination pagination--home">
      <span>&lt;</span>
      <span>1 / 1</span>
      <span>&gt;</span>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 정렬 쿼리(최신순/조회순)
const sort = computed(() => route.query.sort ?? 'latest')

// 플래시 메시지(필요 시 쿼리로 받거나 전역상태로 대체 가능)
const message = computed(() => route.query.message ?? '')
const error   = computed(() => route.query.error ?? '')

// 목록(목업) — 나중에 API로 교체
const posts = ref([])

onMounted(() => {
  // TODO: 실제 연동 시 /api/posts?sort=latest&page=0&size=6 같은 형태로 교체
  posts.value = [
    { id: 1, title: '샘플 글 1' },
    { id: 2, title: '샘플 글 2' },
    { id: 3, title: '샘플 글 3' },
  ]
})
</script>
