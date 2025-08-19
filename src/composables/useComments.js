// backup
import { ref, computed } from 'vue'
import http from '@/services/http'

function buildTree(list) {
  const map = new Map()
  console.log(list);
  console.log(map);
  list.forEach(n => { map.set(n.id, { ...n, children: [] }) })
  const roots = []
  list.forEach(n => {
    const node = map.get(n.id)
    if (n.parentId) map.get(n.parentId)?.children.push(node)
    else roots.push(node)
  })
  return roots
}

export function useComments({ postId }) {
  const flat = ref([])

  const load = async (pid = postId?.value ?? postId) => {
    const { data } = await http.get(`/posts/${pid}/comments`)
    setInitial(data)
  }

  const commentsTree = computed(() => buildTree(flat.value))
  const nextId = () => Math.max(0, ...flat.value.map(c => c.id)) + 1

  // CRUD
  const saveNew = (text) => {
    flat.value.push({ id: nextId(), parentId:null, author:`익명${nextId()}`, content:text, createdAt:new Date().toISOString(), depth:0 })
  }

  const saveEdit = ({ id, text }) => {
    const c = flat.value.find(c => c.id === id)
    if (c) c.content = text
    clearFlag(id, '_editing')
  }

  const editComment = (id) => {
    // UI 토글은 트리 노드에 _editing 플래그로 (렌더 시 반영)
    toggleFlag(id, '_editing')
  }

  const removeComment = (id) => {
    const ids = collectWithChildren(id)
    flat.value = flat.value.filter(c => !ids.has(c.id))
  }

  const replyTo = (id) => toggleFlag(id, '_replying')

  const saveReply = ({ parentId, text }) => {
    const parent = flat.value.find(c => c.id === parentId)
    const depth = parent ? (parent.depth ?? 0) + 1 : 0
    flat.value.push({ id: nextId(), parentId, author:`익명${nextId()}`, content:text, createdAt:new Date().toISOString(), depth })
    clearFlag(parentId, '_replying')
  }

  const setInitial = (arr = []) => {
    flat.value = Array.isArray(arr) ? arr : []
  }



  // ------- 내부 유틸(플래그 & 자식 수집) -------
  function toggleFlag(id, key) {
    // 렌더된 트리 노드에 반영하려면 간단히 flat에 가상 플래그 두고,
    // CommentItem에서 node._editing / _replying을 사용
    const node = flat.value.find(c => c.id === id)
    if (!node) return
    node[key] = !node[key]
    // 반대 플래그는 끄기 (동시에 둘 켜지지 않게)
    if (key === '_editing') node._replying = false
    if (key === '_replying') node._editing = false
    // 트리 재계산 유도
    flat.value = [...flat.value]
  }

  function clearFlag(id, key) {
    const node = flat.value.find(c => c.id === id)
    if (node) { node[key] = false; flat.value = [...flat.value] }
  }

  function collectWithChildren(rootId) {
    const set = new Set([rootId])
    let changed = true
    while (changed) {
      changed = false
      for (const c of flat.value) {
        if (c.parentId && set.has(c.parentId) && !set.has(c.id)) { set.add(c.id); changed = true }
      }
    }
    return set
  }

  return { commentsTree, saveNew, editComment, saveEdit, removeComment, replyTo, saveReply, setInitial, load }
}
