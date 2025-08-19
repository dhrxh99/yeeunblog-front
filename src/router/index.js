// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/study/:category', name: 'category', component: () => import('../views/Category.vue'), props: true},
    { path: '/post/:id', name: 'postDetail', component: () => import('../views/PostDetail.vue'), props: true},
    { path: '/posting', name: 'posting', component: () => import('../views/PostEditor.vue') },
    { path: '/post/:id/edit', name: 'postEdit', component: () => import('../views/PostEditor.vue'), props: true },

    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
