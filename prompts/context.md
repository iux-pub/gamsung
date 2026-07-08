# INFOMIND UX 팀 규칙 — KRDS 원칙 + Tailwind v4 (압축 버전)

대상: ChatGPT, Gemini, Claude 웹 — 시스템 프롬프트 또는 첫 메시지로 주입

---

CSS: BEM(Block__Element--Modifier) + Tailwind v4 + ITCSS 5레이어(3-generic/4-elements/5-objects/6-components/7-utilities). **SCSS 사용 금지.** 표준 CSS nesting과 Tailwind v4 `@apply`/`@theme`/`@utility`는 허용.

토큰: 색상은 `var(--color-*)`를 강제한다. 기본 폰트는 `var(--font-sans)`/`var(--font-mono)`를 사용한다. 간격/크기/타이포 스케일은 CMS·관리자 화면처럼 정보 밀도가 중요한 프로젝트 맥락에 맞게 CSS/Tailwind 직접값을 사용한다. 토큰 출처는 `tokens/foundation.json` → `tokens/build/tokens.css`.

반응형: 모바일 퍼스트. 브레이크포인트는 360 / 768 / 1280만 사용한다. 단순 속성 변경은 CSS에서도 `@apply tablet:*` / `@apply pc:*`를 우선하고, 복잡한 중첩 선택자나 여러 하위 요소 동시 제어만 관련 선택자 내부 중첩 `@media`로 작성한다. 파일 하단에 `@media`를 몰아두지 않는다.

컴포넌트는 기존 카탈로그 패턴을 우선 사용한다. 카탈로그 밖 패턴은 프로젝트 필요성과 공통화 가능성을 판단해 확장한다.

HTML 기본 골격은 큰 영역을 심플하게 잡고, `main` 안은 `section > .container` 구조로 둔다. HTML 컴포넌트화는 페이지 전체가 아니라 `main` 내부의 section 단위로 분리한다. 각 section은 `.container`를 직접 포함하고, heading 또는 `aria-labelledby`/`aria-label`로 접근 가능한 이름을 제공한다.

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

버튼 KRDS variant(4종): `--primary` `--secondary` `--tertiary` `--text`. KRDS size(5종): `--xsmall`(32) `--small`(40) medium(48, 기본) `--large`(56) `--xlarge`(64). 모바일은 medium 이상 권장.

접근성 (KWCAG/WCAG 2.1 AA): 대비 4.5:1 (큰 텍스트 3:1), 터치 ≥44×44px (모바일 medium=48px 권장), `:focus-visible` (reset.css 전역 4px primary 외곽선 — 컴포넌트에서 제거 금지), skip-to-content 필수, `<img alt>` 필수, `<label for>+id` 필수, `div/span 클릭 핸들러 패턴` 금지.

하네스 없는 프로젝트의 자체 검증: 개발팀 기존 프로젝트처럼 infoUX 전용 `npm run check`, `scripts/check-violations.js`, `scripts/check-html-structure.js`가 없어도 검증을 생략하지 않는다. 먼저 프로젝트의 `package.json`, CI 설정, README에서 기존 `lint`/`build`/`test`/`a11y` 명령을 찾아 실행한다. 자동 하네스가 없으면 변경 파일을 직접 점검한다: raw 색상, Tailwind raw 컬러, SCSS 문법, `!important`, 핵심 CSS `:has()`, focus outline 제거, BEM 위반, 비-BEM 상태 클래스, 시각적 modifier, `div/span` 클릭, `alt`/`label`/ARIA 누락, skip link/page shell, 모바일 360px 터치 영역과 overflow. 최종 보고에는 자동 검증, 수동 대체 검증, 남은 수동 QA 항목을 구분해 적는다.

절대 금지: SCSS 파일/`@use`/`@forward`/SCSS 변수, raw hex/rgb/hsl 색상, Tailwind 기본 팔레트 raw 컬러, 옛 버튼 variant(`--ghost`/`--outline`/`--link`/`--sm`/`--lg`), `!important` (사유 주석 없을 시), 인라인 `style="..."` (CSS 변수 주입 외), BEM element 2단계 중첩(`.card__body__title`), 기존 인포마인드 HTML 골격을 무시한 임의 구조.

코딩: 2 spaces, single quote, 한국어 주석. 세미콜론 — CSS 사용, JS/HTML 미사용.

폰트: KRDS 표준 — Pretendard GOV → SUIT-V → Apple SD Gothic Neo → Malgun Gothic → sans-serif.
