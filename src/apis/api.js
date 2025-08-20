// src/apis/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'  // 공통 주소
})

export const getPosts = () => api.get('/posts')
export const getPostById = (id) => api.get(`/posts/${id}`)
export const createPost = (post) => api.post('/posts', post)
export const deletePost = (id) => api.delete(`/posts/${id}`)
