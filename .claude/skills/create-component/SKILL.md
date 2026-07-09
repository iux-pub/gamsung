---
name: create-component
description: BEM 컴포넌트 일괄 생성. 컴포넌트명 입력 시 CSS + 스니펫 + playground HTML + site 문서 페이지를 생성한다. "컴포넌트 추가", "새 컴포넌트", "create component" 요청 시 사용.
---

# create-component

INFOUX 카탈로그를 먼저 확인한 뒤 재사용 가치가 있는 BEM 컴포넌트를 추가한다.

## 사전 판단

1. `skill/references/project-profiles.md`에서 사이트 유형을 판정한다.
2. `skill/references/krds-components.md`에서 기존 컴포넌트 조합으로 해결 가능한지 확인한다.
3. 신규 패턴이면 일회성 프로젝트 패턴인지 공통 컴포넌트 후보인지 사용자에게 보고한다.
4. 공통 컴포넌트로 확정된 경우에만 아래 파일을 생성한다.

## 생성 파일

| 파일 | 용도 |
|------|------|
| `src/styles/6-components/{name}.css` | Tailwind v4 + 표준 CSS nesting 스타일 |
| `src/snippets/{name}.md` | HTML, variant, 접근성, 키보드 동작 |
| `src/playground/{name}.html` | 브라우저 미리보기 |
| `site/components/{name}.md` | 문서 사이트 페이지 |

## CSS 기준

```css
/* {name} 컴포넌트 */
.{name} {
  @apply relative;
  color: var(--color-text);

  &__body {
    @apply flex flex-col;
    gap: 1.6rem;
  }

  &--selected {
    border-color: var(--color-border-primary);
  }

  @media (min-width: 1280px) {
    &__body {
      @apply flex-row;
    }
  }
}
```

- SCSS, `@use`, `@forward`, 믹스인을 사용하지 않는다.
- 레이아웃·정렬·표시 속성은 `@apply`를 우선한다.
- 색상은 `var(--color-*)`, 기본 폰트는 `var(--font-sans)`를 사용한다.
- 간격·크기·타이포·반경은 프로젝트 맥락의 직접값을 허용한다.
- 상태는 BEM modifier와 ARIA 속성을 함께 사용한다.
- 컴포넌트 파일을 `src/styles/6-components/index.css`에 `@import`한다.

## 마크업 기준

- root 태그와 ARIA는 `skill/references/html-semantics.md`를 따른다.
- 인터랙티브 요소는 `button`, `a`, native form control을 사용한다.
- 이미지 `alt`, 폼 label, 키보드 조작, 44px 터치 영역을 확인한다.
- 위젯은 WAI-ARIA APG 관계 속성과 연결 대상 id까지 작성한다.

## 검증

```bash
npm run check
npm run lint
npm run build
npm run test:unit
```

위반이나 기존 카탈로그와의 중복이 있으면 생성 완료로 보고하지 않는다.
