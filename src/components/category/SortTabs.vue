<template>
  <div class="sort">
    <router-link
      :class="{ 'is-active': sort === 'latest' }"
      :to="{ name:'category', params:{ category }, query:{ sort:'latest', page } }"
    >최신순</router-link>
    <span>|</span>
    <router-link
      :class="{ 'is-active': sort === 'views' }"
      :to="{ name:'category', params:{ category }, query:{ sort:'views', page } }"
    >조회순</router-link>
  </div>
</template>

<script setup>
defineProps({
  category: { type: String, required: true },
  sort:     { type: String, required: true }, // 'latest' | 'views'
  page:     { type: Number, required: true },
})
</script>
