# 배지 (Badge) — KRDS

작은 알림 표시기 (카운트 / 상태 / 새 항목).

## 기본 마크업

```html
<!-- 숫자 배지 -->
<button class="btn btn--text">
  알림 <span class="badge">3</span>
</button>

<!-- 점만 (dot 변형) -->
<span class="badge badge--dot" aria-label="새 알림 있음"></span>
```

## Variant

- `.badge` (기본 — danger 빨강) / `.badge--primary` / `.badge--info` / `.badge--success` / `.badge--warning` / `.badge--gray`
- `.badge--dot` — 숫자 없는 단순 점 (8×8)

## 접근성

- 숫자 배지: 텍스트로 의미 전달됨 (별도 ARIA 불필요)
- Dot 배지: 시각만 — `aria-label="새 알림 있음"` 필수

## 출처

- CSS: `src/styles/6-components/badge.css`
