# 퍼블리싱 규칙 프롬프트 — KRDS 원칙 + Tailwind v4

대상: Cursor, Copilot, Windsurf, Claude Code

이 규칙을 따라 HTML/CSS 코드를 생성하라.

## CSS 방법론: BEM + Tailwind v4 + ITCSS 5레이어

모든 컴포넌트 클래스명은 Block__Element--Modifier 패턴을 따른다 (5-objects, 6-components 레이어 한정).

```
.block-name { }
.block-name__element { }
.block-name--modifier { }
.block-name__element--modifier { }
```

금지: `.btn-primary`(→ `.btn--primary`), `.card-header`(→ `.card__header`), element 2단계 중첩(`.card__header__title` → `.card__title`).

**SCSS 사용 금지.** 표준 CSS nesting과 Tailwind v4 `@apply`/`@theme`/`@utility`는 허용한다 (R-03).

## CSS 구조: ITCSS 5레이어

```
src/styles/
  style.css                # @import "tailwindcss" + 토큰 + 레이어
  3-generic/               # 리셋
  4-elements/              # HTML 태그 베이스
  5-objects/               # 레이아웃 (BEM)
  6-components/            # KRDS 기반 UI 컴포넌트 (BEM)
  7-utilities/             # 유틸리티
```

옛 1-settings(토큰)는 `tokens/`로 분리, 2-tools(SCSS 믹스인)는 Tailwind utilities로 대체됐다.

## 토큰 사용

색상은 하드코딩 금지. CSS Custom Properties 사용:

- **INFOUX 공개 토큰**:
  - 색상: `var(--color-primary)`, `var(--color-text)`, `var(--color-bg)`, `var(--color-border)`
  - 폰트: `var(--font-sans)`, `var(--font-mono)`
  - 간격/크기/타이포 스케일/반경은 직접값 사용

- **시맨틱 색상 토큰**:
  - 색상: `var(--color-text)`, `--color-text-secondary`, `--color-text-disabled`, `--color-bg`, `--color-bg-secondary`, `--color-border`, `--color-primary` (KRDS 토큰을 가리킴)
  - 의미 기반 작성 시 권장

토큰 출처: `tokens/foundation.json` → `tokens/build/tokens.css`.

## 반응형: 모바일 퍼스트

- 모바일: 360px 기준 (기본)
- 태블릿: 768px 이상
- PC: 1280px+

단순 반응형 속성 변경은 CSS 파일 내부에서도 Tailwind v4 variant `tablet:` / `pc:`를 우선 사용한다.
복잡한 중첩 선택자나 여러 하위 요소를 동시에 제어해야 할 때만 `@media`를 사용한다.
Tailwind v4 variant는 `mobile:` / `tablet:` / `pc:`만 사용하고 `sm:` / `md:` / `lg:` / `xl:` / `2xl:`는 쓰지 않는다.

```css
.card {
  @apply p-[1.2rem] tablet:p-[2rem] pc:p-[3.2rem];
}
```

직접 `@media`가 필요한 경우 관련 선택자 내부에 중첩한다. 파일 하단에 브레이크포인트별 `@media` 블록을 몰아두지 않는다.

```css
.section {
  @apply grid gap-[2.4rem];

  @media (min-width: 1280px) {
    @apply grid-cols-2;
  }
}
```

순수 CSS `@media (min-width: var(--breakpoint-pc))`는 표준으로 쓰지 않는다. 직접 `@media`가 필요하면 `768px`, `1280px` 값을 명시한다.

## HTML 기본 골격

큰 영역은 단순하게 잡고, `main` 안은 `section > .container` 구조로 둔다. HTML 컴포넌트화는 페이지 전체가 아니라 `main` 내부 section 단위로 분리한다. 각 section은 `.container`를 직접 포함하고, heading 또는 `aria-labelledby`/`aria-label`로 접근 가능한 이름을 제공한다.

```html
<a href="#main" class="skip-to-content">본문 바로가기</a>

<header id="header" class="site-header">
  <div class="container">...</div>
</header>

<main id="main">
  <section class="section section--content" aria-labelledby="section-title">
    <div class="container">
      <h1 id="section-title">페이지 제목</h1>
      ...
    </div>
  </section>
</main>

<footer id="footer" class="site-footer">
  <div class="container">...</div>
</footer>
```

## 컴포넌트 (KRDS 기반)

기존 카탈로그 패턴을 우선 사용한다. 카탈로그 밖 패턴은 프로젝트 필요성과 공통화 가능성을 판단해 확장한다.

- A (폼/액션): btn, check-radio, file-upload, form, select, switch
- B (컨테이너): accordion, card, disclosure, modal, side-panel, tab
- C (내비): breadcrumb, header, main-menu, pagination
- D (피드백): alert, badge, progress, spinner, step-indicator, tag, toast, tooltip
- E (콘텐츠): calendar, carousel, list, table

각 컴포넌트의 마크업은 `src/snippets/{name}.md` 참조.

### 버튼 KRDS 정의

- Variant 4종: `--primary` `--secondary` `--tertiary` `--text`
- Size 5종: `--xsmall`(32) `--small`(40) medium(48, 클래스 없음=기본) `--large`(56) `--xlarge`(64)
- 옛 variant 금지: `--ghost`, `--outline`, `--link`, `--sm`, `--lg`, `--hero`
- 모바일 컨텍스트는 medium(48) 이상 권장 (xsmall/small은 44px 미만이라 모바일 부적합)

## 접근성: KWCAG/WCAG 2.1 AA

- `<img>`: alt 필수 (장식용은 `alt=""`)
- 인터랙티브 요소: `aria-label` 또는 텍스트 레이블 필수
- 색상 대비: 4.5:1 (큰 텍스트 24px/18.67px bold 3:1)
- 키보드 네비게이션 지원
- skip-to-content 링크: `<a href="#main" class="skip-to-content">본문 바로가기</a>`
- 포커스: `:focus-visible` 4px primary 외곽선 (reset.css 전역 — 컴포넌트에서 제거 금지)
- `!important` 금지 (사유 주석 시 허용), 인라인 스타일 금지 (CSS 변수 주입 `style="--var: val"`은 허용)
- `prefers-reduced-motion` 대응
- 터치 영역: 최소 44×44px (모바일 medium=48px 권장), 인접 요소 간격 8px 이상

## 레이아웃 크기 기준

| 영역 | 모바일 | 태블릿 | PC |
|------|--------|--------|-----|
| 헤더 높이 | 최소 56px | 최소 64px | 최소 100px |
| GNB 메뉴 폰트 | 14px | 16px | **18px 이상** |
| 컨테이너 max-width | 100% | 100% | 1200px |
| 컨테이너 패딩 | `2rem` | `3.2rem` | `4rem` |

## 코딩 스타일

- 들여쓰기: 2 spaces
- 따옴표: single quote
- 세미콜론: CSS 사용, JS/HTML 미사용
- 주석: 한국어
