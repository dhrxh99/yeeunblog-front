// backup
import { computed } from 'vue'

export function usePaginatedPosts({ allPosts, category, sort, currentPage, pageSize = 9 }) {
  const filtered = computed(() =>
    allPosts.value.filter(p => String(p.category) === category.value)
  )

  const sorted = computed(() => {
    const list = [...filtered.value]
    if (sort.value === 'views') {
      list.sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
    } else {
      list.sort((a, b) => {
        const aa = a.createdAt ? new Date(a.createdAt).getTime() : a.id
        const bb = b.createdAt ? new Date(b.createdAt).getTime() : b.id
        return bb - aa
      })
    }
    return list
  })

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(sorted.value.length / pageSize))
  )

  const safePage = computed(() =>
    Math.min(Math.max(0, currentPage.value), totalPages.value - 1)
  )

  const pagedPosts = computed(() => {
    const start = safePage.value * pageSize
    return sorted.value.slice(start, start + pageSize)
  })

  return { pagedPosts, totalPages, safePage }
}
