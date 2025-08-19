// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import PostDetail from '@/pages/PostDetail.vue'
import PostingForm from '@/pages/PostingForm.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage, props: route => ({ /* posts는 상위/스토어에서 주입 */ }) },
    { path: '/study/:category', name: 'study-category', component: CategoryPage },
    { path: '/posting', name: 'posting', component: PostingForm }, 
    { path: '/post/:id', name: 'post', component: PostDetail, props: true },
    { path: '/post/:id/edit', name: 'post-edit', component: PostEdit }
  ]
})
