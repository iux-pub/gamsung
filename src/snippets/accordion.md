# 아코디언 (Accordion) — KRDS

native `<details>`/`<summary>` 활용 — JS 없이 동작.

## 기본 마크업

```html
<div class="accordion">
  <details class="accordion__item">
    <summary class="accordion__summary">자주 묻는 질문 1</summary>
    <div class="accordion__panel">
      <p>답변 1 내용</p>
    </div>
  </details>
  <details class="accordion__item">
    <summary class="accordion__summary">자주 묻는 질문 2</summary>
    <div class="accordion__panel">
      <p>답변 2 내용</p>
    </div>
  </details>
  <details class="accordion__item" open>
    <summary class="accordion__summary">기본 열린 항목</summary>
    <div class="accordion__panel">
      <p><code>open</code> 속성으로 초기 열림 상태</p>
    </div>
  </details>
</div>
```

## 단일 열림 (한 번에 하나만)

`<details name="group">`을 같은 `name`으로 묶으면 한 번에 하나만 열림 (모던 브라우저).

```html
<div class="accordion">
  <details class="accordion__item" name="faq"><summary class="accordion__summary">Q1</summary>...</details>
  <details class="accordion__item" name="faq"><summary class="accordion__summary">Q2</summary>...</details>
</div>
```

## 접근성

- native `<details>`/`<summary>` 사용 시 키보드/스크린리더 자동 지원
- `<summary>`는 자동으로 button role + aria-expanded 처리됨 — 별도 ARIA 불필요
- 최소 터치 영역 보장: `--touch-target-min` (44px)

## 출처

- CSS: `src/styles/6-components/accordion.css`
