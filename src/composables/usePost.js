// backup
import { ref } from 'vue'

export function usePost({ id, router }) {
  // 목업 (나중에 API로 교체)
  const post = ref({
    id, title: '제목1', category: 'it',
    createdAt: '2025-08-16T12:34:00', viewCount: 123, content: '내용'
  })

  const removePost = () => {
    if (confirm('삭제하시겠습니까?')) {
      router.push({ name: 'category', params: { category: post.value.category }, query: { sort: 'latest', page: 0 }})
    }
  }

  return { post, removePost }
}
