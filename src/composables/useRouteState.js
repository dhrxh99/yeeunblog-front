// backup2
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useRouteState() {
  const route = useRoute()
  const category = computed(() => String(route.params.category ?? ''))
  const sort = computed(() => (route.query.sort === 'views' ? 'views' : 'latest'))
  const currentPage = computed(() => {
    const raw = Number(route.query.page ?? 0)
    return Number.isFinite(raw) && raw >= 0 ? raw : 0
  })
  return { route, category, sort, currentPage }
}
