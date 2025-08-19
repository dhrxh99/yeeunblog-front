<template>
  <div class="pagination">
    <router-link
      :class="{ 'is-disabled': currentPage === 0 }"
      :to="{ name:'category', params:{ category }, query:{ sort, page: Math.max(0, currentPage - 1) } }"
    >&lt;</router-link>

    <span>{{ currentPage + 1 }} / {{ totalPages }}</span>

    <router-link
      :class="{ 'is-disabled': currentPage + 1 === totalPages }"
      :to="{ name:'category', params:{ category }, query:{ sort, page: Math.min(totalPages - 1, currentPage + 1) } }"
    >&gt;</router-link>
  </div>
</template>

<script setup>
defineProps({
  category:    { type: String, required: true },
  sort:        { type: String, required: true },
  currentPage: { type: Number, required: true },
  totalPages:  { type: Number, required: true },
})
</script>
