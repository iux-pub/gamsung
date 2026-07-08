# 모달 (Modal / Dialog) — KRDS

## 기본 마크업

```html
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
  <div class="modal__overlay"></div>
  <div class="modal__content modal__content--medium">
    <header class="modal__header">
      <h2 id="modal-title" class="modal__title">제목</h2>
      <button type="button" class="modal__close" aria-label="닫기">×</button>
    </header>
    <div class="modal__body">
      <p>모달 본문 내용</p>
    </div>
    <footer class="modal__footer">
      <button type="button" class="btn btn--tertiary">취소</button>
      <button type="button" class="btn btn--primary">확인</button>
    </footer>
  </div>
</div>
```

## 사이즈

| 사이즈 | 클래스 | max-width |
|--------|--------|-----------|
| small | `.modal__content--small` | 400px |
| medium | (기본) | 560px |
| large | `.modal__content--large` | 800px |
| xlarge | `.modal__content--xlarge` | 1000px |

## 동작 (JS — 별도 구현)

- 열기: `modal.removeAttribute('hidden')` + 포커스를 모달 내부 첫 요소로 이동
- 닫기: `modal.setAttribute('hidden', '')` + 포커스를 트리거 버튼으로 복귀
- ESC 키 닫기, overlay 클릭 닫기, Tab 트랩 (포커스 가두기)
- 열려 있는 동안 `<body>`에 `overflow: hidden` 적용

## 접근성 (KRDS + WAI-ARIA)

- `role="dialog"` + `aria-modal="true"` 필수
- `aria-labelledby="제목id"`로 모달 제목 연결 (또는 `aria-label`)
- 본문 설명이 길면 `aria-describedby`도 추가
- 닫기 버튼은 `aria-label="닫기"` 필수
- 첫 포커스는 모달 내부 첫 인터랙티브 요소 (또는 닫기 버튼)
- ESC 키로 닫기 가능
- 백드롭은 `--color-bg-dim`

## 출처

- Shape 값은 프로젝트 밀도에 맞는 CSS/Tailwind 직접값 사용
- Shadow: `--shadow-3` (KRDS modal-wrap-shadow 추상화)
- CSS: `src/styles/6-components/modal.css`
