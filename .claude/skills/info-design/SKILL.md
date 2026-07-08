---
name: info-design
description: INFOMIND UX 팀의 디자인·퍼블리싱 컨트랙트. KRDS(범정부 UI/UX 디자인 시스템)의 접근성·구조 원칙 + INFOMIND 실무 표준. 트리거 — 사용자가 "info-design 스킬 기준으로 가자" 또는 "infomind 디자인 기준으로" 같이 말하면 즉시 활성화. UI/CSS/HTML 코드 생성, 색상 토큰 결정, 컴포넌트 마크업, 접근성 검증 시 사용. 색상은 토큰을 강제하고 간격·크기·타이포는 프로젝트 맥락에 맞게 조정한다.
---

# info-design — INFOMIND UX 컨트랙트

> **이 스킬은 권장이 아니라 컨트랙트다.**
> 활성화된 이상 아래 명시된 규정 외의 결정을 LLM이 임의로 할 수 없다.
> 위반 발견 시 **즉시 작업을 중단하고 사용자에게 보고**한다.

---

## 0. 컨트랙트 발효 조건

다음 트리거 문구가 사용자 메시지에 등장하면 이 컨트랙트가 발효된다:

- "info-design 스킬 기준으로 가자"
- "infomind 디자인 기준"
- "ux 가이드대로"
- 또는 사용자가 명시적으로 이 스킬을 호출

**발효 즉시 LLM은 아래 모든 규정을 무조건 따른다.** 발효된 후에는 LLM 자신의 판단으로 규정을 우회·예외 처리하지 않는다.

---

## 1. 절대 금지 (MUST NOT)

다음을 **위반하면 코드를 작성하지 않고 작업을 중단**한다:

| 규칙 | 항목 | 금지 사유 |
|------|------|----------|
| **R-01** | 색상 raw hex/rgb/hsl 직접 작성 (`#fff`, `rgb(0,0,0)`) | KRDS 토큰만 허용 |
| **R-01** | Tailwind 기본 팔레트 raw 컬러 유틸리티 | 색상 토큰 또는 프로젝트 색상 유틸만 |
| **R-02** | `!important` (정당한 사유 주석 없을 시) | 토큰 시스템 우회 위험 |
| **R-03** | SCSS 사용 (`*.scss`, `@use`, `@forward`, `$var`) | Tailwind v4 + CSS Custom Properties만 허용 |
| **R-04** | BEM 미준수 클래스명 — `.block__element--modifier` 형식 외 | 일관성 |
| **R-05** | BEM element 2단계 중첩 (`.card__body__title`) | 평탄화 — `.card__title` 또는 `.card__body-title` |
| **R-06** | 옛 variant 이름 사용 (`btn--ghost`, `btn--outline`, `btn--link`) | KRDS 4 variant만: `--primary` / `--secondary` / `--tertiary` / `--text` |
| **R-07** | 인라인 `style="..."` (CSS 변수 주입 외) | 토큰 추적 불가 |
| **R-08** | HTML 클래스 BEM 2단계 element 중첩 | R-05 HTML 적용 |
| **R-09** | 이미지 `alt` 누락 | WCAG 1.1.1 |
| **R-10** | `div/span 클릭 핸들러 패턴` 처럼 div를 인터랙티브로 쓰는 패턴 | 시맨틱 HTML 사용 (button/a) |
| **R-11** | `:focus { outline: none }` | 접근성 위반. focus-visible은 reset.css 전역 처리 |
| **R-12** | 색상 대비 부족 (일반 4.5:1 / 큰 텍스트 3:1 미만) | WCAG 1.4.3 — pa11y-ci 자동 검증 |
| **R-13** | 터치 영역 44×44px 미만 인터랙티브 요소 (모바일 컨텍스트) | WCAG 2.5.5 · INFOMIND 정책 |
| **R-14** | 페이지에 `.skip-to-content` 건너뛰기 링크 누락 | WCAG 2.4.1 — `<body>` 진입 직후 필수 |
| **R-15** | 기존 인포마인드 HTML 기본 골격을 무시한 임의 구조 | 유지보수 패턴 단절 |
| **R-16** | 인터랙티브 컴포넌트(modal/tab/accordion/tooltip/disclosure/carousel/calendar) 필수 ARIA 누락 | 스크린리더 접근 불가 |
| **R-17** | 비-BEM 상태 클래스 (`.is-active`, `.has-error`, `.is-open` 등) | BEM modifier + ARIA로만 표현 |
| **R-18** | 시각적 단어 modifier (`--blue`, `--red`, `--big`, `--rounded`, `--shadow` 등) | 의미 기반 modifier만 |
| — | 폼 요소 `<label>` 누락 (placeholder만 사용) | WCAG 3.3.2 |

**모호한 케이스는 사용자에게 질문한다.** 자체 판단으로 우회하지 않는다.

---

## 2. 절대 준수 (MUST)

| 항목 | 규정 |
|------|------|
| 사이트 유형 판정 | 코드 생성 전 `references/project-profiles.md` 기준으로 일반사이트/공공서비스/공공기관/CMS·관리자/커머스·예약 중 먼저 판정 |
| 색상 | `var(--color-*)` 시맨틱 토큰만 사용 |
| 간격/크기 | CSS/Tailwind 직접값. CMS·관리자 화면은 정보 밀도에 맞게 조정 |
| 폰트 | `var(--font-sans)`, `var(--font-mono)` — 직접 폰트 패밀리 작성 금지 |
| 폰트 사이즈 | 프로젝트 타입 계층 우선. 토큰화하지 않음 |
| CSS 작성 | 표준 CSS nesting 허용. Tailwind v4 `@apply`, `@theme`, `@utility` 사용 가능 |
| 반응형 작성 | 단순 속성 변경은 `@apply tablet:*` / `@apply pc:*` 우선. 복잡한 중첩 선택자만 관련 선택자 내부 `@media` 사용 |
| line-height | 한국어 가독성을 위해 1.4~1.6 권장. `line-height: 1` 금지 |
| 반경/그림자 | CSS/Tailwind 직접값 |
| z-index | CSS/Tailwind 직접값. 레이어 의미가 보이도록 주석 또는 클래스명으로 관리 |
| 모션 | CSS/Tailwind 직접값. 접근성 `prefers-reduced-motion` 고려 |
| 터치 영역 | 44px 이상 — 모바일 인터랙티브 요소 강제 |
| 브레이크포인트 | 360 / 768 / 1280 (3단계, INFOUX 표준) |
| 컨테이너 max-width | 1200px (KRDS contents-size) |
| BEM | `.block__element--modifier` (소문자, 하이픈) — 5-objects · 6-components 레이어에만 |
| ITCSS | 5-layer 순서: 3-generic → 4-elements → 5-objects → 6-components → 7-utilities (`tokens/`는 외부 소스) |
| @import (CSS) | Tailwind v4 `@import` 사용. SCSS `@use/@forward` 또는 `@import` 사용 금지 (SCSS 자체가 폐기됨) |
| 다크/고대비 | `[data-color-mode="high-contrast"]` 어트리뷰트로 자동 대응 — 컴포넌트 코드에 색 수동 분기 작성 금지 |
| HTML 기본 구조 | 큰 영역은 `header/main/footer`, `main` 안은 `section > .container` 구조 |
| HTML 컴포넌트화 | 페이지 전체가 아니라 `main` 내부의 section 단위로 분리 |
| 조건부 정부/공공 요소 | 공식 배너, 정부 상징, 운영기관 식별자, 공공 푸터 필수 링크는 적용 대상이 확인된 경우에만 생성. 민간·사내·일반 CMS에서는 N/A |
| Page shell | `<a href="#main" class="skip-to-content">` → `header#header` → `main#main` → `footer#footer` 순서. `main` 직계 자식은 section |
| Section 구조 | 각 `section`은 `.container`를 직접 포함하고 heading 또는 `aria-labelledby`/`aria-label`로 접근 가능한 이름 제공 |
| 컴포넌트 root 태그 | `references/html-semantics.md`는 참고 기준. 기존 패턴 위에 시맨틱/ARIA 보강 |
| 인터랙티브 위젯 ARIA | WAI-ARIA 1.2 APG 패턴 + KRDS 보강 — modal `aria-modal`+`aria-labelledby`, tab `role`+`aria-selected`+`aria-controls`, accordion `aria-expanded`+`aria-controls` 등 |
| 상태 표현 | BEM modifier (시각) + ARIA 속성 (의미) 동시 사용 — `.tab__item--selected` + `aria-selected="true"` |
| modifier 어휘 | KRDS 정의만: variant(`--primary/--secondary/--tertiary/--text`), 사이즈(`--xsmall..--xlarge`), 상태(`--selected/--disabled/--expanded/--loading/--error/--success/--current/--done/--todo`), 톤(`--info/--success/--warning/--danger/--inverse`), 레이아웃(`--horizontal/--vertical/--block/--inline`), section archetype(`--intro/--content/--list/--form/--data/--search/--process/--notice`) |

---

## 3. references — 작업 맥락별 로드 순서

**필요한 파일만 로드**한다. 전체를 한꺼번에 읽지 않는다.

| 작업 맥락 | 로드 |
|-----------|------|
| 코드 생성 전 사이트 유형 판정 | `references/project-profiles.md` |
| 토큰 결정 (색상·기본 폰트·브레이크포인트) | `references/krds-tokens.md` |
| 컴포넌트 마크업 작성 — 시각/스타일 카탈로그 | `references/krds-components.md` |
| 컴포넌트 마크업 작성 — 인포마인드 기본 골격·ARIA·키보드 | 기존 인포마인드 구축 사이트 HTML + `references/html-semantics.md` |
| Tailwind 유틸리티 사용 | `references/tailwind-mapping.md` |
| 접근성 검증 | `references/accessibility.md` |
| 코드 검토 — 무엇을 막을지 | `references/forbidden-patterns.md` |
| 이 스킬을 개발팀 레포에 임포트 | `references/guide-import.md` |

---

## 4. 작업 시작 전 자가 점검

코드를 한 줄이라도 작성하기 전에:

1. ✅ 사이트 유형을 일반사이트, 공공서비스, 공공기관, CMS·관리자, 커머스·예약 중 하나로 판정했는가?
2. ✅ 정부 상징/공식 배너/운영기관 식별자 적용 여부가 확인됐는가? 확인되지 않았으면 생성하지 않았는가?
3. ✅ 사용하려는 색상은 `--color-*` 시맨틱 토큰인가?
4. ✅ 폰트는 `--font-sans` 또는 `--font-mono` 기준인가?
5. ✅ CSS nesting과 `@apply`를 쓰더라도 결과 구조가 읽기 쉬운가?
6. ✅ 기존 컴포넌트 패턴으로 해결 가능한가?
7. ✅ `main` 직계는 section이고 각 section에 `.container`와 접근 가능한 이름이 있는가?
8. ✅ 인터랙티브 요소는 `<button>`/`<a>`/시맨틱 HTML인가?
9. ✅ 이미지 `alt`, 폼 `<label>`, focus 처리 모두 충족했는가?
10. ✅ 모바일 터치 영역 44px 이상인가?

위 10개 중 하나라도 No면 **작성 중단 → 사용자에게 어느 항목이 막히는지 보고** + 어떻게 해결할지 옵션 제시.

---

## 5. 옛 시스템 흔적 발견 시

이전 infoUX (KRDS 미적용 시절) 흔적을 발견하면:

- 옛 토큰명 (`--color-text-secondary`, 옛 spacing/font-size/radius/transition/leading 토큰) → 현행 토큰 또는 프로젝트 규칙으로 교체 권장
- 옛 variant (`btn--ghost`, `btn--outline`, `btn--link`) → KRDS 4 variant로 매핑
- SCSS 파일 (`*.scss`, `@use`, `@forward`) → CSS로 마이그레이션 필요 (SCSS 폐기됨)

**자동 마이그레이션은 하지 말고, 사용자에게 어디를 바꿀지 보고**한 후 명시적 지시받고 진행한다.

---

## 6. 작업 후 검증

infoUX 하네스가 설치된 프로젝트에서는 가능한 범위에서 다음을 실행한다:

```bash
npm run check
npm run lint
npm run build
npm run test
```

외부 개발팀 프로젝트처럼 infoUX 하네스가 없는 경우에도 자체 검증을 생략하지 않는다.

1. 프로젝트의 `package.json`, CI 설정, README에서 기존 `check`/`lint`/`build`/`test`/`a11y` 명령을 먼저 찾아 실행한다.
2. `scripts/check-violations.js`, `scripts/check-html-structure.js`, `pa11y`/`axe` 설정이 없으면 변경 파일을 직접 점검한다.
3. 직접 점검 최소 항목:
   - raw `hex`/`rgb`/`hsl`, Tailwind raw 컬러 유틸, SCSS 문법, `!important`
   - 핵심 CSS의 `:has()` 의존, `:focus { outline: none }`
   - BEM 2단계 element, 비-BEM 상태 클래스, 시각적 modifier
   - `div/span` 클릭 핸들러, 이미지 `alt`, 폼 `label`, 필수 ARIA, skip link/page shell
   - 모바일 360px 기준 터치 영역 44px 이상, 텍스트 겹침, 가로 overflow
4. 최종 보고에는 실행한 자동 검증, 대체한 수동 검증, 남은 수동 QA 항목을 구분해 적는다.

위반 발견 시 **즉시 작업을 중단하고 사용자에게 위반 항목·근거·수정 옵션을 보고**한다.

---

## 7. 모호함 해소 — 사용자에게 질문할 케이스

다음은 자체 판단 금지. 사용자에게 묻는다:

- 새 컴포넌트를 공통화할지 일회성 프로젝트 패턴으로 둘지 모호
- 사이트가 일반사이트/공공서비스/공공기관/CMS·관리자/커머스·예약 중 무엇인지 모호
- 공공기관 프로젝트지만 공식 배너, 정부 상징, 운영기관 식별자 적용 여부가 확인되지 않음
- KRDS 수치 체계를 그대로 따를지 프로젝트 밀도에 맞게 조정할지 모호
- 두 토큰 중 어느 쪽이 적절한지 모호 (예: `--color-text` vs `--color-text-bolder`)
- 옛 시스템 흔적을 발견 — 어떻게 처리할지
- 모바일/PC에서 다른 동작이 필요한데 어느 브레이크포인트에서 분기할지 모호

---

## 8. 카탈로그에 없는 컴포넌트 요구 시

`references/krds-components.md`에 정의된 28개 컴포넌트 외에 새 컴포넌트가 필요해 보이면:

1. 기존 컴포넌트 조합으로 해결 가능한지 먼저 확인
2. 새 패턴이 더 적절하면 사용자에게 근거 보고
3. 옵션 제시:
   - (a) 일회성 프로젝트 패턴으로 구현
   - (b) 공통 컴포넌트 후보로 등록
4. 공통화 가치가 있으면 코드 주석이나 문서에 `/* TODO: UX팀 정식 컴포넌트화 검토 */` 명시

---

## 9. 출처 — 단일 소스

이 스킬의 콘텐츠는 자동 생성된다. 직접 수정 금지.

- 토큰 출처: `tokens/foundation.json`
- 컴포넌트 출처: `src/styles/6-components/*.css` + `src/snippets/*.md`
- 빌드: `node scripts/build-skill.js` → `skill/` 폴더 갱신
- 배포: `skill/` → `~/.claude/skills/info-design/` (UX팀장이 수동 배포)

---

## 10. 분쟁 시 우선순위

여러 규정이 충돌하면 다음 순서로 우선:

1. **접근성 (WCAG/KWCAG AA)** — 양보 불가
2. **프로젝트 목적과 사용성** — CMS/관리자 화면은 업무 밀도와 반복 효율 우선
3. **사이트 유형 판정** — 정부 아이덴티티 요소는 적용 조건이 확인된 경우만
4. **INFOUX 파운데이션** — `tokens/foundation.json`의 색상·기본 폰트·브레이크포인트 기준
5. **KRDS 정본** — 접근성·구조·색상 참고 기준
6. **프로젝트 스타일** — 프로젝트별 CSS 확장
7. **사용자 명시 지시** — 단, 접근성을 깨면 사용자에게 확인

---

> 이 스킬이 활성화된 이상, 모든 LLM 출력은 위 규정의 적용 대상이다.
> 규정에 모호한 부분이 있으면 자체 판단하지 말고 사용자에게 묻는다.
