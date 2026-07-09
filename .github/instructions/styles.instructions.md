---
applyTo: "src/styles/**/*.css"
---

기존 ITCSS 레이어와 컴포넌트를 우선 재사용한다. 레이아웃·정렬은 Tailwind v4 `@apply`, 색상은 `var(--color-*)`, 상태는 의미 기반 BEM modifier를 사용한다. SCSS, raw 색상, `.is-*`/`.has-*`, 시각적 modifier, 핵심 CSS의 `:has()`는 금지한다.
