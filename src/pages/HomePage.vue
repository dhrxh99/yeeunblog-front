<template>
  <div class="container">
    <div class="row">
      <!-- Main Content -->
      <main >
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="h4">전체 게시글</h2>
          <div class="d-flex align-items-center">
            <span class="me-4 small">최신순 | 조회순</span>
              <RouterLink to="/posting" class="d-flex align-items-center">
              <img :src='postingIcon' alt="" style="width:40px; height:40px; margin-right:8px; margin-left:1px;">
              </RouterLink>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-md-4" v-for="n in 6" :key="n">
            <div class="card h-100">
              <div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height:120px;">
                .img
              </div>
              <div class="card-body text-center">
                <h5 class="card-title">제목 {{ n }}</h5>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import postingIcon from '@/assets/images/postingButton.png'
</script>