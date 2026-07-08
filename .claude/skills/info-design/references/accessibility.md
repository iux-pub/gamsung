# 접근성 — info-design 강제 규정

KRDS는 **WCAG 2.1 Level AA 이상 + KWCAG 2.1/2.2** 준수를 강제한다. 본 스킬도 이를 그대로 따른다.

---

## 1. 색상 대비 (필수)

| 텍스트 종류 | AA 최소 | AAA 권장 |
|------------|--------|---------|
| 일반 텍스트 (18pt 미만 / 14pt bold 미만) | **4.5:1** | 7:1 |
| 큰 텍스트 (18pt+ 또는 14pt bold+) | **3:1** | 4.5:1 |
| UI 컴포넌트 (버튼·아이콘) | **3:1** | — |
| 아이콘 (장식이 아닌 의미) | **3:1** | 7:1 (고대비 모드) |

### 매직넘버 50 규칙 (KRDS)

KRDS 색상 단계에서 **두 단계 차이가 50 이상이면 4.5:1 자동 충족**.
- 예: `gray.10` (#e6e8ea) ↔ `gray.60` (#58616a) → 차이 50 → AA 충족
- 예: `gray.5` (#f4f5f6) ↔ `gray.50` (#6d7882) → 차이 45 → 검증 필요

토큰 시맨틱 별칭 (`--color-text-*`)을 쓰면 KRDS가 이미 AA를 보장하는 조합으로 만들어졌다.

---

## 2. 포커스 (필수)

```css
/* ❌ 절대 금지 */
:focus { outline: none; }
button:focus { outline: 0; }

/* ✅ KRDS 기본 — reset.css 전역 처리됨 */
:focus-visible {
  outline: 0.4rem solid var(--color-border-primary);
  outline-offset: 2px;
}
```

- **모든 인터랙티브 요소**: `<button>` `<a>` `<input>` `<select>` `<textarea>` `[tabindex]` `[contenteditable]`
- 두께: **4px**
- 색상: `var(--color-border-primary)` (KRDS primary)
- offset: 2px (요소 윤곽이 보이도록)

---

## 3. 터치/클릭 영역 (필수)

| 컨텍스트 | 최소 크기 |
|---------|----------|
| 모바일 | **44 × 44px** (`var(--touch-target-min)`) |
| 데스크탑 dense UI | 32 × 32px (KRDS xsmall) 허용 |
| 권장 기본 | 48 × 48px (KRDS medium = button medium 기본) |

작은 시각 요소(체크박스 24×24, 토글 트랙 44×24)에서 터치 영역 확보:
- `<label>`로 감싸 클릭 영역 확장
- `min-height: var(--touch-target-min)` 적용

---

## 4. 시맨틱 HTML (필수)

| 의도 | 사용 |
|------|------|
| 클릭 액션 | `<button type="button">` |
| 페이지 이동 | `<a href="...">` |
| 폼 제출 | `<button type="submit">` 또는 `<form>` |
| 헤더 | `<header>` |
| 푸터 | `<footer>` |
| 내비게이션 | `<nav aria-label="...">` |
| 본문 영역 | `<main>` (페이지당 하나) |
| 독립 콘텐츠 | `<article>` |
| 관련 섹션 | `<section>` (제목 필수) |
| 보조 콘텐츠 | `<aside>` |

**`div/span 클릭 핸들러 패턴` 절대 금지.** 클릭 가능한 요소는 button 또는 a.

---

## 5. 폼 접근성

### 레이블 연결

```html
<!-- ✅ -->
<label for="email">이메일</label>
<input type="email" id="email">

<!-- ❌ placeholder만으로 레이블 대체 -->
<input type="email" placeholder="이메일">
```

### 필수 표시

```html
<label for="name">
  이름
  <span class="form-field__required" aria-label="필수">*</span>
</label>
<input type="text" id="name" required>
```

### 에러 안내

```html
<input type="email" id="email" aria-invalid="true" aria-describedby="email-error">
<p id="email-error" class="form-field__message form-field__message--error">
  올바른 이메일 형식이 아닙니다
</p>
```

### 라디오 그룹

```html
<fieldset>
  <legend class="form-field__label">결제 수단</legend>
  <label class="radio">...</label>
  <label class="radio">...</label>
</fieldset>
```

---

## 6. ARIA 속성 — 핵심 패턴

### 현재 상태

| 속성 | 용도 |
|------|------|
| `aria-current="page"` | 현재 페이지 (메뉴, breadcrumb) |
| `aria-current="step"` | 현재 단계 (step-indicator) |
| `aria-selected="true"` | 선택됨 (tab, table row) |
| `aria-checked="true"` | 체크됨 (custom checkbox 시 — native input 사용 시 불필요) |
| `aria-expanded="true|false"` | 펼침 (disclosure, dropdown, accordion) |
| `aria-pressed="true|false"` | 토글 버튼 ON 상태 |
| `aria-hidden="true"` | 시각만 (장식 아이콘) |
| `aria-disabled="true"` | 비활성 (disabled 속성과 같이 사용) |
| `aria-invalid="true"` | 검증 실패 |

### 라이브 영역

| 속성 | 용도 |
|------|------|
| `role="alert"` + `aria-live="assertive"` | 즉시 안내 (오류, 긴급) |
| `role="status"` + `aria-live="polite"` | 정중한 안내 (저장 완료, 로딩) |

### 다이얼로그

```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">...</h2>
</div>
```

### 컨트롤 연결

| 속성 | 용도 |
|------|------|
| `aria-controls="패널id"` | 트리거 → 제어 대상 |
| `aria-haspopup="true"` | 팝업/드롭다운 트리거 |
| `aria-describedby="설명id"` | 추가 설명 연결 (보조설명, 에러) |
| `aria-labelledby="제목id"` | 레이블 대체 (단, label 더 우선) |
| `aria-label="..."` | 레이블 대체 (텍스트 없는 아이콘 버튼) |

---

## 7. 키보드 네비게이션 (필수)

| 컴포넌트 | 키 |
|---------|-----|
| Modal | `Esc` 닫기, `Tab` 트랩 (포커스 가두기) |
| Dropdown | `Esc` 닫기, `↑↓` 이동, `Enter` 선택 |
| Tab | `←→` 탭 이동, `Home/End` 처음/끝 |
| Accordion | `Tab` 항목 간 이동, `Space/Enter` 펼침 |
| Calendar | `←→` 일, `↑↓` 주, `Page Up/Down` 월, `Home/End` 주 시작/끝 |
| Carousel | `←→` 슬라이드 이동 |

모든 인터랙티브 요소는 **마우스만으로 가능한 모든 것이 키보드로도 가능**해야 한다.

---

## 8. 스크린 리더

- 모든 페이지에 **Skip Link** (`.skip-to-content`) — 본문으로 바로 이동
- 페이지 제목(`<h1>`) 페이지당 1개
- 헤딩 레벨 순서 지키기 (`<h1>` → `<h2>` → `<h3>`, 건너뛰지 않기)
- `<nav>`에 `aria-label`로 식별 (페이지에 nav가 여러 개면 필수)
- 장식 아이콘은 `aria-hidden="true"`

---

## 9. 동작·모션

- `prefers-reduced-motion: reduce` 미디어 쿼리로 **자동 비활성화** — 불필요한 transition·animation은 모션 감소 시 제거
- **자동 재생 슬라이드/캐러셀 금지** (사용자가 명시 활성화 안 했으면 OFF) — WCAG 2.2.2
- 자동 재생 시 **일시정지 버튼 필수**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. 다크/고대비 모드

KRDS는 **light + high-contrast** 두 모드 시스템 차원에서 지원.

```html
<!-- 토글 -->
<html data-color-mode="high-contrast">
```

- 컴포넌트 코드는 **모드 분기 작성 금지** — 토큰이 자동 분기됨
- 새 토큰 추가 시 light + high-contrast **양쪽 모드 정의 필수**

---

## 자가 점검 체크리스트

페이지·컴포넌트 작성 후 PR 올리기 전:

- [ ] 모든 색상이 KRDS 토큰 (raw hex/rgb 0건)?
- [ ] 모든 인터랙티브 요소가 시맨틱 HTML (`<button>`/`<a>`)?
- [ ] 모든 `<img>`에 `alt` 속성?
- [ ] 모든 폼 요소가 `<label for>` + `id` 연결?
- [ ] focus-visible 처리 (`:focus { outline: none }` 0건)?
- [ ] 터치 영역 44px 이상 (모바일)?
- [ ] 키보드 네비게이션 작동 (Tab, Enter, Esc, 화살표)?
- [ ] ARIA 속성 정확 (`aria-current`, `aria-selected`, `aria-expanded`, `aria-label`)?
- [ ] 헤딩 레벨 순서 준수 (h1 → h2 → h3)?
- [ ] Skip link 제공?
- [ ] 다크/고대비 토글 시 깨지지 않음 (raw 색 0건이면 자동)?
- [ ] `prefers-reduced-motion` 대응?

위 12개 중 하나라도 No → 작업 미완으로 간주.
