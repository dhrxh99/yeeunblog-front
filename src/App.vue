<template>
  <Topbar />
  <div class="page">
    <Sidebar />
    <router-view />
  </div>
</template>

<script setup>
import Topbar from './components/site/TopBar.vue'
import Sidebar from './components/site/SideBar.vue'
</script>