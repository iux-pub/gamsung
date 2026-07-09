# CSS Scope

1. 기존 ITCSS 레이어와 컴포넌트를 먼저 재사용한다.
2. 5-objects와 6-components에서 BEM을 사용하고 element를 평탄화한다.
3. 레이아웃·정렬·표시는 Tailwind v4 `@apply`를 우선한다.
4. 색상은 `var(--color-*)`, 기본 폰트는 `var(--font-sans)`를 사용한다.
5. SCSS, raw 색상, 비-BEM 상태 클래스, 시각적 modifier, 핵심 CSS의 `:has()`를 사용하지 않는다.
6. 상태 스타일은 대응하는 ARIA 상태와 함께 설계한다.
7. 새 컴포넌트는 `.agents/skills/create-component/SKILL.md` 절차를 따른다.
