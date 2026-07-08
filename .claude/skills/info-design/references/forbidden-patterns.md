# 금지 패턴 — info-design 컨트랙트

이 문서의 패턴이 코드에서 발견되면 **즉시 작업 중단**하고 사용자에게 보고한다.

---

## 1. 색상 — Raw 사용 금지 (R-01)

### ❌ 금지

```css
/* hex/rgb/hsl 직접 작성 */
.btn { background: #256ef4; }
.card { color: rgb(30, 33, 36); }
.alert { border-color: hsl(220, 50%, 50%); }
```

```html
<!-- Tailwind 기본 팔레트 raw 컬러 유틸리티 금지 -->
<div class="bg-[red] text-[gray] border-[blue]">...</div>
<div class="bg-[white]">...</div>
```

```jsx
{/* 인라인 style 색상 */}
<div style={{ color: "#256ef4" }}>...</div>
```

### ✅ 허용

```css
.btn { background: var(--color-primary); }
.btn { background: var(--color-button-primary-fill); }
.alert { border-color: var(--color-border-light); }
```

```html
<div class="bg-primary text-text border-border-light">...</div>
<div class="bg-bg">...</div>
```

### Raw → 시맨틱 매핑표

| Raw 시도 | 올바른 토큰 |
|---------|-------------|
| `bg-white`, `#fff` | `bg-bg` 또는 `var(--color-bg)` |
| `bg-gray-50`, `#f4f5f6` | `bg-bg-subtler` |
| `bg-gray-100` | `bg-bg-subtle` |
| `text-gray-400` | `text-text-disabled` |
| `text-gray-500/600/700` | `text-text-subtle` |
| `text-gray-800/900` | `text-text-bolder` |
| `text-black` | `text-text-bolder` |
| `border-gray-200/300` | `border-border-light` |
| `border-gray-400+` | `border-border` 또는 `border-border-dark` |
| red 계열 텍스트/배경 유틸 | `text-danger` / `bg-danger` |
| `bg-red-50/100` | `bg-danger-surface` |
| `text-blue-*` (브랜드) | `text-primary` |
| `bg-blue-500+` | `bg-primary` |
| `bg-blue-50/100` | `bg-primary-5` 또는 `var(--color-surface-primary-subtler)` |
| `text-green-*` | `text-success` |
| `bg-green-50/100` | `bg-success-surface` |
| `text-amber-*` / `text-yellow-*` | `text-warning` |
| `bg-amber-50/100` | `bg-warning-surface` |

---

## 2. 간격/크기 — 과잉 토큰화 금지

간격, 크기, 반경, 그림자, 모션, z-index는 공개 토큰으로 만들지 않는다. 화면 밀도와 컴포넌트 맥락에 맞춰 Tailwind v4 `@apply` 또는 명확한 CSS 직접값을 사용한다.

### ❌ 금지

```css
:root {
  --custom-spacing-token: 1.6rem;
  --custom-radius-token: 0.8rem;
}

.card {
  padding: var(--custom-spacing-token);
  border-radius: var(--custom-radius-token);
}
```

### ✅ 허용

```css
.card {
  @apply rounded-lg;
  padding: 2.4rem;
  margin-top: 4rem;
}

.btn {
  @apply inline-flex min-h-12 items-center gap-2 px-[2.4rem];
}
```

```html
<div class="p-[2.4rem] mt-10 min-h-12">...</div>
```

---

## 3. 폰트 — 패밀리 토큰만 고정

### ❌ 금지

```css
.body { font-family: "Pretendard"; }
```

### ✅ 허용

```css
body { font-family: var(--font-sans); }

.page-title {
  @apply text-3xl font-bold leading-tight;
}
```

폰트 패밀리는 `--font-sans`, `--font-mono`만 사용한다. 폰트 크기, 굵기, 행간은 화면 맥락에 맞춰 Tailwind/CSS 값으로 작성한다.

---

## 4. 버튼 — 옛 variant 사용 금지 (R-06)

### ❌ 금지

```html
<button class="btn btn--ghost">고스트</button>
<button class="btn btn--outline">아웃라인</button>
<button class="btn btn--link">링크</button>
<button class="btn btn--sm">작은 버튼</button>
<button class="btn btn--lg">큰 버튼</button>
```

### ✅ 허용 (KRDS 4 variant × 5 size)

```html
<!-- variant -->
<button class="btn btn--primary">메인 CTA</button>
<button class="btn btn--secondary">보조</button>
<button class="btn btn--tertiary">약한</button>
<button class="btn btn--text">텍스트</button>

<!-- size -->
<button class="btn btn--xsmall">32px</button>
<button class="btn btn--small">40px</button>
<button class="btn">48px (medium 기본)</button>
<button class="btn btn--large">56px</button>
<button class="btn btn--xlarge">64px</button>
```

### 옛 → KRDS 변환표

| 옛 | KRDS |
|---|------|
| `.btn--outline` | `.btn--secondary` |
| `.btn--ghost` | `.btn--tertiary` 또는 `.btn--text` |
| `.btn--link` | `.btn--text` (밑줄은 별도 추가) |
| `.btn--sm` | `.btn--small` |
| `.btn--lg` | `.btn--large` |

---

## 5. CSS 작성 — 시스템 우회 금지 (R-02 · R-05 · R-07 · R-08)

### ❌ 금지

```css
/* !important — 토큰 시스템 우회 */
.btn { background: var(--color-primary) !important; }

/* @apply 안에서 커스텀 클래스 사용 */
.my-btn { @apply text-primary bg-primary-light; } /* primary-light가 토큰명이면 OK, 임의 클래스면 NG */

/* SCSS 문법 */
.btn {
  &--primary { ... }
  &__icon { ... }
}
@use 'breakpoints';
@forward 'tokens';
```

### ✅ 허용

```css
/* !important 정당화: 외부 라이브러리 오버라이드만, 사유 주석 필수 */
.tabulator-cell {
  /* tabulator 인라인 스타일 오버라이드 — 라이브러리 한계 */
  padding: 2rem !important;
}

/* BEM 평면 작성 또는 표준 CSS nesting 사용 (SCSS 문법은 사용하지 않음) */
.btn--primary { ... }
.btn__icon { ... }

/* CSS @import만 사용 */
@import "tailwindcss";
@import "../../tokens/build/tokens.css";
```

---

## 6. HTML 시맨틱 — div onclick 금지 (R-10)

### ❌ 금지

```html
<div onclick="open()" class="cursor-pointer">메뉴 열기</div>
<span onClick={handler}>버튼처럼 보이는 span</span>
<a href="javascript:void(0)" onclick="...">앵커 남용</a>
```

### ✅ 허용

```html
<button type="button" onclick="open()">메뉴 열기</button>
<a href="/menu">메뉴 페이지</a>
```

---

## 7. 접근성 — 누락 금지 (R-09 · R-11 · R-12 · R-13 · R-14)

### ❌ 금지

```html
<img src="/logo.svg">                          <!-- alt 누락 -->
<input type="text" placeholder="이름">         <!-- label 누락, placeholder만 -->
<button onclick="...">×</button>                <!-- aria-label 누락 (아이콘만) -->
.btn:focus { outline: none; }                  <!-- focus 제거 -->
```

### ✅ 허용

```html
<img src="/logo.svg" alt="기관명">
<label for="name">이름</label>
<input type="text" id="name" placeholder="홍길동">
<button onclick="..." aria-label="닫기">×</button>
/* :focus { outline: none } 자체가 금지. focus-visible은 reset.css 전역 처리됨 */
```

---

## 8. 컴포넌트 — 카탈로그 외 임의 생성 금지 (R-15 카탈로그 정합)

`references/krds-components.md`에 없는 컴포넌트가 필요해 보이면:

### ❌ 금지

```css
/* 카탈로그에 없는 컴포넌트를 그냥 새로 만들기 */
.my-fancy-card { ... }
.custom-button { ... }
.dropdown-menu { ... }
```

### ✅ 절차

1. 작성 중단
2. 사용자에게 보고
3. (a) 기존 컴포넌트 조합으로 구현 가능한가? — 우선 시도
4. (b) 정말 새 컴포넌트가 필요하면 — UX팀에 신규 컴포넌트 제안 (사용자 명시 지시받고 일회성 인라인 구현, 주석에 `TODO: UX팀 정식 컴포넌트화 필요`)

---

## 9. 빌드 시스템 — SCSS 사용 금지 (R-03)

이 가이드는 **Tailwind v4 + 순수 CSS** 기반이다. SCSS는 폐기됨.

### ❌ 금지

- `*.scss` 파일 작성
- `@use 'module' as alias`
- `@forward 'module'`
- SCSS 변수 (`$color: red`)
- SCSS 네스팅 (Tailwind v4는 native CSS 네스팅 지원하지만, 권장은 평면 BEM)

### ✅ 허용

- `*.css` (Tailwind v4 + native CSS)
- `@import "..."` (CSS native)
- `@theme { ... }` (Tailwind v4 토큰 정의)
- `@apply` (Tailwind v4 component layer)
- `@layer base, components, utilities` (Tailwind v4 cascade layer)

---

## 10. HTML 구조 위반 (R-15 / R-16 / R-17 / R-18)

> 단일 소스: `references/html-semantics.md` (28개 컴포넌트의 Root 태그·자식 시맨틱·필수 ARIA·키보드 매핑)

### 10.1 컴포넌트 root 태그 불일치 (R-15)

KRDS 컴포넌트는 시맨틱 의미가 정해져 있다. BEM Block 클래스를 다른 root 태그에 붙이면 검색·접근성·SEO 일관성이 깨진다.

#### ❌ 금지

```html
<div class="card">...</div>
<div class="modal">...</div>
<div class="breadcrumb">...</div>
<div class="main-menu">...</div>
<div class="pagination">...</div>
```

#### ✅ 허용

```html
<article class="card">...</article>
<dialog class="modal">...</dialog>
<nav class="breadcrumb" aria-label="페이지 경로"><ol>...</ol></nav>
<nav class="main-menu" aria-label="주 메뉴"><ul>...</ul></nav>
<nav class="pagination" aria-label="페이지 내비게이션"><ol>...</ol></nav>
```

전체 28종 매핑은 `references/html-semantics.md` 참조.

---

### 10.2 인터랙티브 위젯 ARIA 누락 (R-16)

modal / tab / accordion / tooltip / disclosure / carousel / calendar는 ARIA 없이 작동하지 않는다.

#### ❌ 금지

```html
<!-- modal: aria-modal, aria-labelledby 누락 -->
<div role="dialog" class="modal">...</div>

<!-- disclosure: aria-expanded, aria-controls 누락 -->
<button class="disclosure">자세히</button>
<div class="disclosure__panel">...</div>

<!-- tab: role/aria-selected/aria-controls 누락 -->
<button class="tab__item">탭1</button>
<div class="tab__panel">...</div>

<!-- tooltip: aria-describedby 누락 -->
<button class="tooltip-trigger">?</button>
<div class="tooltip">설명</div>
```

#### ✅ 허용

```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" class="modal">
  <h2 id="modal-title">제목</h2>
</div>

<button class="disclosure" aria-expanded="false" aria-controls="more">자세히</button>
<div id="more" class="disclosure__panel" hidden>...</div>

<button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1" class="tab__item">탭1</button>
<div id="panel-1" role="tabpanel" aria-labelledby="tab-1" class="tab__panel">...</div>

<button class="tooltip-trigger" aria-describedby="tip-1">?</button>
<div id="tip-1" role="tooltip" class="tooltip">설명</div>
```

---

### 10.3 비-BEM 상태 클래스 (R-17)

상태는 BEM modifier(시각) + ARIA 속성(의미)으로만 표현한다. `.is-*`, `.has-*` 같은 비-BEM 상태 클래스는 어느 컴포넌트의 상태인지 모호하다.

#### ❌ 금지

```html
<button class="btn is-disabled">
<div class="modal is-open">
<input class="input has-error">
<li class="tab__item is-active">
```

#### ✅ 허용

```html
<button class="btn" disabled aria-disabled="true">
<div class="modal modal--open" aria-modal="true">
<input class="input input--error" aria-invalid="true">
<li role="tab" class="tab__item tab__item--selected" aria-selected="true">
```

---

### 10.4 시각적 단어 modifier (R-18)

modifier 이름은 의미를 담아야 한다. 색·크기를 직접 명시한 이름은 디자인 변경 시 클래스명도 같이 바꿔야 하는 부채를 만든다.

#### ❌ 금지 — 시각적 단어 사전

`--big` · `--small` · `--large` · `--xl` · `--xxl` · `--red` · `--blue` · `--green` · `--yellow` · `--rounded` · `--shadow` · `--bold` · `--italic`

```html
<button class="btn btn--blue">
<div class="card card--big">
<span class="tag tag--rounded">
<button class="btn btn--red">
```

#### ✅ 허용 — KRDS 정의 어휘만

| 카테고리 | 허용 단어 |
|---------|---------|
| Variant | `--primary`, `--secondary`, `--tertiary`, `--text`, `--ghost` |
| 사이즈 (KRDS 스케일) | `--xsmall`, `--small`, `--medium`, `--large`, `--xlarge` |
| 상태 | `--selected`, `--disabled`, `--expanded`, `--loading`, `--error`, `--success`, `--current`, `--done`, `--todo` |
| 톤 | `--info`, `--success`, `--warning`, `--danger`, `--inverse` |
| 레이아웃 | `--horizontal`, `--vertical`, `--block`, `--inline` |

```html
<button class="btn btn--primary">
<div class="card card--large">
<span class="tag tag--info">
<button class="btn btn--danger">
```

---

## 위반 발견 시 보고 형식

```
[info-design 컨트랙트 위반 감지]

위반 항목: [위 1~9 중 어느 카테고리]
구체 내용: [어느 줄에서 무엇을]
근거: [이 문서의 어느 항목]

옵션:
1. 토큰으로 교체 — [구체적 토큰명 제시]
2. 사용자 확인 필요 — [모호한 부분 설명]

작성을 일시 중단합니다. 어떻게 진행할까요?
```
