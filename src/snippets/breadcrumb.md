# 브레드크럼 (Breadcrumb) — KRDS

페이지 경로 표시. 사용자의 현재 위치를 보여주고 상위 페이지로 빠르게 이동할 수 있게 한다.

## 기본 마크업

```html
<nav class="breadcrumb" aria-label="페이지 경로">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item"><a href="/">홈</a></li>
    <li class="breadcrumb__item"><a href="/services">서비스</a></li>
    <li class="breadcrumb__item" aria-current="page">신청하기</li>
  </ol>
</nav>
```

## 접근성

- `<nav aria-label="페이지 경로">` 필수 (스크린리더용 식별자)
- `<ol>` 사용 — 순서가 의미를 가짐
- 현재 페이지: `aria-current="page"` + `<a>` 없이 텍스트만 (링크 아님)
- 구분자(`›`)는 CSS `::before`로 그려서 스크린리더에 노출 안 됨 (불필요한 읽기 방지)

## 출처

- CSS: `src/styles/6-components/breadcrumb.css`
