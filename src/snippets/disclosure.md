# 디스클로저 (Disclosure) — KRDS

단일 "더보기/접기" 토글. Accordion(다중 그룹)과 달리 단독 토글에 사용.

## 기본 마크업

```html
<button type="button" class="disclosure" aria-expanded="false" aria-controls="more-info">
  자세히 보기
</button>
<div id="more-info" class="disclosure__panel" hidden>
  <p>접혀 있던 추가 정보</p>
</div>
```

## 동작 (JS — 별도 구현)

```js
const trigger = document.querySelector('.disclosure')
const panel = document.getElementById(trigger.getAttribute('aria-controls'))
trigger.addEventListener('click', () => {
  const expanded = trigger.getAttribute('aria-expanded') === 'true'
  trigger.setAttribute('aria-expanded', !expanded)
  panel.hidden = expanded
})
```

## Accordion vs Disclosure

| | Accordion | Disclosure |
|---|-----------|-----------|
| 용도 | FAQ, 그룹화된 다중 항목 | 단일 "더보기" 토글 |
| 구조 | `<details>` 그룹 | `<button>` + 패널 |
| 시각 | 아이템 사이 구분선 | 인라인 버튼 |

## 접근성

- `aria-expanded` 상태값 필수 (열림/닫힘)
- `aria-controls`로 패널 id 연결
- 패널 `hidden` 속성 또는 CSS `display: none` 사용 (레이아웃에서 완전 제거)

## 출처

- CSS: `src/styles/6-components/disclosure.css`
