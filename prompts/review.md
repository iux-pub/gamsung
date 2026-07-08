# 코드 리뷰 체크리스트 프롬프트 — KRDS+Tailwind v4

대상: 모든 AI (코드 리뷰 용도)

아래 체크리스트로 이 코드를 리뷰하라. 위반 항목을 구체적으로 지적하라.

## 검증 환경

- [ ] 프로젝트의 `package.json`, CI 설정, README에서 사용 가능한 `check`/`lint`/`build`/`test`/`a11y` 명령을 확인했는가
- [ ] infoUX 하네스(`scripts/check-violations.js`, `scripts/check-html-structure.js`)가 있으면 실행했는가
- [ ] 하네스가 없으면 변경 파일을 직접 스캔하고, 대체한 수동 검증 항목을 리뷰 결과에 명시했는가

## CSS 시스템 (R-03)

- [ ] **SCSS 사용 없음** — `.scss` 파일, `@use`, `@forward`, `$variable` 모두 0건
- [ ] CSS는 표준 CSS nesting과 Tailwind v4 `@apply` 사용 가능 (`.css` 파일, `@import "tailwindcss"`, CSS Custom Property)
- [ ] Tailwind v4 기본 팔레트 raw 컬러 유틸 없음
- [ ] Tailwind 기본 스케일이 프로젝트 기준과 충돌하지 않음 (`text-base`, `rounded-lg`, `shadow-md`, `z-10`, `sm:` 등은 사용하지 않음)

## BEM (R-04, R-05, R-06)

- [ ] 클래스명이 Block__Element--Modifier 패턴
- [ ] Element 2단계 중첩 0건
- [ ] Modifier에 `--` 사용 (`.btn-primary` 금지 → `.btn--primary`)
- [ ] 요소 선택자 의존 없음 (`.card h4` 금지 → `.card__title`)
- [ ] 시각적 modifier 없음 (`--blue`, `--gray`, `--large`(badge용 제외) 금지 → 의미적 이름)
- [ ] 옛 버튼 variant 이름 없음

## 토큰 (R-01)

- [ ] 하드코딩 색상 0건 (`#222`, `rgb(...)` 금지 → `var(--color-*)`)
- [ ] 색상 하드코딩 0건 (`#fff`, `rgb(...)`, `hsl(...)` 금지 → `var(--color-*)`)
- [ ] 공개 토큰은 색상(`--color-*`)과 기본 폰트(`--font-*`) 중심으로 유지
- [ ] 간격/크기/반경/그림자/모션/z-index는 CSS 또는 Tailwind 값으로 직접 관리
- [ ] 옛 시맨틱 토큰 0건

## CSS 규칙 (R-02, R-07)

- [ ] `!important` 사용 시 사유 주석 명시
- [ ] 인라인 `style="..."` 0건 (CSS 변수 주입 `style="--var: val"`은 허용)
- [ ] 선택자 깊이 3단계 이하

## ITCSS 5레이어

- [ ] 파일이 올바른 레이어에 위치 (컴포넌트 → `src/styles/6-components/`)
- [ ] `src/styles/6-components/index.css`에 `@import "./{name}.css"` 등록
- [ ] BEM은 5-objects, 6-components 레이어에만 적용

## HTML/마크업 (R-07~R-10)

- [ ] 큰 영역은 `header/main/footer`, `main` 안은 `section > .container` 구조
- [ ] HTML 컴포넌트화는 페이지 전체가 아니라 `main` 내부 section 단위
- [ ] `main` 직계 자식은 `section`이고, 각 `section`은 `.container`를 직접 포함
- [ ] 각 `section`은 heading 또는 `aria-labelledby`/`aria-label`로 접근 가능한 이름 제공
- [ ] `<img>`에 `alt` 속성 (장식용은 `alt=""`)
- [ ] 인터랙티브 요소에 `aria-label` 또는 텍스트 레이블
- [ ] `div`/`span` 클릭 핸들러 패턴 없음 — `<button>`/`<a>` 시맨틱 HTML 사용
- [ ] 폼 요소에 `<label for>` + `id` 연결

## 접근성 (R-11~R-14)

- [ ] `:focus-visible` 스타일 (또는 reset.css 전역 4px primary 외곽선 유지)
- [ ] `:focus { outline: none }` 0건
- [ ] 색상만으로 정보 전달하지 않음 (아이콘 또는 텍스트 병행)
- [ ] 색상 대비 4.5:1 이상 (큰 텍스트 24px/18.67px bold 3:1)
- [ ] `prefers-reduced-motion` 대응
- [ ] 터치 타겟 ≥ 44×44px (모바일 medium=48px 권장)
- [ ] `<a href="#main" class="skip-to-content">본문 바로가기</a>` 존재

## 반응형

- [ ] 모바일 퍼스트 작성 (기본 → tablet 768+ → pc 1280+)
- [ ] 단순 속성 변경은 `@apply tablet:*` / `@apply pc:*` 우선
- [ ] 직접 `@media`는 복잡한 중첩 선택자나 여러 하위 요소 동시 제어에만 사용
- [ ] 직접 `@media`는 관련 선택자 내부에 중첩되어 있고, 파일 하단에 브레이크포인트별로 몰려 있지 않음
- [ ] Tailwind 기본 브레이크포인트(`sm:`/`md:`/`lg:`/`xl:`/`2xl:`) 또는 `@media (min-width: var(--breakpoint-*))` 사용 없음
- [ ] 프로젝트의 rem 기준을 확인했는가. 기존 62.5% 기준 프로젝트는 유지, 신규 프로젝트는 팀 기준으로 결정

## 컴포넌트 카탈로그

- [ ] 기존 컴포넌트 카탈로그를 먼저 확인했는가
- [ ] 카탈로그 밖 패턴은 일회성 프로젝트 패턴인지, 공통 컴포넌트 후보인지 판단했는가
- [ ] 버튼은 KRDS 정의 4 variant (`--primary` `--secondary` `--tertiary` `--text`) × 5 size (`--xsmall` `--small` medium `--large` `--xlarge`) 안에 있음

## 코딩 스타일

- [ ] 들여쓰기 2 spaces
- [ ] 따옴표 single quote
- [ ] 세미콜론 — CSS 사용, JS/HTML 미사용
- [ ] 주석 한국어
