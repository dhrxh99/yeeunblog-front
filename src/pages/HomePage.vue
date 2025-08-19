<template>
  <div class="layout">
    <!-- TopBar -->
    <header class="topbar">
      <button class="home-btn">홈버튼</button>
      <h1 class="blog-title">Welcome to my Blog</h1>
    </header>

    <main class="content">
      <!-- SideBar -->
      <aside class="sidebar">
        <div class="profile">
          <div class="avatar">●</div>
          <p class="nickname">닉네임</p>
          <a href="#">마이페이지</a>
        </div>
        <ul class="categories">
          <li>· IT</li>
          <li>· 일본어</li>
        </ul>
      </aside>

      <!-- Post Section -->
      <section class="post-section">
        <div class="post-header">
          <h2>전체 게시글</h2>
          <div class="post-tools">
            <span>최신순 | 조회순</span>
            <button class="write-btn">✏️</button>
          </div>
        </div>

        <div class="post-grid">
          <div class="post-card" v-for="n in 6" :key="n">
            <div class="img">.img</div>
            <div class="title">제목{{ n }}</div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
// 특별한 로직 없음 (추후 API 연결 예정)
</script>

<style src="../assets/css/blog.css"></style>
<style src="../assets/css/HomePage.css"></style>