# [프로젝트명] — 개발 가이드

## ⚠ UI/스타일 작업 시 — `info-design` 스킬 필수 활성화

**모든 CSS·HTML·UI 코드 작성 시 다음 트리거를 먼저 발화한다:**

> "info-design 스킬 기준으로 가자"

이 트리거 후에는 LLM이 컨트랙트(`.claude/skills/info-design/SKILL.md`)에 따라
**색상/상태 토큰과 INFOMIND 컴포넌트 패턴을 우선 사용**한다. KRDS는 품질 원칙과 접근성 기준으로 적용하고, 수치 체계는 프로젝트 맥락에 맞게 조정한다.

위반 발견 시 LLM은 즉시 작업을 중단하고 사용자에게 보고한다.

> 스킬이 설치되지 않았으면 UX팀(infoUX 가이드 저장소)에서 받아 `.claude/skills/info-design/`에 배치한다.

---

## Project

KRDS(범정부 UI/UX 디자인 시스템)의 접근성·구조 원칙 + INFOMIND UX팀 실무 표준을 적용한 프로젝트.

**Core Value:** 검증된 팀 표준을 일관되게 유지하며 개발한다.

---

## 기술 스택

| Category | Technology | Version |
|----------|-----------|---------|
| CSS Framework | Tailwind v4 | ^4.0.0 |
| Tokens | INFOUX foundation | `tokens/foundation.json` |
| CSS 작성 | 표준 CSS nesting + Tailwind v4 `@apply` | SCSS 빌드 없이 중첩 구조와 유틸 조합 사용 |
| BEM | Block__Element--Modifier | (5-objects · 6-components 한정) |
| Linting | Stylelint + custom check-violations | — |

---

## 디렉터리 구조

```
src/
├── styles/                    # CSS 진입점 + ITCSS 레이어 구조
│   ├── style.css              # 메인 진입점
│   ├── 3-generic/             # 리셋
│   ├── 4-elements/            # HTML 태그 베이스
│   ├── 5-objects/             # 레이아웃 패턴 (BEM)
│   ├── 6-components/          # KRDS 기반 UI 컴포넌트 (BEM)
│   └── 7-utilities/           # 유틸리티
├── snippets/                  # 컴포넌트 마크업 스니펫 (LLM 참조용)
└── js/                        # JS

tokens/
├── foundation.json            # 색상 + 기본 폰트 단일 소스
└── build/tokens.css           # 빌드 산출물 (자동 생성)
```

---

## 핵심 명령어

```bash
npm run build:tokens   # tokens/foundation.json → tokens/build/tokens.css
npm run build:css      # Tailwind v4 컴파일 → dist/css/style.css
npm run watch:css      # 워치 모드
npm run lint:css       # stylelint 검사
npm run check          # info-design 컨트랙트 위반 검출
```

## 하네스 부재 시 자체 검증

개발팀 기존 프로젝트처럼 infoUX 전용 `npm run check`, `scripts/check-violations.js`, `scripts/check-html-structure.js`가 없더라도 검증을 생략하지 않는다.

1. 프로젝트의 `package.json`, CI 설정, README에서 사용 가능한 `lint`/`build`/`test`/`a11y` 명령을 먼저 찾아 실행한다.
2. infoUX 하네스가 없으면 변경 파일을 직접 스캔한다.
3. 최소 점검 항목: raw 색상, Tailwind raw 컬러, SCSS 문법, `!important`, 핵심 CSS `:has()`, focus outline 제거, BEM 위반, 비-BEM 상태 클래스, 시각적 modifier, `div/span` 클릭, `alt`/`label`/ARIA 누락, skip link/page shell, 모바일 360px 터치 영역과 overflow.
4. 최종 보고에는 실행한 자동 검증, 대체한 수동 검증, 남은 수동 QA 항목을 구분해서 적는다.

---

## 작업 전 체크리스트

### CSS/HTML 작성 시

1. ✅ `info-design 스킬 기준으로 가자` 트리거 발화
2. ✅ 사용 색상 = `--color-*` 시맨틱 토큰
3. ✅ 기본 폰트 = `--font-sans` / `--font-mono`
4. ✅ 간격/크기/타이포 스케일은 CSS/Tailwind 직접값 사용
5. ✅ CSS는 표준 nesting과 Tailwind v4 `@apply` 사용 가능
6. ✅ 단순 반응형은 `@apply tablet:*` / `@apply pc:*` 우선
7. ✅ 직접 `@media`는 관련 선택자 내부에 중첩
8. ✅ HTML은 `header/main/footer`, `main > section > .container` 구조
9. ✅ 모든 인터랙티브 = `<button>`/`<a>` 시맨틱 HTML
10. ✅ `<img>` `alt`, 폼 `<label>`, focus 처리 모두 충족
11. ✅ 모바일 터치 영역 ≥ 44px

위 항목 중 하나라도 No → 작업 미완.

---

## 절대 금지 (요약 — 상세는 스킬 `references/forbidden-patterns.md`)

- Raw hex/rgb/hsl 색상
- 간격/크기/타이포 스케일은 CSS/Tailwind 직접값 사용. 색상 raw 값은 금지
- Tailwind 기본 팔레트 raw 컬러 유틸
- Tailwind 기본 스케일은 프로젝트 기준과 충돌하지 않는지 확인
- 옛 버튼 variant (`btn--ghost`, `btn--outline`, `btn--link`, `btn--sm`, `btn--lg`)
- `!important` (사유 주석 없을 시)
- 인라인 `style="..."` (CSS 변수 주입 외)
- 카탈로그 밖 컴포넌트는 UX팀 판단 후 프로젝트 패턴 또는 공통 컴포넌트로 확장
- BEM element 2단계 중첩 (`.card__body__title`)
- `:focus { outline: none }`
- `div`/`span` 클릭 핸들러 패턴
- 이미지 `alt` 누락, 폼 `<label>` 누락
- 모바일 터치 영역 44px 미만

---

## 갱신

INFOUX 파운데이션 기준이 변경되면:

1. UX팀이 infoUX 가이드 저장소 갱신
2. UX팀이 이 프로젝트 `tokens/foundation.json` 갱신
3. `npm run build:tokens && npm run build:css`
4. `.claude/skills/info-design/`도 새 스킬 콘텐츠로 갱신

---

## 코딩 스타일

- 들여쓰기: 2 spaces
- 따옴표: single quote
- 세미콜론: CSS 사용, JS/HTML 미사용
- 주석 언어: 한국어
