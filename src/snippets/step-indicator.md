# 단계 표시기 (Step Indicator) — KRDS

다단계 폼/프로세스의 현재 단계 표시.

## 기본 마크업

```html
<ol class="step-indicator" aria-label="진행 단계">
  <li class="step-indicator__item step-indicator__item--done">
    <span class="step-indicator__num" aria-hidden="true">1</span>
    <span class="step-indicator__label">정보 입력</span>
  </li>
  <li class="step-indicator__item step-indicator__item--current" aria-current="step">
    <span class="step-indicator__num" aria-hidden="true">2</span>
    <span class="step-indicator__label">확인</span>
  </li>
  <li class="step-indicator__item">
    <span class="step-indicator__num" aria-hidden="true">3</span>
    <span class="step-indicator__label">완료</span>
  </li>
</ol>
```

## 상태 클래스

- `.step-indicator__item--done` — 완료 (primary 채움)
- `.step-indicator__item--current` — 현재 (primary 테두리)
- (없음) — 예정 (회색)

## 접근성

- `<ol>` 사용 — 순서 의미 보존
- 현재 단계: `aria-current="step"`
- 번호는 시각만 — `aria-hidden="true"` (레이블이 텍스트로 의미 전달)

## 출처

- CSS: `src/styles/6-components/step-indicator.css`
