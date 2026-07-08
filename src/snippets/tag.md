# 태그 (Tag) — KRDS

카테고리, 필터, 속성 라벨.

## 기본 마크업

```html
<!-- 정적 태그 -->
<span class="tag">기본</span>

<!-- 클릭 가능 (필터 등) -->
<button type="button" class="tag tag--primary">선택됨</button>

<!-- 제거 가능 (선택된 필터) -->
<span class="tag tag--info">
  카테고리: 디자인
  <button type="button" class="tag__close" aria-label="카테고리: 디자인 제거">×</button>
</span>

<!-- 링크형 -->
<a class="tag tag--success" href="?category=ui">UI</a>
```

## Variant

- 기본 (회색 outline)
- 시맨틱: `.tag--primary` / `.tag--info` / `.tag--success` / `.tag--warning` / `.tag--danger`

## 사이즈

- `.tag--small` (20px)
- 기본 (24px)
- `.tag--large` (32px)

## 접근성

- 제거 버튼은 `aria-label="태그명 제거"` 형식으로 컨텍스트 명시
- 클릭 가능 태그는 `<button>` 또는 `<a>` 사용 (div onclick 금지)

## 출처

- CSS: `src/styles/6-components/tag.css`
