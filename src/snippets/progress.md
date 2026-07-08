# 진행률 (Progress) — KRDS

native `<progress>` + 시각 커스텀.

## 기본 마크업

```html
<div class="progress">
  <div class="progress__label">
    <span>업로드 중</span>
    <span>60%</span>
  </div>
  <progress class="progress__bar" value="60" max="100" aria-label="업로드 진행률 60%">60%</progress>
</div>
```

## Variant

- 기본 (primary)
- `.progress--success` / `.progress--warning` / `.progress--danger`

## 접근성

- native `<progress>` 사용 — 자동 ARIA 처리
- `aria-label` 또는 `aria-labelledby`로 진행 항목 명시
- 무한 로딩(불확정 시간)은 `<progress>` 대신 `.spinner` 사용

## 출처

- CSS: `src/styles/6-components/progress.css`
