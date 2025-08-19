// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import PostDetail from '@/pages/PostDetail.vue'
import PostingForm from '@/pages/PostingForm.vue'

const CategoryPage = () => import('@/pages/CategoryPage.vue')
const PostEdit = () => import('@/pages/PostEdit.vue')

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage, props: route => ({ }) },
    { path: '/study/:category', name: 'study-category', component: CategoryPage },
    { path: '/posting', name: 'posting', component: PostingForm }, 
    { path: '/post/:id', name: 'post', component: PostDetail, props: true },
    { path: '/post/:id/edit', name: 'post-edit', component: PostEdit },
    { path: '/:pathMatch(.*)*', redirect: '/'}
  ]
})
