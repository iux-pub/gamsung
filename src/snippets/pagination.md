# 페이지네이션 (Pagination) — KRDS

목록을 여러 페이지로 나눠 탐색.

## 기본 마크업

```html
<nav class="pagination" aria-label="페이지 내비게이션">
  <button type="button" class="pagination__nav" aria-label="이전 페이지">‹</button>
  <ol class="pagination__list">
    <li><a class="pagination__item" href="?p=1">1</a></li>
    <li><a class="pagination__item pagination__item--current" href="?p=2" aria-current="page">2</a></li>
    <li><a class="pagination__item" href="?p=3">3</a></li>
    <li><a class="pagination__item" href="?p=4">4</a></li>
    <li><a class="pagination__item" href="?p=5">5</a></li>
  </ol>
  <button type="button" class="pagination__nav" aria-label="다음 페이지">›</button>
</nav>
```

## 사이즈

- `.pagination` — 48px (기본)
- `.pagination--small` — 40px

## 비활성 (첫/마지막 페이지)

```html
<button class="pagination__nav" aria-label="이전 페이지" aria-disabled="true" disabled>‹</button>
```

## 접근성

- `<nav aria-label="페이지 내비게이션">` 필수
- 현재 페이지: `aria-current="page"`
- 이전/다음 버튼: `aria-label="이전 페이지"` / `aria-label="다음 페이지"` 필수
- `aria-disabled="true"` + `disabled` 같이 사용 (첫/마지막 페이지)

## 출처

- CSS: `src/styles/6-components/pagination.css`
