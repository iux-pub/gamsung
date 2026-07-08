# 툴팁 (Tooltip) — KRDS

짧은 보조 설명 팝업. **JS 트리거 변형 권장** (키보드/터치 호환).

## 기본 마크업 (JS 변형)

```html
<button type="button" class="tooltip-trigger" aria-describedby="tip-1">
  도움말
</button>
<div id="tip-1" class="tooltip" role="tooltip" hidden>
  도움말 설명 텍스트
</div>
```

JS: focus/mouseenter 시 `tooltip.removeAttribute('hidden')`, blur/mouseleave 시 `setAttribute('hidden', '')`.

## CSS-only hover 변형 (단순 케이스)

```html
<span class="tooltip-wrap">
  <button type="button" aria-label="도움말">?</button>
  <span class="tooltip" role="tooltip">설명 텍스트</span>
</span>
```

> 키보드 사용자는 호버할 수 없으므로 중요 정보는 JS 변형 사용.

## 접근성

- 트리거에 `aria-describedby="툴팁id"` 연결
- 툴팁에 `role="tooltip"` 필수
- ESC로 닫기 가능 (JS 처리)
- 툴팁은 hover/focus 양쪽으로 트리거 가능해야 함 (WCAG 1.4.13)

## 출처

- CSS: `src/styles/6-components/tooltip.css`
