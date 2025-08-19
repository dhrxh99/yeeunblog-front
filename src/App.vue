<template>
  <div class="page">
    <TopBar />
    <SideBar />
    <main class="content">...</main>
    <router-view />
  </div>
</template>

<script setup>
import TopBar from './components/site/TopBar.vue'
import SideBar from './components/site/SideBar.vue'
</script>