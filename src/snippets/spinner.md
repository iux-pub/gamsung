# 스피너 (Spinner) — KRDS

로딩 표시기. 진행 시간을 알 수 없을 때 사용.

## 기본 마크업

```html
<span class="spinner" role="status" aria-label="로딩 중"></span>
```

## 사이즈

- `.spinner--small` (16×16)
- 기본 (24×24)
- `.spinner--large` (40×40)

## 접근성

- `role="status"` + `aria-label="로딩 중"` 필수
- `prefers-reduced-motion: reduce` 자동 대응 (회전 속도 절반으로)

## 출처

- CSS: `src/styles/6-components/spinner.css`
