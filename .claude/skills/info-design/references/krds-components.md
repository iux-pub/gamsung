# KRDS 컴포넌트 카탈로그

> 자동 생성됨. 직접 수정 금지.
> 출처: `src/snippets/*.md`
> 빌드: 1d1b51d

아래 카탈로그에 없는 컴포넌트는 임의 생성 금지. § "카탈로그에 없는 컴포넌트 요구 시" 절차 따름.

---

## 인덱스

- **그룹 A — 폼/액션**: [btn](#btn) · [check-radio](#check-radio) · [file-upload](#file-upload) · [form](#form) · [select](#select) · [switch](#switch)
- **그룹 B — 컨테이너/레이아웃**: [accordion](#accordion) · [card](#card) · [disclosure](#disclosure) · [modal](#modal) · [side-panel](#side-panel) · [tab](#tab)
- **그룹 C — 내비게이션**: [breadcrumb](#breadcrumb) · [header](#header) · [main-menu](#main-menu) · [pagination](#pagination)
- **그룹 D — 피드백**: [alert](#alert) · [badge](#badge) · [progress](#progress) · [spinner](#spinner) · [step-indicator](#step-indicator) · [tag](#tag) · [toast](#toast) · [tooltip](#tooltip)
- **그룹 E — 콘텐츠/표현**: [calendar](#calendar) · [carousel](#carousel) · [list](#list) · [table](#table)

---

## 그룹 A — 폼/액션

##### 버튼 (Button) — KRDS {#btn}

#### 기본 마크업

```html
<button type="button" class="btn btn--primary">버튼 텍스트</button>
```

#### Variant (KRDS 정의 — 4종)

| Variant | 클래스 | 용도 |
|---------|--------|------|
| Primary | `.btn--primary` | 메인 CTA (저장, 제출, 확인) |
| Secondary | `.btn--secondary` | 보조 액션 (primary 톤 옅은 채움 + primary border) |
| Tertiary | `.btn--tertiary` | 약한 액션 (투명 + gray border) |
| Text | `.btn--text` | 텍스트 링크형 (배경/border 없음) |

#### Size (KRDS 정의 — 5종)

| Size | 클래스 | 높이 | padding-x | 사용 권장 |
|------|--------|------|-----------|----------|
| xsmall | `.btn--xsmall` | 32px | 10px | 데스크탑 dense UI 한정 |
| small | `.btn--small` | 40px | 12px | 데스크탑 보조 액션 |
| medium | (기본 — 클래스 없음) | 48px | 16px | **모바일·기본 권장** |
| large | `.btn--large` | 56px | 20px | 강조 CTA |
| xlarge | `.btn--xlarge` | 64px | 24px | 히어로/랜딩 CTA |

> **모바일 환경에선 medium(48px) 이상 사용.** xsmall(32) · small(40)은 WCAG 권장 터치 영역(44px)보다 작아 모바일 부적합.

#### 조합 예시

```html
<!-- 기본(medium) -->
<button type="button" class="btn btn--primary">저장</button>
<button type="button" class="btn btn--secondary">취소</button>
<button type="button" class="btn btn--tertiary">더보기</button>
<button type="button" class="btn btn--text">자세히 보기</button>

<!-- 사이즈 조합 -->
<button type="button" class="btn btn--primary btn--small">작게</button>
<button type="button" class="btn btn--primary btn--large">크게</button>

<!-- 비활성 -->
<button type="button" class="btn btn--primary" disabled>비활성</button>

<!-- Block (full width) -->
<button type="button" class="btn btn--primary btn--block">제출</button>
```

#### 접근성 (KRDS + WCAG 2.1 AA)

- `<button type="button">` 태그 사용 필수. `<a>` 태그를 버튼 용도로 쓰지 않는다
- 아이콘만 있는 버튼은 `aria-label` 필수: `<button class="btn" aria-label="메뉴 열기">...</button>`
- 비활성은 `disabled` 속성 (또는 `aria-disabled="true"`)
- 포커스 outline은 `reset.css`에서 전역 관리 (4px primary 외곽선) — 컴포넌트에서 제거 금지
- `prefers-reduced-motion` 대응: 모션 감소 설정 시 transition 자동 비활성 (Phase 6에서 추가)

#### 출처

- KRDS 버튼 명세: https://www.krds.go.kr/html/site/component/component_summary.html
- 색상: `--color-button-*`, `--color-text-*`
- 크기/간격/반경: CSS/Tailwind 직접값
- CSS: `src/styles/6-components/btn.css`


---

##### 체크박스 & 라디오 — KRDS Form check {#check-radio}

#### 기본 마크업

##### 체크박스

```html
<label class="check">
  <input type="checkbox" name="agree" value="true">
  <span class="check__box" aria-hidden="true"></span>
  <span class="check__label">개인정보 수집·이용에 동의합니다</span>
</label>
```

##### 라디오

```html
<fieldset>
  <legend class="form-field__label">결제 수단</legend>
  <label class="radio">
    <input type="radio" name="pay" value="card" checked>
    <span class="radio__box" aria-hidden="true"></span>
    <span class="radio__label">신용카드</span>
  </label>
  <label class="radio">
    <input type="radio" name="pay" value="bank">
    <span class="radio__box" aria-hidden="true"></span>
    <span class="radio__label">계좌이체</span>
  </label>
</fieldset>
```

#### 시맨틱 구조

- **Root 태그**: `<label class="check">` 또는 `<label class="radio">` (input을 감쌈)
- **자식**: `<input type="checkbox|radio">` → `<span __box aria-hidden="true">` (시각 박스) → `<span __label>` (텍스트)
- **그룹**: 라디오는 `<fieldset>` + `<legend>` 필수
- **필수 ARIA**: 시각 박스에 `aria-hidden="true"` — native input이 정보를 담당
- 상세: `skill/references/html-semantics.md#check-radio`

#### 사양

- 박스 크기: 24×24
- 컨테이너 최소 높이: `--touch-target-min` (44px)
- native `<input>`은 시각적으로 숨김 (sr-only) — 키보드/스크린리더는 정상 작동

#### 접근성

- `<label>`로 input + box + 텍스트를 묶어 클릭 영역 전체 확보
- 라디오 그룹은 `<fieldset><legend>`로 묶기
- 시각 박스(`__box`)는 `aria-hidden="true"` (스크린리더는 native input만 인식)

#### 출처

- CSS: `src/styles/6-components/check-radio.css`


---

##### 파일 업로드 (File Upload) — KRDS {#file-upload}

#### 기본 마크업

```html
<label class="file-upload">
  <input type="file" id="file" accept="image/*">
  <span class="file-upload__trigger">파일 선택</span>
  <span class="file-upload__filename" aria-live="polite">선택된 파일 없음</span>
</label>
```

> 파일명 표시는 JS로 갱신 — `input.files[0].name`을 `.file-upload__filename`에 채워 넣는다.

#### 다중 선택

```html
<label class="file-upload">
  <input type="file" id="docs" multiple accept=".pdf,.doc,.docx">
  <span class="file-upload__trigger">문서 선택</span>
  <span class="file-upload__filename">선택된 파일 없음</span>
</label>
```

#### 접근성

- `<label>`로 input과 트리거를 묶어 키보드 포커스 시 트리거 외곽선 노출
- `aria-live="polite"`로 파일명 변경을 스크린리더에 안내
- `accept` 속성으로 허용 파일 타입 명시 (브라우저 필터링 + 사용자 안내)
- 업로드 진행률은 별도 `<progress>` 또는 토스트로 표시

#### 출처

- CSS: `src/styles/6-components/file-upload.css`


---

##### 폼 필드 (Form Field) — KRDS {#form}

KRDS 입력폼 구성: **레이블 → 보조설명 → 입력박스 → 시스템메시지** (요소 간 8px gap)

#### 기본 마크업 (텍스트 입력)

```html
<div class="form-field">
  <label for="name" class="form-field__label">
    이름<span class="form-field__required" aria-label="필수">*</span>
  </label>
  <p class="form-field__hint">사업자등록증에 기재된 대표자명</p>
  <input type="text" id="name" class="input" placeholder="홍길동" required>
  <p class="form-field__message">최대 20자까지 입력 가능합니다</p>
</div>
```

#### 에러 상태

```html
<div class="form-field">
  <label for="email" class="form-field__label">이메일</label>
  <input type="email" id="email" class="input input--error" aria-invalid="true" aria-describedby="email-error" value="invalid">
  <p id="email-error" class="form-field__message form-field__message--error">올바른 이메일 형식이 아닙니다</p>
</div>
```

#### Textarea

```html
<div class="form-field">
  <label for="memo" class="form-field__label">메모</label>
  <textarea id="memo" class="textarea" rows="4" placeholder="내용을 입력하세요"></textarea>
</div>
```

#### Input 사이즈

| Size | 클래스 | 높이 |
|------|--------|------|
| small | `.input--small` | 40px |
| medium | (기본) | 48px |
| large | `.input--large` | 56px |

#### Input type

`type="text|email|password|number|tel|url|search|date|time|datetime-local"` 모두 동일 스타일 적용.

#### 상태

- 기본 — `border: 1px solid var(--color-input-border)`
- focus — `border-color: var(--color-input-border-active)` (primary)
- disabled — 회색 배경 + disabled 텍스트, `cursor: not-allowed`
- read-only — `:read-only`로 자동 처리
- error — `.input--error` 또는 `aria-invalid="true"`

#### 접근성

- `<label for="id">` + `<input id="id">` 연결 필수
- 필수 항목은 `required` 속성 + 시각 표시(`*`)
- 에러는 `aria-invalid="true"` + `aria-describedby="에러메시지id"`
- 보조설명은 `aria-describedby`로 연결 권장
- placeholder만으로 레이블 대체 금지

#### 출처

- KRDS 입력 명세: https://www.krds.go.kr/html/site/component/component_summary.html
- CSS: `src/styles/6-components/form.css`


---

##### 셀렉트 (Select) — KRDS {#select}

native `<select>` 기반. input과 동일 사이즈/패딩 토큰.

#### 기본 마크업

```html
<div class="form-field">
  <label for="category" class="form-field__label">카테고리</label>
  <select id="category" class="select">
    <option value="">선택하세요</option>
    <option value="a">옵션 A</option>
    <option value="b">옵션 B</option>
  </select>
</div>
```

#### 사이즈

- `.select--small` (40px) / 기본 medium (48px) / `.select--large` (56px)

#### 상태

- 기본 / hover / focus / disabled / error (`.select--error` 또는 `aria-invalid="true"`)

#### 접근성

- 첫 옵션은 `<option value="">선택하세요</option>` 같은 placeholder 권장
- `<label for>` + `<select id>` 연결 필수
- 옵션 텍스트는 명확하고 간결하게

#### 출처

- CSS: `src/styles/6-components/select.css`


---

##### 토글 스위치 (Switch) — KRDS {#switch}

#### 기본 마크업

```html
<label class="switch">
  <input type="checkbox" name="notify" role="switch">
  <span class="switch__track" aria-hidden="true"></span>
  <span class="switch__label">알림 받기</span>
</label>
```

#### 사양

- 트랙: 44×24, 핸들: 20×20
- 컨테이너 최소 높이: `--touch-target-min` (44px)
- ON/OFF 즉시 반영되는 설정에 사용 (저장 버튼 없이 즉시 토글)

#### 체크박스 vs 스위치 사용 기준

- **체크박스**: 옵션 선택, 동의(약관), 폼 제출과 함께 저장
- **스위치**: 즉시 효과 발생하는 ON/OFF 설정 (알림 ON/OFF, 다크모드 등)

#### 접근성

- `role="switch"` 권장 — 스크린리더가 "스위치"로 안내
- 시각 트랙(`__track`)은 `aria-hidden="true"`
- 상태 변경은 native `:checked`만으로 충분 (별도 aria-checked 불필요)

#### 출처

- CSS: `src/styles/6-components/switch.css`


---

## 그룹 B — 컨테이너/레이아웃

##### 아코디언 (Accordion) — KRDS {#accordion}

native `<details>`/`<summary>` 활용 — JS 없이 동작.

#### 기본 마크업

```html
<div class="accordion">
  <details class="accordion__item">
    <summary class="accordion__summary">자주 묻는 질문 1</summary>
    <div class="accordion__panel">
      <p>답변 1 내용</p>
    </div>
  </details>
  <details class="accordion__item">
    <summary class="accordion__summary">자주 묻는 질문 2</summary>
    <div class="accordion__panel">
      <p>답변 2 내용</p>
    </div>
  </details>
  <details class="accordion__item" open>
    <summary class="accordion__summary">기본 열린 항목</summary>
    <div class="accordion__panel">
      <p><code>open</code> 속성으로 초기 열림 상태</p>
    </div>
  </details>
</div>
```

#### 단일 열림 (한 번에 하나만)

`<details name="group">`을 같은 `name`으로 묶으면 한 번에 하나만 열림 (모던 브라우저).

```html
<div class="accordion">
  <details class="accordion__item" name="faq"><summary class="accordion__summary">Q1</summary>...</details>
  <details class="accordion__item" name="faq"><summary class="accordion__summary">Q2</summary>...</details>
</div>
```

#### 접근성

- native `<details>`/`<summary>` 사용 시 키보드/스크린리더 자동 지원
- `<summary>`는 자동으로 button role + aria-expanded 처리됨 — 별도 ARIA 불필요
- 최소 터치 영역 보장: `--touch-target-min` (44px)

#### 출처

- CSS: `src/styles/6-components/accordion.css`


---

##### 카드 (Card) — KRDS {#card}

#### 기본 마크업

```html
<article class="card">
  <header class="card__header">
    <h3 class="card__title">카드 제목</h3>
  </header>
  <div class="card__body">
    <p>카드 본문 내용</p>
  </div>
  <footer class="card__footer">
    <button type="button" class="btn btn--text btn--small">자세히</button>
  </footer>
</article>
```

#### 사이즈 (KRDS 정의 — 4종, 반응형)

| 사이즈 | 클래스 | Mobile padding | PC padding |
|--------|--------|---------------|-----------|
| xsmall | `.card--xsmall` | 12px | 16px |
| small | `.card--small` | 20px | 24px |
| medium | (기본) | 24px | 32px |
| large | `.card--large` | 24px | 40px |

#### Variant

- `.card` — 기본 (border-light + 흰 배경)
- `.card--inverse` — 다크 배경 + 흰 텍스트
- `.card--elevated` — border 없이 그림자만 (`--shadow-2`)
- `.card--link` 또는 `<a class="card">` — 호버 시 floating

```html
<a class="card card--link" href="/article/1">
  <div class="card__body">호버 시 그림자 + 살짝 위로 이동</div>
</a>
```

#### 접근성

- 시맨틱 컨테이너: `<article>` (독립 콘텐츠) / `<section>` (관련 섹션) / `<div>` (장식)
- 카드 전체가 링크면 `<a class="card">` 또는 카드 내부 `<a>`만 링크 (이중 링크 금지)
- 카드 내 인터랙티브 요소는 `aria-label`로 컨텍스트 명시 권장

#### 출처

- 카드 padding/반경은 프로젝트 밀도에 맞는 CSS/Tailwind 직접값 사용
- CSS: `src/styles/6-components/card.css`


---

##### 디스클로저 (Disclosure) — KRDS {#disclosure}

단일 "더보기/접기" 토글. Accordion(다중 그룹)과 달리 단독 토글에 사용.

#### 기본 마크업

```html
<button type="button" class="disclosure" aria-expanded="false" aria-controls="more-info">
  자세히 보기
</button>
<div id="more-info" class="disclosure__panel" hidden>
  <p>접혀 있던 추가 정보</p>
</div>
```

#### 동작 (JS — 별도 구현)

```js
const trigger = document.querySelector('.disclosure')
const panel = document.getElementById(trigger.getAttribute('aria-controls'))
trigger.addEventListener('click', () => {
  const expanded = trigger.getAttribute('aria-expanded') === 'true'
  trigger.setAttribute('aria-expanded', !expanded)
  panel.hidden = expanded
})
```

#### Accordion vs Disclosure

| | Accordion | Disclosure |
|---|-----------|-----------|
| 용도 | FAQ, 그룹화된 다중 항목 | 단일 "더보기" 토글 |
| 구조 | `<details>` 그룹 | `<button>` + 패널 |
| 시각 | 아이템 사이 구분선 | 인라인 버튼 |

#### 접근성

- `aria-expanded` 상태값 필수 (열림/닫힘)
- `aria-controls`로 패널 id 연결
- 패널 `hidden` 속성 또는 CSS `display: none` 사용 (레이아웃에서 완전 제거)

#### 출처

- CSS: `src/styles/6-components/disclosure.css`


---

##### 모달 (Modal / Dialog) — KRDS {#modal}

#### 기본 마크업

```html
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
  <div class="modal__overlay"></div>
  <div class="modal__content modal__content--medium">
    <header class="modal__header">
      <h2 id="modal-title" class="modal__title">제목</h2>
      <button type="button" class="modal__close" aria-label="닫기">×</button>
    </header>
    <div class="modal__body">
      <p>모달 본문 내용</p>
    </div>
    <footer class="modal__footer">
      <button type="button" class="btn btn--tertiary">취소</button>
      <button type="button" class="btn btn--primary">확인</button>
    </footer>
  </div>
</div>
```

#### 사이즈

| 사이즈 | 클래스 | max-width |
|--------|--------|-----------|
| small | `.modal__content--small` | 400px |
| medium | (기본) | 560px |
| large | `.modal__content--large` | 800px |
| xlarge | `.modal__content--xlarge` | 1000px |

#### 동작 (JS — 별도 구현)

- 열기: `modal.removeAttribute('hidden')` + 포커스를 모달 내부 첫 요소로 이동
- 닫기: `modal.setAttribute('hidden', '')` + 포커스를 트리거 버튼으로 복귀
- ESC 키 닫기, overlay 클릭 닫기, Tab 트랩 (포커스 가두기)
- 열려 있는 동안 `<body>`에 `overflow: hidden` 적용

#### 접근성 (KRDS + WAI-ARIA)

- `role="dialog"` + `aria-modal="true"` 필수
- `aria-labelledby="제목id"`로 모달 제목 연결 (또는 `aria-label`)
- 본문 설명이 길면 `aria-describedby`도 추가
- 닫기 버튼은 `aria-label="닫기"` 필수
- 첫 포커스는 모달 내부 첫 인터랙티브 요소 (또는 닫기 버튼)
- ESC 키로 닫기 가능
- 백드롭은 `--color-bg-dim`

#### 출처

- Shape 값은 프로젝트 밀도에 맞는 CSS/Tailwind 직접값 사용
- Shadow: `--shadow-3` (KRDS modal-wrap-shadow 추상화)
- CSS: `src/styles/6-components/modal.css`


---

##### 사이드 패널 (Side Panel) — KRDS Help panel 응용 {#side-panel}

우측에서 슬라이드 인하는 보조 패널. 모달과 달리 본문 스크롤을 차단하지 않는다.

#### 기본 마크업

```html
<aside class="side-panel" role="dialog" aria-labelledby="panel-title" aria-hidden="true">
  <header class="side-panel__header">
    <h2 id="panel-title" class="side-panel__title">상세 정보</h2>
    <button type="button" class="side-panel__close" aria-label="닫기">×</button>
  </header>
  <div class="side-panel__body">
    <p>패널 본문 내용</p>
  </div>
  <footer class="side-panel__footer">
    <button type="button" class="btn btn--tertiary">닫기</button>
    <button type="button" class="btn btn--primary">저장</button>
  </footer>
</aside>
```

#### 사이즈

| 사이즈 | 클래스 | max-width |
|--------|--------|-----------|
| small | `.side-panel--small` | 360px |
| medium | (기본) | 480px |
| large | `.side-panel--large` | 640px |

#### 동작 (JS)

- 열기: `panel.setAttribute('aria-hidden', 'false')` (또는 `.side-panel--open` 추가)
- 닫기: `panel.setAttribute('aria-hidden', 'true')`
- transform 트랜지션으로 슬라이드 인/아웃

#### Modal vs Side Panel

| | Modal | Side Panel |
|---|-------|-----------|
| 위치 | 화면 중앙 | 화면 우측 (또는 좌측) |
| 본문 차단 | 차단 (overlay) | 차단 안 함 |
| 용도 | 결정 강제 (확인/취소) | 보조 정보, 편집 폼 |
| 그림자 | shadow-3 (deep) | shadow-2 (medium) |

#### 접근성

- `role="dialog"` + `aria-labelledby`
- 닫기 버튼 `aria-label="닫기"` 필수
- ESC 키 닫기 권장
- 포커스 트랩은 선택 (모달과 달리 본문 인터랙션 허용)
- `aria-hidden` 토글로 스크린리더 노출 제어

#### 출처

- Shadow: `--shadow-2` (KRDS help-panel-shadow 추상화)
- CSS: `src/styles/6-components/side-panel.css`


---

##### 탭 (Tab) — KRDS {#tab}

#### 기본 마크업 (WAI-ARIA tabs pattern)

```html
<div class="tab">
  <div class="tab__list" role="tablist" aria-label="섹션">
    <button class="tab__item" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">
      개요
    </button>
    <button class="tab__item" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" tabindex="-1">
      상세
    </button>
    <button class="tab__item" role="tab" aria-selected="false" aria-controls="panel-3" id="tab-3" tabindex="-1">
      후기
    </button>
  </div>
  <div class="tab__panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1">
    개요 내용
  </div>
  <div class="tab__panel" role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
    상세 내용
  </div>
  <div class="tab__panel" role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>
    후기 내용
  </div>
</div>
```

#### 사이즈

- `.tab__list--small` (40px height) — 보조 컨텍스트
- 기본 (48px) — 표준
- `.tab__list--large` (56px height) — 강조

#### 동작 (JS — 별도 구현)

- 탭 클릭 → 모든 `aria-selected="false"` + 클릭한 탭만 `aria-selected="true"`
- 모든 패널 `hidden` + 활성 탭의 `aria-controls` 패널만 `hidden` 제거
- 키보드 — 좌/우 화살표로 탭 이동, Home/End로 처음/마지막
- 비활성 탭은 `tabindex="-1"`로 Tab 키에서 제외 (활성 탭만 `tabindex` 없음)

#### 접근성 (KRDS + WAI-ARIA)

- `role="tablist"` + 각 탭에 `role="tab"`, 패널에 `role="tabpanel"`
- 탭 ↔ 패널 연결: `aria-controls` (탭 → 패널 id), `aria-labelledby` (패널 → 탭 id)
- 활성 표시는 `aria-selected="true"` (시각 인디케이터는 CSS가 자동 처리)
- `aria-label` 또는 `aria-labelledby`로 탭 그룹의 목적 명시 권장

#### 출처

- CSS: `src/styles/6-components/tab.css`


---

## 그룹 C — 내비게이션

##### 브레드크럼 (Breadcrumb) — KRDS {#breadcrumb}

페이지 경로 표시. 사용자의 현재 위치를 보여주고 상위 페이지로 빠르게 이동할 수 있게 한다.

#### 기본 마크업

```html
<nav class="breadcrumb" aria-label="페이지 경로">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item"><a href="/">홈</a></li>
    <li class="breadcrumb__item"><a href="/services">서비스</a></li>
    <li class="breadcrumb__item" aria-current="page">신청하기</li>
  </ol>
</nav>
```

#### 접근성

- `<nav aria-label="페이지 경로">` 필수 (스크린리더용 식별자)
- `<ol>` 사용 — 순서가 의미를 가짐
- 현재 페이지: `aria-current="page"` + `<a>` 없이 텍스트만 (링크 아님)
- 구분자(`›`)는 CSS `::before`로 그려서 스크린리더에 노출 안 됨 (불필요한 읽기 방지)

#### 출처

- CSS: `src/styles/6-components/breadcrumb.css`


---

##### 사이트 헤더 (Site Header) {#header}

사이트 유형과 무관하게 사용할 수 있는 공통 헤더 패턴. 브랜드 + 주 메뉴 + 액션 영역을 기본으로 하며, 공식 배너·정부 상징·운영기관 식별자는 공공서비스/공공기관에서 적용 대상이 확인된 경우에만 별도 추가한다.

#### 기본 마크업

```html
<header id="header" class="site-header">
  <div class="container site-header__inner">
    <a class="site-header__brand" href="/">
      <img src="/logo.svg" alt="기관명">
      <span class="site-header__brand-name">기관명</span>
    </a>

    <nav class="site-header__nav" aria-label="주 메뉴">
      <ul class="site-header__menu">
        <li><a href="/about">소개</a></li>
        <li><a href="/services" aria-current="page">서비스</a></li>
        <li><a href="/notice">공지</a></li>
      </ul>
    </nav>

    <div class="site-header__actions">
      <button type="button" class="btn btn--text btn--small">로그인</button>
      <button type="button" class="site-header__toggle" aria-label="메뉴 열기" aria-expanded="false">☰</button>
    </div>
  </div>
</header>
```

#### 동작

- 모바일/태블릿 (< 1280px): 주 메뉴 숨김 + 햄버거 토글 노출
- PC (≥ 1280px): 주 메뉴 노출 + 햄버거 숨김
- `position: sticky` 적용 (스크롤 시에도 상단 유지)

#### 접근성

- `<header id="header">` 시맨틱 태그 사용 (페이지당 하나)
- 주 메뉴는 `<nav aria-label="주 메뉴">` (페이지에 nav가 여러 개면 label 필수)
- 현재 페이지 메뉴: `aria-current="page"`
- 모바일 토글: `aria-label="메뉴 열기/닫기"` + `aria-expanded` 상태 토글
- 로고 `<img>` `alt` 텍스트 필수 (KRDS R-09)

#### 조건부 공공/정부 요소

아래 요소는 모든 사이트의 기본값이 아니다.

- 공식 배너: 공공서비스 중 정부 상징 사용이 명시되었거나 과업에서 요구된 경우만 생성
- 정부 상징 로고: 정부 상징 사용 대상 서비스에서만 생성
- 운영기관 식별자: 상위 운영기관 표시가 과업에 포함된 경우만 생성
- 일반사이트, CMS·관리자, 커머스·예약에서는 위 항목을 생성하지 않고 체크리스트에서 N/A 처리

#### 출처

- CSS: `src/styles/6-components/header.css`


---

##### 주 메뉴 (Main Menu) — KRDS {#main-menu}

드롭다운형 주 내비게이션. 헤더 안에서 사용.

#### 기본 마크업

```html
<nav class="main-menu" aria-label="주 메뉴">
  <ul class="main-menu__list">
    <li class="main-menu__item">
      <a class="main-menu__link" href="/about">소개</a>
    </li>

    <li class="main-menu__item">
      <button type="button" class="main-menu__link" aria-haspopup="true" aria-expanded="false" aria-controls="submenu-services">
        서비스
      </button>
      <ul id="submenu-services" class="main-menu__submenu" hidden>
        <li><a href="/services/a">서비스 A</a></li>
        <li><a href="/services/b">서비스 B</a></li>
        <li><a href="/services/c" aria-current="page">서비스 C</a></li>
      </ul>
    </li>

    <li class="main-menu__item">
      <a class="main-menu__link" href="/contact">문의</a>
    </li>
  </ul>
</nav>
```

#### 동작 (JS)

- 드롭다운 토글: `aria-haspopup` 가진 `<button>` 클릭 → 해당 `aria-controls` 서브메뉴 hidden 토글 + `aria-expanded` 토글
- 외부 클릭 시 닫기
- ESC 키로 닫기 + 트리거 버튼으로 포커스 복귀
- 키보드: 화살표로 항목 이동, Enter/Space로 선택

#### 접근성

- 서브메뉴 트리거는 `<button>` 권장 (`<a>` 아님 — 링크가 아니므로)
- `aria-haspopup="true"` + `aria-expanded` 상태값
- `aria-controls`로 서브메뉴 id 연결
- 서브메뉴 `<ul>`은 `hidden` 속성으로 노출 제어
- 현재 페이지: `aria-current="page"`

#### 출처

- CSS: `src/styles/6-components/main-menu.css`


---

##### 페이지네이션 (Pagination) — KRDS {#pagination}

목록을 여러 페이지로 나눠 탐색.

#### 기본 마크업

```html
<nav class="pagination" aria-label="페이지 내비게이션">
  <button type="button" class="pagination__nav" aria-label="이전 페이지">‹</button>
  <ol class="pagination__list">
    <li><a class="pagination__item" href="?p=1">1</a></li>
    <li><a class="pagination__item pagination__item--current" href="?p=2" aria-current="page">2</a></li>
    <li><a class="pagination__item" href="?p=3">3</a></li>
    <li><a class="pagination__item" href="?p=4">4</a></li>
    <li><a class="pagination__item" href="?p=5">5</a></li>
  </ol>
  <button type="button" class="pagination__nav" aria-label="다음 페이지">›</button>
</nav>
```

#### 사이즈

- `.pagination` — 48px (기본)
- `.pagination--small` — 40px

#### 비활성 (첫/마지막 페이지)

```html
<button class="pagination__nav" aria-label="이전 페이지" aria-disabled="true" disabled>‹</button>
```

#### 접근성

- `<nav aria-label="페이지 내비게이션">` 필수
- 현재 페이지: `aria-current="page"`
- 이전/다음 버튼: `aria-label="이전 페이지"` / `aria-label="다음 페이지"` 필수
- `aria-disabled="true"` + `disabled` 같이 사용 (첫/마지막 페이지)

#### 출처

- CSS: `src/styles/6-components/pagination.css`


---

## 그룹 D — 피드백

##### 알림 (Alert / Critical Alerts) — KRDS {#alert}

페이지에 고정 노출되는 정보/경고/오류 메시지.

#### 기본 마크업

```html
<div class="alert alert--info" role="alert">
  <div class="alert__icon" aria-hidden="true">ℹ</div>
  <div class="alert__body">
    <p class="alert__title">신청 기간 안내</p>
    <p class="alert__message">2026년 5월 1일부터 31일까지 신청 가능합니다.</p>
  </div>
  <button type="button" class="alert__close" aria-label="닫기">×</button>
</div>
```

#### Variant

| Variant | 클래스 | 용도 |
|---------|--------|------|
| Info | `.alert--info` | 일반 정보 |
| Success | `.alert--success` | 성공 알림 |
| Warning | `.alert--warning` | 주의 |
| Danger / Critical | `.alert--danger` 또는 `.alert--critical` | 오류·긴급 |

#### 접근성

- 일반 알림: `role="alert"` (즉시 안내) 또는 `role="status"` (정중한 안내)
- 긴급(Critical)은 `role="alert"` + `aria-live="assertive"`
- 일반 정보성은 `role="status"` + `aria-live="polite"` 권장
- 아이콘은 장식용 — `aria-hidden="true"` (텍스트가 의미 전달)
- 닫기 버튼 `aria-label="닫기"` 필수

#### 출처

- CSS: `src/styles/6-components/alert.css`


---

##### 배지 (Badge) — KRDS {#badge}

작은 알림 표시기 (카운트 / 상태 / 새 항목).

#### 기본 마크업

```html
<!-- 숫자 배지 -->
<button class="btn btn--text">
  알림 <span class="badge">3</span>
</button>

<!-- 점만 (dot 변형) -->
<span class="badge badge--dot" aria-label="새 알림 있음"></span>
```

#### Variant

- `.badge` (기본 — danger 빨강) / `.badge--primary` / `.badge--info` / `.badge--success` / `.badge--warning` / `.badge--gray`
- `.badge--dot` — 숫자 없는 단순 점 (8×8)

#### 접근성

- 숫자 배지: 텍스트로 의미 전달됨 (별도 ARIA 불필요)
- Dot 배지: 시각만 — `aria-label="새 알림 있음"` 필수

#### 출처

- CSS: `src/styles/6-components/badge.css`


---

##### 진행률 (Progress) — KRDS {#progress}

native `<progress>` + 시각 커스텀.

#### 기본 마크업

```html
<div class="progress">
  <div class="progress__label">
    <span>업로드 중</span>
    <span>60%</span>
  </div>
  <progress class="progress__bar" value="60" max="100" aria-label="업로드 진행률 60%">60%</progress>
</div>
```

#### Variant

- 기본 (primary)
- `.progress--success` / `.progress--warning` / `.progress--danger`

#### 접근성

- native `<progress>` 사용 — 자동 ARIA 처리
- `aria-label` 또는 `aria-labelledby`로 진행 항목 명시
- 무한 로딩(불확정 시간)은 `<progress>` 대신 `.spinner` 사용

#### 출처

- CSS: `src/styles/6-components/progress.css`


---

##### 스피너 (Spinner) — KRDS {#spinner}

로딩 표시기. 진행 시간을 알 수 없을 때 사용.

#### 기본 마크업

```html
<span class="spinner" role="status" aria-label="로딩 중"></span>
```

#### 사이즈

- `.spinner--small` (16×16)
- 기본 (24×24)
- `.spinner--large` (40×40)

#### 접근성

- `role="status"` + `aria-label="로딩 중"` 필수
- `prefers-reduced-motion: reduce` 자동 대응 (회전 속도 절반으로)

#### 출처

- CSS: `src/styles/6-components/spinner.css`


---

##### 단계 표시기 (Step Indicator) — KRDS {#step-indicator}

다단계 폼/프로세스의 현재 단계 표시.

#### 기본 마크업

```html
<ol class="step-indicator" aria-label="진행 단계">
  <li class="step-indicator__item step-indicator__item--done">
    <span class="step-indicator__num" aria-hidden="true">1</span>
    <span class="step-indicator__label">정보 입력</span>
  </li>
  <li class="step-indicator__item step-indicator__item--current" aria-current="step">
    <span class="step-indicator__num" aria-hidden="true">2</span>
    <span class="step-indicator__label">확인</span>
  </li>
  <li class="step-indicator__item">
    <span class="step-indicator__num" aria-hidden="true">3</span>
    <span class="step-indicator__label">완료</span>
  </li>
</ol>
```

#### 상태 클래스

- `.step-indicator__item--done` — 완료 (primary 채움)
- `.step-indicator__item--current` — 현재 (primary 테두리)
- (없음) — 예정 (회색)

#### 접근성

- `<ol>` 사용 — 순서 의미 보존
- 현재 단계: `aria-current="step"`
- 번호는 시각만 — `aria-hidden="true"` (레이블이 텍스트로 의미 전달)

#### 출처

- CSS: `src/styles/6-components/step-indicator.css`


---

##### 태그 (Tag) — KRDS {#tag}

카테고리, 필터, 속성 라벨.

#### 기본 마크업

```html
<!-- 정적 태그 -->
<span class="tag">기본</span>

<!-- 클릭 가능 (필터 등) -->
<button type="button" class="tag tag--primary">선택됨</button>

<!-- 제거 가능 (선택된 필터) -->
<span class="tag tag--info">
  카테고리: 디자인
  <button type="button" class="tag__close" aria-label="카테고리: 디자인 제거">×</button>
</span>

<!-- 링크형 -->
<a class="tag tag--success" href="?category=ui">UI</a>
```

#### Variant

- 기본 (회색 outline)
- 시맨틱: `.tag--primary` / `.tag--info` / `.tag--success` / `.tag--warning` / `.tag--danger`

#### 사이즈

- `.tag--small` (20px)
- 기본 (24px)
- `.tag--large` (32px)

#### 접근성

- 제거 버튼은 `aria-label="태그명 제거"` 형식으로 컨텍스트 명시
- 클릭 가능 태그는 `<button>` 또는 `<a>` 사용 (div onclick 금지)

#### 출처

- CSS: `src/styles/6-components/tag.css`


---

##### 토스트 (Toast) — KRDS {#toast}

일시적 피드백 메시지. 화면 우측 상단/하단에 잠시 노출 후 자동 사라짐.

#### 기본 마크업

```html
<div class="toast-stack">
  <div class="toast toast--success" role="status">
    <span class="toast__icon" aria-hidden="true">✓</span>
    <p class="toast__message">저장되었습니다</p>
    <button type="button" class="toast__close" aria-label="닫기">×</button>
  </div>
</div>
```

#### 위치

- `.toast-stack` (기본) — 우측 상단
- `.toast-stack--bottom` — 우측 하단

#### Variant

- `.toast--info` / `.toast--success` / `.toast--warning` / `.toast--danger`

#### 동작 (JS)

- 보통 3~5초 후 자동 닫기 (사용자 액션 결과 통보)
- 사용자가 닫기 버튼으로 즉시 닫기 가능
- 다중 토스트는 위에서 아래로 누적

#### Alert vs Toast 사용 기준

| | Alert | Toast |
|---|-------|-------|
| 위치 | 페이지 인라인 | 화면 고정 |
| 지속시간 | 사용자가 닫을 때까지 | 자동 사라짐 |
| 용도 | 페이지 컨텍스트 알림 | 즉시 피드백 (저장 완료 등) |

#### 접근성

- `role="status"` + `aria-live="polite"` (스크린리더 정중 안내)
- 위급 시에만 `role="alert"` + `aria-live="assertive"`
- 자동 닫힘 토스트도 사용자 옵션으로 일시정지/지속 가능해야 함 (WCAG 2.2.1)

#### 출처

- CSS: `src/styles/6-components/toast.css`


---

##### 툴팁 (Tooltip) — KRDS {#tooltip}

짧은 보조 설명 팝업. **JS 트리거 변형 권장** (키보드/터치 호환).

#### 기본 마크업 (JS 변형)

```html
<button type="button" class="tooltip-trigger" aria-describedby="tip-1">
  도움말
</button>
<div id="tip-1" class="tooltip" role="tooltip" hidden>
  도움말 설명 텍스트
</div>
```

JS: focus/mouseenter 시 `tooltip.removeAttribute('hidden')`, blur/mouseleave 시 `setAttribute('hidden', '')`.

#### CSS-only hover 변형 (단순 케이스)

```html
<span class="tooltip-wrap">
  <button type="button" aria-label="도움말">?</button>
  <span class="tooltip" role="tooltip">설명 텍스트</span>
</span>
```

> 키보드 사용자는 호버할 수 없으므로 중요 정보는 JS 변형 사용.

#### 접근성

- 트리거에 `aria-describedby="툴팁id"` 연결
- 툴팁에 `role="tooltip"` 필수
- ESC로 닫기 가능 (JS 처리)
- 툴팁은 hover/focus 양쪽으로 트리거 가능해야 함 (WCAG 1.4.13)

#### 출처

- CSS: `src/styles/6-components/tooltip.css`


---

## 그룹 E — 콘텐츠/표현

##### 달력 (Calendar) — KRDS {#calendar}

날짜 선택 그리드. 단독 사용 또는 date input의 팝업으로 사용.

#### 기본 마크업

```html
<div class="calendar" role="application" aria-label="날짜 선택">
  <div class="calendar__head">
    <button type="button" class="calendar__nav" aria-label="이전 달">‹</button>
    <h2 class="calendar__title" aria-live="polite">2026년 4월</h2>
    <button type="button" class="calendar__nav" aria-label="다음 달">›</button>
  </div>

  <table class="calendar__grid" role="grid">
    <thead>
      <tr>
        <th scope="col" abbr="일요일">일</th>
        <th scope="col" abbr="월요일">월</th>
        <th scope="col" abbr="화요일">화</th>
        <th scope="col" abbr="수요일">수</th>
        <th scope="col" abbr="목요일">목</th>
        <th scope="col" abbr="금요일">금</th>
        <th scope="col" abbr="토요일">토</th>
      </tr>
    </thead>
    <tbody>
      <tr role="row">
        <td role="gridcell">
          <button type="button" class="calendar__day calendar__day--other-month" aria-label="2026년 3월 30일">30</button>
        </td>
        <td role="gridcell">
          <button type="button" class="calendar__day" aria-label="2026년 4월 1일">1</button>
        </td>
        <td role="gridcell">
          <button type="button" class="calendar__day calendar__day--today" aria-label="2026년 4월 2일 (오늘)">2</button>
        </td>
        <td role="gridcell">
          <button type="button" class="calendar__day calendar__day--selected" aria-selected="true" aria-label="2026년 4월 3일 (선택됨)">3</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

#### 상태 클래스

- `.calendar__day--today` — 오늘 (primary 테두리)
- `.calendar__day--selected` 또는 `aria-selected="true"` — 선택됨 (primary 채움)
- `.calendar__day--other-month` — 다른 달 날짜 (희미)
- `:disabled` — 선택 불가

#### 접근성

- 컨테이너 `role="application"` + `aria-label`
- `<table role="grid">` 그리드 ARIA
- 일자 버튼은 전체 날짜 컨텍스트로 `aria-label="YYYY년 M월 D일"` (그래야 스크린리더가 "1"이 아닌 "4월 1일"로 읽음)
- 선택 상태: `aria-selected="true"`
- 키보드: 화살표(일 단위), Page Up/Down(월), Home/End(주 시작/끝)

#### 출처

- CSS: `src/styles/6-components/calendar.css`


---

##### 캐러셀 (Carousel) — KRDS {#carousel}

스크롤 스냅 기반 슬라이드 컨테이너.

#### 기본 마크업

```html
<div class="carousel" aria-roledescription="carousel" aria-label="추천 항목">
  <div class="carousel__viewport">
    <ol class="carousel__track">
      <li class="carousel__slide" aria-roledescription="slide" aria-label="1 / 3">
        <img src="/img1.jpg" alt="설명">
      </li>
      <li class="carousel__slide" aria-roledescription="slide" aria-label="2 / 3">
        <img src="/img2.jpg" alt="설명">
      </li>
      <li class="carousel__slide" aria-roledescription="slide" aria-label="3 / 3">
        <img src="/img3.jpg" alt="설명">
      </li>
    </ol>
  </div>

  <button type="button" class="carousel__nav carousel__nav--prev" aria-label="이전 슬라이드">‹</button>
  <button type="button" class="carousel__nav carousel__nav--next" aria-label="다음 슬라이드">›</button>

  <div class="carousel__indicators" role="tablist">
    <button type="button" class="carousel__dot" role="tab" aria-selected="true" aria-label="1번 슬라이드"></button>
    <button type="button" class="carousel__dot" role="tab" aria-selected="false" aria-label="2번 슬라이드"></button>
    <button type="button" class="carousel__dot" role="tab" aria-selected="false" aria-label="3번 슬라이드"></button>
  </div>
</div>
```

#### 접근성 (WCAG 2.2 + KRDS)

- 자동 재생은 **기본 OFF** 권장 — 사용자 통제권 (WCAG 2.2.2)
- 자동 재생 시: 일시정지 버튼 필수 + `prefers-reduced-motion: reduce` 시 자동 비활성
- 인디케이터는 키보드 작동 가능
- 슬라이드별 `aria-label="N / 총수"`로 위치 안내

#### 출처

- CSS: `src/styles/6-components/carousel.css`


---

##### 목록 (List) — KRDS Text list / Structured list {#list}

두 가지 변형 — 텍스트 목록과 구조화 목록(정의 목록).

#### 기본 마크업

##### 텍스트 목록 (List — Text)

```html
<!-- 글머리표 -->
<ul class="list--text">
  <li>첫 번째 항목</li>
  <li>두 번째 항목
    <ul>
      <li>중첩 항목</li>
    </ul>
  </li>
</ul>

<!-- 번호 -->
<ol class="list--text list--ordered">
  <li>1단계</li>
  <li>2단계</li>
</ol>
```

##### 구조화 목록 (List — Structured / Definition)

KRDS 정의 목록 패턴. 라벨 + 값 쌍 (예: 사양, 상세 정보).

```html
<dl class="list--structured">
  <div class="list__row">
    <dt>제품명</dt>
    <dd>예시 제품</dd>
  </div>
  <div class="list__row">
    <dt>출시일</dt>
    <dd>2026년 4월 30일</dd>
  </div>
  <div class="list__row">
    <dt>가격</dt>
    <dd>10,000원</dd>
  </div>
</dl>
```

#### 시맨틱 구조

- **Root 태그**: `<ul>` (순서 무관) / `<ol>` (순서 의미) / `<dl>` (정의 목록)
- **자식**: `<li>` (ul/ol) 또는 `<dt>` + `<dd>` (dl)
- **변형 클래스**: `.list--text` · `.list--ordered` · `.list--structured`
- **필수 ARIA**: — (시맨틱 태그만으로 충분)
- 상세: `skill/references/html-semantics.md#list`

#### 접근성

- 순서 의미 — `<ol>` (있음) / `<ul>` (없음)
- 정의 목록 — `<dl>/<dt>/<dd>` 시맨틱 사용
- 모바일에선 정의 목록이 자동으로 1열로 변환

#### 출처

- CSS: `src/styles/6-components/list.css`


---

##### 표 (Table) — KRDS {#table}

데이터 표. 모바일에서는 가로 스크롤 컨테이너로 감싸서 사용.

#### 기본 마크업

```html
<div class="table-wrap">
  <table class="table">
    <caption class="table__caption">2026년 1분기 신청 현황</caption>
    <thead>
      <tr>
        <th scope="col">번호</th>
        <th scope="col">신청자</th>
        <th scope="col">신청일</th>
        <th scope="col">상태</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>홍길동</td>
        <td>2026-04-01</td>
        <td><span class="tag tag--success">완료</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

#### Variant

- 기본
- `.table--hover` — 행 호버 강조
- `.table--striped` — 줄무늬 (짝수 행 회색)
- `.table--compact` — 좁은 패딩 (8px 12px)
- `.table--comfortable` — 넓은 패딩 (20px)

#### 정렬 가능한 헤더

```html
<th scope="col" aria-sort="ascending">
  <button type="button">신청일</button>
</th>
```

#### 선택된 행

```html
<tr aria-selected="true">...</tr>
```

#### 접근성

- `<th scope="col">` 또는 `scope="row">` 필수
- `<caption>`으로 표 제목 명시
- 정렬 헤더는 `aria-sort="ascending|descending|none"`
- 선택 행은 `aria-selected="true"`
- 모바일 가로 스크롤은 `<div class="table-wrap">` 래퍼로 감싸기

#### 출처

- CSS: `src/styles/6-components/table.css`


---

