# 사이드 패널 (Side Panel) — KRDS Help panel 응용

우측에서 슬라이드 인하는 보조 패널. 모달과 달리 본문 스크롤을 차단하지 않는다.

## 기본 마크업

```html
<aside class="side-panel" role="dialog" aria-labelledby="panel-title" aria-hidden="true">
  <header class="side-panel__header">
    <h2 id="panel-title" class="side-panel__title">상세 정보</h2>
    <button type="button" class="side-panel__close" aria-label="닫기">×</button>
  </header>
  <div class="side-panel__body">
    <p>패널 본문 내용</p>
  </div>
  <footer class="side-panel__footer">
    <button type="button" class="btn btn--tertiary">닫기</button>
    <button type="button" class="btn btn--primary">저장</button>
  </footer>
</aside>
```

## 사이즈

| 사이즈 | 클래스 | max-width |
|--------|--------|-----------|
| small | `.side-panel--small` | 360px |
| medium | (기본) | 480px |
| large | `.side-panel--large` | 640px |

## 동작 (JS)

- 열기: `panel.setAttribute('aria-hidden', 'false')` (또는 `.side-panel--open` 추가)
- 닫기: `panel.setAttribute('aria-hidden', 'true')`
- transform 트랜지션으로 슬라이드 인/아웃

## Modal vs Side Panel

| | Modal | Side Panel |
|---|-------|-----------|
| 위치 | 화면 중앙 | 화면 우측 (또는 좌측) |
| 본문 차단 | 차단 (overlay) | 차단 안 함 |
| 용도 | 결정 강제 (확인/취소) | 보조 정보, 편집 폼 |
| 그림자 | shadow-3 (deep) | shadow-2 (medium) |

## 접근성

- `role="dialog"` + `aria-labelledby`
- 닫기 버튼 `aria-label="닫기"` 필수
- ESC 키 닫기 권장
- 포커스 트랩은 선택 (모달과 달리 본문 인터랙션 허용)
- `aria-hidden` 토글로 스크린리더 노출 제어

## 출처

- Shadow: `--shadow-2` (KRDS help-panel-shadow 추상화)
- CSS: `src/styles/6-components/side-panel.css`
