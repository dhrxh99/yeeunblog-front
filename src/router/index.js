// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import PostDetail from '@/pages/PostDetail.vue'
import PostingForm from '@/pages/PostingForm.vue'
import CategoryPage from '@/pages/CategoryPage.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage},
    { path: '/study/:category', component: CategoryPage, props:true },
    { path: '/posting', component: PostingForm }, 
    { path: '/posting/:postId', component: PostingForm },
    { path: '/post/:id', component: PostDetail, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/'}
  ]
})