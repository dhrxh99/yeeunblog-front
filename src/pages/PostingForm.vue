<template>
  <div class="card shadow-sm p-4">
    <!-- 제목 -->
    <div class="mb-3">
      <input 
        type="text" 
        class="form-control form-control-lg fw-bold"
        placeholder="제목을 입력하세요."
      />
    </div>

    <!-- 카테고리 + 이름 + 비밀번호 -->
    <div class="row g-2 align-items-center mb-3">
      <!-- 카테고리 선택 -->
      <div class="col-md-4">
        <select class="form-select">
          <option disabled selected>카테고리 선택</option>
          <option value="it">IT</option>
          <option value="japanese">일본어</option>
        </select>
      </div>

      <!-- 이름 입력 -->
      <div class="col-md-4">
        <input 
          type="text" 
          class="form-control"
          placeholder="이름"
        />
      </div>

      <!-- 비밀번호 입력 -->
      <div class="col-md-4">
        <input 
          type="password" 
          class="form-control"
          placeholder="비밀번호"
        />
      </div>
    </div>

    <!-- 본문 -->
    <div class="mb-3">
      <textarea 
        class="form-control" 
        rows="10" 
        placeholder="내용을 입력하세요."
      ></textarea>
    </div>

    <!-- 작성 버튼 -->
    <div class="text-end">
      <button class="btn btn-outline-dark">작성하기</button>
    </div>
  </div>
</template>
