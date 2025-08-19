<template>
  <aside class="sidebar">
    <div class="profile-card">
      <div class="avatar" aria-hidden="true"></div>
      <div class="nick">닉네임</div>
      <router-link class="mypage" to="/mypage">마이페이지</router-link>
    </div>

    <ul class="category-list">
      <li>· <router-link to="/study/it">IT</router-link></li>
      <li>· <router-link to="/study/일본어">일본어</router-link></li>
    </ul>
  </aside>
</template>
