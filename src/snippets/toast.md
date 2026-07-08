# 토스트 (Toast) — KRDS

일시적 피드백 메시지. 화면 우측 상단/하단에 잠시 노출 후 자동 사라짐.

## 기본 마크업

```html
<div class="toast-stack">
  <div class="toast toast--success" role="status">
    <span class="toast__icon" aria-hidden="true">✓</span>
    <p class="toast__message">저장되었습니다</p>
    <button type="button" class="toast__close" aria-label="닫기">×</button>
  </div>
</div>
```

## 위치

- `.toast-stack` (기본) — 우측 상단
- `.toast-stack--bottom` — 우측 하단

## Variant

- `.toast--info` / `.toast--success` / `.toast--warning` / `.toast--danger`

## 동작 (JS)

- 보통 3~5초 후 자동 닫기 (사용자 액션 결과 통보)
- 사용자가 닫기 버튼으로 즉시 닫기 가능
- 다중 토스트는 위에서 아래로 누적

## Alert vs Toast 사용 기준

| | Alert | Toast |
|---|-------|-------|
| 위치 | 페이지 인라인 | 화면 고정 |
| 지속시간 | 사용자가 닫을 때까지 | 자동 사라짐 |
| 용도 | 페이지 컨텍스트 알림 | 즉시 피드백 (저장 완료 등) |

## 접근성

- `role="status"` + `aria-live="polite"` (스크린리더 정중 안내)
- 위급 시에만 `role="alert"` + `aria-live="assertive"`
- 자동 닫힘 토스트도 사용자 옵션으로 일시정지/지속 가능해야 함 (WCAG 2.2.1)

## 출처

- CSS: `src/styles/6-components/toast.css`
