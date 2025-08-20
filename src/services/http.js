async function onSubmit () {
  if (!form.title || !form.category || !form.content) { 
    alert('모두 입력'); 
    return 
  }

  const fd = new FormData();
  fd.append('title', form.title);
  fd.append('category', form.category);
  fd.append('content', form.content);

  try {
    const res = await fetch('/save-posting', {
      method: 'POST',
      body: fd,
      credentials: 'include' // 세션 쿠키 필요하면 유지
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `서버 오류 (${res.status})`);
    }

    // 백엔드에서 redirect 응답을 줄 가능성이 있음
    // 프론트에서 직접 이동하려면 router.push() 사용
    router.push({
      name: 'study-category',
      params: { category: encodeURIComponent(form.category) },
      query: { sort: 'latest', page: 0 }
    });
  } catch (e) {
    alert(e.message || '작성 중 오류가 발생했습니다.');
  }
}
