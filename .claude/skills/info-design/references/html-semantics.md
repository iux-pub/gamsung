# HTML 구조 매핑 — KRDS 컴포넌트 28종

> **단일 소스(SoT).** 28개 컴포넌트의 Root 태그 · 자식 시맨틱 · 필수 ARIA · 키보드 패턴을 KRDS 표준에 따라 명시한다.
> 출처: KRDS-uiux v1.0.0 / WAI-ARIA 1.2 Authoring Practices / `src/snippets/*.md` 실측.
> 본 문서의 매핑과 다른 마크업은 **R-15 위반**으로 자동 차단된다.

---

## 0. 적용 원칙 (KRDS 기반)

1. **시맨틱 우선** — 의미가 일치하는 HTML5 태그를 최우선 (`<button>` `<nav>` `<article>` `<dialog>` 등).
2. **ARIA는 보완** — 네이티브 시맨틱으로 표현 불가한 경우에만 `role`/`aria-*` 사용 (WAI-ARIA 1st rule).
3. **상태는 ARIA 속성** — 시각 상태(open/selected/disabled)는 ARIA로 표현. `.is-*` 같은 비-BEM 상태 클래스 금지(R-17).
4. **키보드 동등성** — 마우스로 가능한 모든 조작이 키보드로도 가능해야 한다 (KWCAG 2.1.1).
5. **포커스 가시성** — 모든 인터랙티브 요소는 `:focus-visible` 4px primary outline (reset 전역 처리, 컴포넌트 단위 override 금지).
6. **단계 차이 50 규칙** — KRDS 색상에서 두 단계 차이 50 이상 = 명도 대비 4.5:1 자동 충족.
7. **wrapper 최소화** — 자식이 하나뿐이고 그 자식에 직접 스타일·의미를 줄 수 있으면 감싸는 `<div>`를 두지 않는다. 시맨틱 요소(`<section>`/`<nav>`/`<ul>`/`<figure>`)가 맞으면 `<div>` 대신 그것을 쓴다. "이유를 댈 수 없는 wrapper"는 제거한다 (상세: § 6.6).

## 0.1. Page Shell 계약

페이지 HTML을 새로 생성할 때는 컴포넌트보다 먼저 page shell을 확정한다. 이 계약은 `contracts/html-page-contract.json`과 `scripts/check-html-structure.js`가 자동 검증한다.

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

필수 규칙:

1. `body` 첫 의미 요소는 `<a href="#main" class="skip-to-content">본문 바로가기</a>`다.
2. 페이지에는 `main#main`이 하나만 존재한다.
3. 큰 랜드마크는 `header#header`, `main#main`, `footer#footer`를 사용한다.
4. `main`의 직계 자식은 `section`이다.
5. 각 `section`은 `.container`를 직접 포함한다.
6. 각 `section`은 heading 또는 `aria-labelledby`/`aria-label`로 접근 가능한 이름을 가진다.
7. HTML 컴포넌트화는 전체 페이지가 아니라 `main` 내부 section 단위로 한다.

Section modifier는 목적 기반 archetype만 사용한다.

| Modifier | 용도 |
|----------|------|
| `.section--intro` | 도입/대표 메시지/핵심 CTA |
| `.section--content` | 일반 본문 |
| `.section--list` | 카드/뉴스/게시물 목록 |
| `.section--form` | 신청/문의/입력 |
| `.section--data` | 표/통계/현황 |
| `.section--search` | 검색/필터 |
| `.section--process` | 단계/절차 |
| `.section--notice` | 공지/알림/유의사항 |

---

## 0.5. 컴포넌트 카테고리 ↔ BEM Block 매핑

본 문서의 컴포넌트 섹션 이름(예: `check-radio`)은 **KRDS 카테고리** 기준이다. 실제 CSS BEM Block 클래스명은 다를 수 있다. `scripts/check-html-structure.js`의 `COMPONENT_ROOT_MAPPING`은 BEM Block 기준이다.

다음은 두 식별자가 다른 28개 케이스 매핑:

| 카테고리 (이 문서 섹션) | BEM Block(s) (실제 클래스) | 비고 |
|--------------------------|---------------------------|------|
| `check-radio` | `.check`, `.radio` | 두 변형이 같은 카테고리, 각자 BEM Block |
| `form` | `.form-field` | 폼 필드 한 단위가 BEM Block |
| `header` | `.site-header` | 사이트 헤더 — semantic의 `<header>`와 구분 |
| `tooltip` | `.tooltip` (요소), `.tooltip-trigger` (트리거), `.tooltip-wrap` (래퍼) | 세 BEM Block의 협업 |
| `toast` | `.toast` (개별), `.toast-stack` (컨테이너) | 두 BEM Block |
| `table` | `.table` (요소), `.table-wrap` (반응형 래퍼) | 두 BEM Block |

위에 안 적힌 나머지 컴포넌트는 **카테고리 = BEM Block** (예: `card` ↔ `.card`, `modal` ↔ `.modal`, `btn` ↔ `.btn` 등).

> 새 컴포넌트 추가 시: 본 매핑 표 + 컴포넌트 섹션(§ 1~5) + `check-html-structure.js`의 `COMPONENT_ROOT_MAPPING` 세 곳을 같이 갱신.

---

## 1. 그룹 A — 폼/액션 (6종)

### `btn` — 버튼

| 항목 | 값 |
|------|-----|
| Root 태그 | `<button type="button">` (액션) / `<button type="submit">` (폼 제출) / `<a href>` (페이지 이동) |
| 필수 속성 | `type` (button 한정) / `href` (a 한정) |
| 필수 ARIA | 토글 시 `aria-pressed="true|false"` / 메뉴 트리거 시 `aria-haspopup` + `aria-expanded` / 텍스트 없는 아이콘 버튼은 `aria-label` |
| 키보드 | `Tab` 포커스 → `Enter`/`Space` 실행 (네이티브) |
| 금지 | `div/span 클릭 핸들러 패턴` (R-10) · `<button>` 안 `<a>` 중첩 · disabled 상태 표현으로 `.btn--disabled` 클래스만 (속성 `disabled` 또는 `aria-disabled` 같이 사용) |

### `check-radio` — 체크박스/라디오

| 항목 | 값 |
|------|-----|
| Root 태그 | `<label class="check">` 또는 `<label class="radio">` (인풋을 감쌈) |
| 자식 시맨틱 | `<input type="checkbox|radio">` (필수, 가시화는 CSS) → `<span class="check__box" aria-hidden="true">` (커스텀 박스 시각) → `<span class="check__label">텍스트</span>` |
| 그룹 | 라디오 그룹은 `<fieldset>` + `<legend>` 필수 |
| 필수 ARIA | 커스텀 시각 박스는 `aria-hidden="true"` (네이티브 input이 정보 담당) |
| 키보드 | 네이티브 (`Space` 토글, 라디오는 `↑↓←→`) |
| 금지 | `<input>` 숨김 + `<div>`로만 표현 · `<label>` 없이 `placeholder`만 |

### `file-upload` — 파일 업로드

| 항목 | 값 |
|------|-----|
| Root 태그 | `<label class="file-upload">` (인풋 감쌈) |
| 자식 시맨틱 | `<input type="file">` (필수) → `<span class="file-upload__trigger">` (트리거 시각) → `<span class="file-upload__filename">` (선택 파일명 표시) |
| 필수 속성 | `accept` (허용 MIME) 권장 |
| 필수 ARIA | 트리거가 별도 버튼이면 `aria-controls="file-input-id"` |
| 키보드 | 네이티브 (Tab → Enter/Space) |

### `form` — 폼 필드

| 항목 | 값 |
|------|-----|
| Root 태그 | `<div class="form-field">` (한 필드 단위) |
| 자식 시맨틱 | `<label for="id">` (필수) → `<input id="id">` → `<p class="form-field__help" id="hint-id">` (도움말) → `<p class="form-field__message" id="err-id">` (에러) |
| 필수 ARIA | 에러 시 `aria-invalid="true"` + `aria-describedby="err-id"` / 필수 표시 `<span aria-label="필수">*</span>` |
| 그룹 | 관련 필드는 `<fieldset>` + `<legend>` |
| 키보드 | 네이티브 |
| 금지 | `placeholder`만으로 레이블 대체 |

### `select` — 셀렉트

| 항목 | 값 |
|------|-----|
| Root 태그 | `<div class="form-field">` (form 필드 단위로 감쌈) |
| 자식 시맨틱 | `<label for="id">` → `<select id="id" class="select">` → `<option>` |
| 커스텀 드롭다운 | 네이티브 `<select>` 우선. 커스텀 필요 시 `role="combobox"` + `aria-expanded` + `aria-controls` + `aria-activedescendant` 패턴 (WAI-ARIA Combobox) |
| 키보드 | 네이티브 (`↑↓` 옵션 이동, `Enter` 선택) |

### `switch` — 토글 스위치

| 항목 | 값 |
|------|-----|
| Root 태그 | `<label class="switch">` (인풋 감쌈) |
| 자식 시맨틱 | `<input type="checkbox" role="switch">` (필수, 시맨틱 명시 위해 `role="switch"` 추가) → `<span class="switch__track" aria-hidden="true">` → `<span class="switch__thumb" aria-hidden="true">` → `<span class="switch__label">` |
| 필수 ARIA | `role="switch"` (네이티브 checkbox 위에 의도 명시) / 상태는 native `checked` |
| 키보드 | 네이티브 (`Space` 토글) |

---

## 2. 그룹 B — 컨테이너/레이아웃 (6종)

### `accordion` — 아코디언

| 항목 | 값 |
|------|-----|
| Root 태그 | `<div class="accordion">` |
| 자식 시맨틱 | **A안 (권장, 단순)**: `<details class="accordion__item">` + `<summary class="accordion__summary">` (네이티브) <br>**B안 (커스텀)**: `<button class="accordion__summary" aria-expanded aria-controls="panel-id">` + `<div id="panel-id" role="region" aria-labelledby="trigger-id">` |
| 필수 ARIA (B안) | `aria-expanded` (상태) · `aria-controls` (패널 연결) · panel에 `role="region"` + `aria-labelledby` |
| 키보드 | `Tab` 항목 간 이동 · `Space`/`Enter` 펼침. A안은 네이티브 |

### `card` — 카드

| 항목 | 값 |
|------|-----|
| Root 태그 | `<article class="card">` (독립 콘텐츠) / `<section class="card">` (관련 그룹, 제목 필수) / `<a class="card">` (카드 전체가 링크) |
| 자식 시맨틱 | `<header class="card__header">` → `<h3 class="card__title">` (heading) → `<div class="card__body">` → `<footer class="card__footer">` / 미디어 영역은 `<figure class="card__media">` |
| 필수 ARIA | — (시맨틱 태그만으로 충분) |
| 인터랙션 | 카드 전체 링크면 `<a class="card">`. 카드 내부에 또 `<a>` 두면 이중 링크 금지 |

### `disclosure` — 펼침 토글

| 항목 | 값 |
|------|-----|
| Root 태그 | `<button type="button" class="disclosure">` (트리거 자체가 root) |
| 자식 시맨틱 | 트리거 다음에 `<div id="panel-id" class="disclosure__panel">` (sibling) |
| 필수 ARIA | 트리거에 `aria-expanded="true|false"` · `aria-controls="panel-id"` |
| 키보드 | `Tab` → `Space`/`Enter` 펼침 |

### `modal` — 모달/다이얼로그

| 항목 | 값 |
|------|-----|
| Root 태그 | **A안 (권장)**: `<dialog class="modal">` (네이티브) <br>**B안 (폴백)**: `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">` |
| 자식 시맨틱 | `<header class="modal__header">` → `<h2 id="modal-title" class="modal__title">` → `<div class="modal__body">` → `<footer class="modal__footer">` |
| 필수 ARIA (B안) | `role="dialog"` · `aria-modal="true"` · `aria-labelledby="modal-title"` (또는 `aria-label`) / 닫기 버튼 `aria-label="닫기"` |
| 키보드 | `Esc` 닫기 · `Tab`/`Shift+Tab` 모달 내부 포커스 트랩 · 열릴 때 첫 인터랙티브 요소로 포커스 이동 · 닫힐 때 트리거로 포커스 복귀 |
| 금지 | `<dialog>` 단독 사용 (Safari 15.4 미만 폴백 필요) |

### `side-panel` — 사이드 패널

| 항목 | 값 |
|------|-----|
| Root 태그 | `<aside class="side-panel" role="dialog" aria-labelledby="panel-title" aria-hidden="true">` |
| 자식 시맨틱 | `<header class="side-panel__header">` → `<h2 id="panel-title" class="side-panel__title">` → `<div class="side-panel__body">` → `<footer class="side-panel__footer">` (선택) |
| 필수 ARIA | `role="dialog"` · `aria-labelledby` · `aria-hidden` (열림/닫힘 상태) / 모달 모드면 `aria-modal="true"` 추가 |
| 키보드 | modal과 동일 (Esc 닫기, 포커스 트랩, 포커스 복귀) |

### `tab` — 탭

| 항목 | 값 |
|------|-----|
| Root 태그 | `<div class="tab">` |
| 자식 시맨틱 | `<div class="tab__list" role="tablist" aria-label="...">` → `<button class="tab__item" role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">` → `<div id="panel-1" role="tabpanel" aria-labelledby="tab-1">` |
| 필수 ARIA | tablist에 `role="tablist"` + `aria-label` · 각 탭에 `role="tab"` + `aria-selected` + `aria-controls` + 고유 `id` · 패널에 `role="tabpanel"` + `aria-labelledby` |
| 키보드 | `←→` 탭 이동 · `Home`/`End` 처음/끝 · `Enter`/`Space` 활성화 · 비활성 탭은 `tabindex="-1"`, 활성 탭만 `tabindex="0"` |

---

## 3. 그룹 C — 내비게이션 (4종)

### `breadcrumb` — 빵부스러기

| 항목 | 값 |
|------|-----|
| Root 태그 | `<nav class="breadcrumb" aria-label="페이지 경로">` |
| 자식 시맨틱 | `<ol class="breadcrumb__list">` → `<li class="breadcrumb__item">` → `<a class="breadcrumb__link">` (마지막 항목은 `<span>` + `aria-current="page"`) |
| 필수 ARIA | `<nav aria-label>` · 현재 페이지에 `aria-current="page"` |
| 키보드 | 네이티브 (Tab) |

### `header` — 사이트 헤더

| 항목 | 값 |
|------|-----|
| Root 태그 | `<header class="site-header">` |
| 자식 시맨틱 | `<a class="site-header__brand" href="/">` (로고/홈) → `<nav>` (주 메뉴, main-menu 참조) → 검색/유틸리티 영역 |
| 필수 ARIA | 페이지에 nav가 여러 개면 각 nav에 `aria-label` 필수 |
| 키보드 | Tab 흐름 자연스럽게 (브랜드 → 메뉴 → 유틸) |

### `main-menu` — 주 메뉴

| 항목 | 값 |
|------|-----|
| Root 태그 | `<nav class="main-menu" aria-label="주 메뉴">` |
| 자식 시맨틱 | `<ul class="main-menu__list">` → `<li class="main-menu__item">` → `<a class="main-menu__link">` / 하위 메뉴 트리거는 `<button aria-expanded aria-haspopup="true" aria-controls="submenu-id">` |
| 필수 ARIA | `<nav aria-label>` · 드롭다운 트리거에 `aria-expanded` + `aria-haspopup` + `aria-controls` · 현재 페이지에 `aria-current="page"` |
| 키보드 | `←→` 또는 `↑↓` 메뉴 이동 · `Esc` 서브메뉴 닫기 · `Enter`/`Space` 서브메뉴 열기 |

### `pagination` — 페이지네이션

| 항목 | 값 |
|------|-----|
| Root 태그 | `<nav class="pagination" aria-label="페이지 내비게이션">` |
| 자식 시맨틱 | `<button class="pagination__nav" aria-label="이전 페이지">` → `<ol class="pagination__list">` → `<li>` → `<a class="pagination__link">` (현재 페이지는 `aria-current="page"`) → `<button class="pagination__nav" aria-label="다음 페이지">` |
| 필수 ARIA | `<nav aria-label>` · 현재 페이지에 `aria-current="page"` · 텍스트 없는 화살표 버튼에 `aria-label` |
| 키보드 | 네이티브 (Tab) |

---

## 4. 그룹 D — 피드백 (8종)

### `alert` — 알림

| 항목 | 값 |
|------|-----|
| Root 태그 | `<div class="alert" role="alert">` (긴급) 또는 `<div class="alert" role="status">` (정보) |
| 자식 시맨틱 | `<div class="alert__icon" aria-hidden="true">` (장식 아이콘) → `<div class="alert__body">` → `<button class="alert__close" aria-label="닫기">` (선택) |
| 필수 ARIA | `role="alert"` (assertive) 또는 `role="status"` (polite) · 장식 아이콘에 `aria-hidden="true"` · 닫기 버튼에 `aria-label` |
| 키보드 | 닫기 버튼 Tab 가능, Enter/Space로 닫기 |

### `badge` — 뱃지

| 항목 | 값 |
|------|-----|
| Root 태그 | `<span class="badge">` (장식/카운트) |
| 텍스트 없는 뱃지 (dot) | `<span class="badge badge--dot" aria-label="새 알림 있음">` (설명 필수) |
| 필수 ARIA | 텍스트가 의미를 담으면 그대로 / 점/색만으로 의미 전달 시 `aria-label` 필수 |
| 키보드 | 인터랙티브 아니면 해당 없음 |

### `progress` — 진행률

| 항목 | 값 |
|------|-----|
| Root 태그 | `<div class="progress">` |
| 자식 시맨틱 | `<div class="progress__label">` (선택, 시각 레이블) → `<progress class="progress__bar" value="40" max="100">` (네이티브) 또는 `<div role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" aria-label="...">` |
| 필수 ARIA | 네이티브 `<progress>` 우선. 커스텀 시 `role="progressbar"` + `aria-valuenow` + `aria-valuemin` + `aria-valuemax` + `aria-label` |

### `spinner` — 로딩 스피너

| 항목 | 값 |
|------|-----|
| Root 태그 | `<span class="spinner" role="status" aria-label="로딩 중">` |
| 필수 ARIA | `role="status"` · `aria-label` 필수 (시각 텍스트 없을 때) |
| 모션 감소 | `prefers-reduced-motion: reduce` 시 회전 애니메이션 정지 |

### `step-indicator` — 진행 단계

| 항목 | 값 |
|------|-----|
| Root 태그 | `<ol class="step-indicator" aria-label="진행 단계">` |
| 자식 시맨틱 | `<li class="step-indicator__item">` → `<span class="step-indicator__num" aria-hidden="true">` (번호 시각) → `<span class="step-indicator__label">` |
| 필수 ARIA | `<ol aria-label>` · 현재 단계에 `aria-current="step"` · 번호 시각에 `aria-hidden="true"` (label로 충분) · 완료/현재/대기 상태는 BEM modifier(`--done`/`--current`/`--todo`) |
| 키보드 | 인터랙티브이면 각 항목 `<a>` 또는 `<button>` |

### `tag` — 태그

| 항목 | 값 |
|------|-----|
| Root 태그 | `<span class="tag">` (장식) / `<button type="button" class="tag">` (인터랙티브) |
| 자식 시맨틱 | 삭제 가능한 태그는 내부 `<button class="tag__close" aria-label="...태그 제거">` |
| 필수 ARIA | 텍스트 없는 닫기 버튼에 `aria-label` |

### `toast` — 토스트

| 항목 | 값 |
|------|-----|
| Root 태그 | `<div class="toast-stack">` (컨테이너) → `<div class="toast" role="status">` (개별 토스트) |
| 자식 시맨틱 | `<span class="toast__icon" aria-hidden="true">` → `<div class="toast__body">` → `<button class="toast__close" aria-label="닫기">` |
| 필수 ARIA | `role="status"` (polite, 비긴급) 또는 `role="alert"` (긴급) · 장식 아이콘 `aria-hidden` · 닫기 버튼 `aria-label` |
| 자동 사라짐 | 모션 감소 사용자엔 자동 닫기 비활성화 또는 시간 연장 권장 |

### `tooltip` — 툴팁

| 항목 | 값 |
|------|-----|
| Root 태그 | 트리거 + 툴팁 두 요소가 sibling: `<button class="tooltip-trigger" aria-describedby="tip-1">` + `<div id="tip-1" class="tooltip" role="tooltip">` |
| 필수 ARIA | 트리거에 `aria-describedby="tooltip-id"` · 툴팁 요소에 `role="tooltip"` |
| 키보드 | 트리거 포커스 시 표시 · `Esc`로 즉시 닫기 · 마우스 호버와 키보드 포커스 모두 트리거 |
| 금지 | 툴팁 안에 인터랙티브 요소(버튼/링크) — 키보드 접근 어려움 |

---

## 5. 그룹 E — 콘텐츠/표현 (4종)

### `calendar` — 달력

| 항목 | 값 |
|------|-----|
| Root 태그 | `<div class="calendar" role="application" aria-label="날짜 선택">` |
| 자식 시맨틱 | `<div class="calendar__head">` (월 표시 + 네비게이션) → `<button class="calendar__nav" aria-label="이전 달">` / `<button class="calendar__nav" aria-label="다음 달">` → `<table class="calendar__grid" role="grid">` → `<th scope="col">` (요일) → `<button class="calendar__day" aria-label="...">` |
| 필수 ARIA | `role="application"` (커스텀 위젯) · 네비 버튼 `aria-label` · 각 날짜 `aria-label`(예: "2026년 5월 12일") · 선택 날짜 `aria-selected="true"` · 오늘 `aria-current="date"` · 비활성 날짜 `aria-disabled="true"` |
| 키보드 | `←→` 일 · `↑↓` 주 · `PageUp/PageDown` 월 · `Home`/`End` 주 시작/끝 · `Enter`/`Space` 선택 |

### `carousel` — 캐러셀

| 항목 | 값 |
|------|-----|
| Root 태그 | `<div class="carousel" aria-roledescription="carousel" aria-label="추천 항목">` |
| 자식 시맨틱 | `<div class="carousel__viewport">` → `<ol class="carousel__track">` → `<li class="carousel__slide" aria-roledescription="slide" aria-label="3 of 5">` → 컨트롤 `<button aria-label="이전 슬라이드">` / `<button aria-label="일시정지">` / `<button aria-label="다음 슬라이드">` |
| 필수 ARIA | `aria-roledescription="carousel"` · 각 슬라이드에 `aria-roledescription="slide"` + `aria-label="N of M"` · 컨트롤 `aria-label` · 자동재생 시 일시정지 버튼 필수(WCAG 2.2.2) |
| 자동 재생 금지 (KRDS) | 사용자가 명시 활성화 안 했으면 OFF. 활성화 시 일시정지 버튼 필수 |
| 키보드 | `←→` 슬라이드 이동 · `Esc` 또는 일시정지 버튼으로 정지 |

### `list` — 목록

| 항목 | 값 |
|------|-----|
| Root 태그 | `<ul class="list">` (순서 무관) / `<ol class="list">` (순서 의미) / `<dl class="list">` (정의 목록) |
| 자식 시맨틱 | `<li>` (ul/ol) / `<dt>` + `<dd>` (dl) |
| 변형 | `.list--text` (텍스트 목록) / `.list--bullet` (불릿) / `.list--ordered` (번호) / `.list--description` (정의) |
| 필수 ARIA | — (시맨틱 태그만으로 충분) |

### `table` — 테이블

| 항목 | 값 |
|------|-----|
| Root 태그 | `<div class="table-wrap">` (반응형 스크롤 래퍼) → `<table class="table">` |
| 자식 시맨틱 | `<caption class="table__caption">` (필수) → `<thead>` → `<tr>` → `<th scope="col">` → `<tbody>` → `<tr>` → `<th scope="row">` (행 헤더 필요 시) / `<td>` |
| 필수 ARIA | `<caption>` 또는 `aria-label` (테이블 설명 필수) · `<th>`에 `scope="col"` 또는 `scope="row"` · 정렬 가능 헤더 `aria-sort="ascending|descending|none"` · 선택 가능 행 `aria-selected` |
| 키보드 | 정렬 헤더는 `<button>` 안에 텍스트 · 행 선택은 체크박스 |
| 금지 | 레이아웃 용도로 `<table>` 사용 |

---

## 6. 부록 — 공통 규정

### 6.1 ID 명명 규칙

ARIA로 연결되는 ID는 충돌 방지를 위해 다음 패턴:

```
{컴포넌트}-{기능}-{인스턴스}
예: modal-title-confirm, tab-payment, accordion-faq-1
```

### 6.2 상태 표현 (R-17)

| 상태 | 표현 |
|------|------|
| 활성/선택 | BEM modifier (`.tab__item--selected`) + ARIA (`aria-selected="true"`) |
| 비활성 | 네이티브 `disabled` 속성 + (필요 시) `aria-disabled="true"` |
| 펼침 | ARIA `aria-expanded` (시각은 modifier 또는 ARIA 셀렉터로) |
| 숨김 | `hidden` 속성 (display:none 동등) 또는 `aria-hidden="true"` (스크린리더만) |
| 로딩 | `role="status"` + `aria-busy="true"` |

**금지**: `.is-active`, `.has-error`, `.is-open` 같은 비-BEM 상태 클래스 (R-17 위반).

### 6.3 modifier 의미성 (R-06, R-18)

**금지 단어 (시각적 표현)**: `--big`, `--small`, `--large`, `--xl`, `--xxl`, `--red`, `--blue`, `--green`, `--yellow`, `--rounded`, `--shadow`, `--bold`, `--italic`

**허용 단어 (의미적)**:
- 변형(variant): `--primary`, `--secondary`, `--tertiary`, `--text`, `--ghost` (KRDS 정의 한정)
- 사이즈(KRDS 스케일): `--xsmall`, `--small`, `--medium`, `--large`, `--xlarge`
- 상태: `--selected`, `--disabled`, `--expanded`, `--loading`, `--error`, `--success`, `--current`, `--done`, `--todo`
- 톤: `--info`, `--success`, `--warning`, `--danger`, `--inverse`
- 레이아웃: `--horizontal`, `--vertical`, `--block`, `--inline`

### 6.4 키보드 트랩 — modal/side-panel만

`<dialog>` 또는 `role="dialog" aria-modal="true"`에서만 포커스 트랩. 그 외 컴포넌트는 자연스러운 Tab 흐름 유지.

### 6.5 라이브 영역 (`aria-live`) 선택 가이드

| 긴급도 | 속성 |
|--------|------|
| 긴급 (오류·경고) | `role="alert"` (`aria-live="assertive"` 자동 부여됨) |
| 일반 (저장 완료·로딩) | `role="status"` (`aria-live="polite"` 자동 부여됨) |
| 사용자 직접 트리거 (form submit 결과) | `aria-live="polite"` + `aria-atomic="true"` |

### 6.6 wrapper 최소화 — 이유 없는 div 금지

무의미한 래핑은 접근성(스크린리더가 빈 계층을 훑음), CSS 복잡도(cascade 깊이·`@apply` 사슬), 유지보수, DOM 무게를 모두 해친다. 다음 기준으로 판별한다.

**제거 대상 (이유 없는 wrapper)**

- 자식이 하나뿐이고 그 자식에 직접 클래스·스타일을 줄 수 있는 `<div>`
- `wrapper > inner > content`처럼 역할이 겹치는 연속 래핑
- `<section>`/`<nav>`/`<ul>`/`<figure>`가 맞는데 쓴 `<div>` (원칙 1·7)
- 스타일 훅도 레이아웃 역할도 없는 순수 껍데기

**남길 대상 (이유 있는 컨테이너)**

- `.container` — 폭·정렬 담당
- flex/grid 레이아웃 부모 — 자식 배치를 실제로 제어
- overflow/스크롤 컨테이너 (`.table-wrap` 등)
- 컴포넌트 루트(BEM Block), `role`을 가진 그룹(`role="radiogroup"`/`role="tablist"` 등)

**판별 질문 하나**: "이 `<div>`를 지우면 레이아웃·의미·접근성 중 무엇이 깨지는가?" — 아무것도 안 깨지면 제거한다.

```html
<!-- ❌ 이유 없는 wrapper: img/ol 하나를 감싸기만 함 -->
<div class="visual-panel__logo">
  <img src="logo.png" alt="감성미식 로고" />
</div>
<div class="diagnosis-steps">
  <ol class="step-indicator" aria-label="진행 단계">...</ol>
</div>

<!-- ✅ 대상 요소에 직접 클래스 -->
<img src="logo.png" alt="감성미식 로고" class="visual-panel__logo" />
<ol class="step-indicator" aria-label="진행 단계">...</ol>
```

> 이 원칙은 자동 강제(error)가 아니라 생성·리뷰 단계 판단 기준이다. "과한 계층"은 맥락 의존적이라 정량 강제 시 오탐이 크다. `review-ui`는 Task Contract·승인 패턴과 대조할 때 이 기준으로 wrapper 깊이를 점검한다.

---

## 7. 검증 자동화 (R-15 / R-16 / R-17 / R-18)

`contracts/html-page-contract.json`과 `scripts/check-html-structure.js`가 page shell 및 컴포넌트 구조를 자동 검증:

1. **R-14/R-15** — page shell의 skip link, `header#header`, `main#main`, `footer#footer`, `main > section > .container`, section 접근 이름
2. **R-15** — 컴포넌트 BEM Block(`.card`/`.modal` 등) 사용 시 root 태그가 매핑과 일치하는지
3. **R-16** — 인터랙티브 컴포넌트(`modal`/`tab`/`accordion`/`tooltip`/`disclosure`/`carousel`/`calendar`)는 필수 ARIA 속성 누락 시 error
4. **R-17** — `.is-*`/`.has-*` 비-BEM 상태 클래스 사용 시 warn → 1개월 후 error 승급
5. **R-18** — § 6.3 금지 단어 modifier 사용 시 error

---

## 8. 출처

- KRDS-uiux v1.0.0 공식 컴포넌트 가이드
- WAI-ARIA 1.2 Authoring Practices Guide (APG)
- WCAG 2.1 Level AA + KWCAG 2.1/2.2
- `src/snippets/*.md` 실측 패턴 (28종, 2026-05-04 빌드 기준)
- `references/krds-source.md` (KRDS 원본 수집 자료, 2026-04-30)

---

> 본 문서는 단일 소스(SoT)다. 28종 외 컴포넌트 추가 또는 매핑 변경 시:
> 1. UX팀 결정 → 2. `src/snippets/*.md` 갱신 → 3. 본 문서 갱신 → 4. `npm run build:rules` → 5. CLAUDE.md/site 자동 반영
