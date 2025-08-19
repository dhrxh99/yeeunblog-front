<template>
  <Topbar />
  <div class="page">
    <Sidebar />
    <router-view />
  </div>
</template>

<script setup>
import Topbar from './components/Topbar.vue'
import Sidebar from './components/Sidebar.vue'
</script>