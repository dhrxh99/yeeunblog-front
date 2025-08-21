<template>
  <div>
    <!-- 상단바 -->
    <TopBar />

    <!-- 본문 (가운데 정렬된 고정 폭) -->
    <div class="container" style="padding-top: 100px;">
      <div class="row justify-content-center align-items-start">
        <!-- 사이드바 -->
          <SideBar />
        <!-- 메인 콘텐츠 -->
        <div class="col-9">
          <main class="content">
            <router-view />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopBar from './components/site/TopBar.vue'
import SideBar from './components/site/SideBar.vue'
</script>
