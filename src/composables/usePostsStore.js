// backup2
import { ref } from 'vue'

const postsRef = ref([])

export function usePostsStore() {
  const posts = postsRef
  const setPosts = (arr) => { postsRef.value = Array.isArray(arr) ? arr : [] }
  const getById = (id) => postsRef.value.find(p => String(p.id) === String(id))
  return { posts, setPosts, getById }
}
