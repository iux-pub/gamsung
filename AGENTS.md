# AGENTS.md — INFOMIND UX Starter

이 프로젝트에서 UI, CSS, HTML, 접근성 작업을 할 때는 `CLAUDE.md`와 `.claude/skills/info-design/SKILL.md`를 기준으로 한다.

## 예방형 작업 순서

1. `contracts/task-contract.md` 형식으로 사이트 유형, 핵심 과업, 페이지 패턴, 재사용 컴포넌트, 인터랙티브 위젯과 예외를 먼저 선언한다.
2. `.agents/skills` 또는 `.claude/skills`에서 작업에 맞는 스킬을 적용한다.
3. 수정 파일과 가장 가까운 `AGENTS.md`를 읽는다.
4. 기존 컴포넌트와 승인 패턴을 조합해 구현한다.
5. 검사는 설계를 대신하지 않는 마지막 안전망으로 실행한다.

Task Contract의 필수 판단이 비어 있으면 UI 구현을 시작하지 않는다.

## 작업 전 판단

- 화면을 만들기 전에 사이트 유형을 먼저 판정한다: 일반사이트, 공공서비스, 공공기관, CMS·관리자, 커머스·예약.
- 정부 상징, 공식 배너, 운영기관 식별자, 공공 푸터 링크는 적용 대상이 확인된 경우에만 생성한다.
- 일반사이트, CMS·관리자, 커머스·예약 프로젝트에서는 KRDS의 접근성, 시맨틱 구조, 컴포넌트 패턴을 참고하되 정부 아이덴티티 요소는 만들지 않는다.

## CSS/HTML 규칙

- 색상은 `var(--color-*)` 시맨틱 토큰만 사용한다. raw hex/rgb/hsl 및 Tailwind 기본 팔레트 raw 컬러 유틸리티는 금지한다.
- 간격, 크기, 폰트 사이즈, 반경, 그림자는 프로젝트 맥락에 맞는 CSS 또는 Tailwind 직접값을 허용한다.
- CSS는 Tailwind v4 `@apply`와 표준 CSS nesting을 사용할 수 있다. SCSS 문법은 사용하지 않는다.
- 반응형은 모바일 퍼스트로 작성하고 360 / 768 / 1280 기준만 사용한다.
- 단순 반응형 속성 변경은 `@apply tablet:*` / `@apply pc:*`를 우선한다.
- 복잡한 중첩 선택자나 여러 하위 요소 동시 제어만 관련 선택자 내부 `@media`로 작성한다. 파일 하단에 `@media`를 몰아두지 않는다.
- 5-objects, 6-components 레이어의 클래스명은 BEM을 따른다.
- 기본 페이지 구조는 `header > .container`, `main > section > .container`, `footer > .container` 흐름을 유지한다.
- 컴포넌트화는 페이지 전체가 아니라 `main` 내부 section 단위로 우선 분리한다.

## 접근성

- 인터랙티브 요소는 `<button>`, `<a>`, 폼 요소 등 시맨틱 태그를 우선 사용한다.
- 이미지 `alt`, 폼 `label`, 키보드 조작, `focus-visible`, 모바일 터치 영역 44px 이상을 확인한다.
- modal, tab, accordion, disclosure, tooltip, carousel, calendar는 WAI-ARIA 1.2 APG 패턴을 따른다.

## 검증

작업 후 가능한 범위에서 아래를 실행한다.

```bash
npm run check
npm run lint:css
npm run build
```

기존 개발팀 프로젝트에 이 기준만 이식되어 infoUX 하네스가 없는 경우에도 검증을 생략하지 않는다.

1. 프로젝트의 `package.json`, CI 설정, README에서 기존 `lint`/`build`/`test`/`a11y` 명령을 먼저 찾아 실행한다.
2. `npm run check` 또는 `scripts/check-*`가 없으면 변경 파일을 직접 점검한다.
3. 직접 점검 최소 항목: raw 색상, Tailwind raw 컬러, SCSS 문법, `!important`, 핵심 CSS `:has()`, focus outline 제거, BEM 위반, 비-BEM 상태 클래스, 시각적 modifier, `div/span` 클릭, `alt`/`label`/ARIA 누락, skip link/page shell, 모바일 360px 터치 영역과 overflow.
4. 최종 보고에는 실행한 자동 검증, 대체한 수동 검증, 남은 수동 QA 항목을 구분해 적는다.
