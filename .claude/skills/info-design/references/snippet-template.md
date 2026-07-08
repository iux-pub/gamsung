# 스니펫 표준 템플릿 — `src/snippets/{component}.md`

> 28개 KRDS 컴포넌트의 스니펫 문서가 따르는 표준 구조.
> 새 컴포넌트 추가 시 본 템플릿을 복사해서 시작한다.
> `scripts/check-snippet-structure.js`가 필수 섹션 누락을 자동 검출한다.

---

## 표준 섹션 순서

```markdown
# [한글명] ([영문명]) — KRDS

## 기본 마크업           ← 필수
## 시맨틱 구조           ← 필수 (R-15/R-16 매핑 인용)
## Variant               ← 선택 (variant 있을 때만)
## Size                  ← 선택 (size 있을 때만)
## 상태                  ← 선택 (개별 상태가 있을 때만, BEM modifier + ARIA)
## 동작 (JS)             ← 선택 (JavaScript 동작 필요 시)
## 접근성                ← 필수 (ARIA + 키보드 + 색상 대비)
## 출처                  ← 필수 (KRDS 토큰명 + 참조)
```

---

## 각 섹션 작성 규약

### 1. `## 기본 마크업` (필수)

가장 단순한 형태의 권장 마크업 1개. 변형이 다양한 경우는 서브헤더(`###`)로 분리.

```markdown
## 기본 마크업

\`\`\`html
<article class="card">
  <header class="card__header">
    <h3 class="card__title">제목</h3>
  </header>
</article>
\`\`\`
```

다중 형태(예: `check-radio`)는:

```markdown
## 기본 마크업

### 체크박스

\`\`\`html
<label class="check">...</label>
\`\`\`

### 라디오

\`\`\`html
<label class="radio">...</label>
\`\`\`
```

### 2. `## 시맨틱 구조` (필수)

`html-semantics.md` 매핑을 인용. Root 태그 + 자식 시맨틱 + 필수 ARIA 키워드만 짧게.

```markdown
## 시맨틱 구조

- **Root 태그**: `<article>` (독립 콘텐츠) / `<section>` (관련 그룹) / `<a>` (전체 링크)
- **자식**: `header > h3` (제목) → `body` → `footer`
- **필수 ARIA**: — (시맨틱 태그만으로 충분)

> 상세: `skill/references/html-semantics.md#card`
```

### 3. `## Variant` (선택)

KRDS 정의 variant만 표로 정리. R-18 시각 단어 사용 금지.

```markdown
## Variant (KRDS 정의 — 4종)

| Variant | 클래스 | 용도 |
|---------|--------|------|
| Primary | `.btn--primary` | 메인 CTA |
| ... | | |
```

### 4. `## Size` (선택)

KRDS 사이즈 스케일(`xsmall`/`small`/`medium`/`large`/`xlarge`)만 사용.

```markdown
## Size (KRDS 정의 — 5종)

| Size | 클래스 | 높이 | 권장 |
|------|--------|------|------|
| xsmall | `.btn--xsmall` | 32px | 데스크탑 dense |
| ... | | | |
```

### 5. `## 상태` (선택)

상태가 분명히 정의된 컴포넌트(disclosure 열림/닫힘, tab 선택, modal 열림 등)만 명시.

R-17에 따라 **BEM modifier + ARIA 속성**을 항상 짝지어 표기:

```markdown
## 상태

| 상태 | 클래스 | ARIA |
|------|--------|------|
| 선택됨 | `.tab__item--selected` | `aria-selected="true"` |
| 비활성 | (native `disabled`) | `aria-disabled="true"` |
```

### 6. `## 동작 (JS)` (선택)

JavaScript 동작이 필요한 위젯(modal, tab, accordion, carousel, calendar, tooltip)만. 풀 구현 대신 핵심 시그니처/이벤트만.

```markdown
## 동작 (JS — 별도 구현)

- 열기: `modal.show()` — `hidden` 속성 제거, 첫 focusable 요소로 포커스 이동
- 닫기: `modal.close()` — 트리거로 포커스 복귀
- ESC 키 처리, 포커스 트랩 구현
```

### 7. `## 접근성` (필수)

WAI-ARIA 1.2 APG + KWCAG/WCAG 2.1 AA 기준의 컴포넌트별 체크리스트.

```markdown
## 접근성

- ARIA: `role="dialog"` + `aria-modal="true"` + `aria-labelledby` (필수)
- 키보드: `Esc` 닫기 / `Tab` 포커스 트랩 / 트리거로 포커스 복귀
- 색상 대비: KRDS 토큰 사용 시 AA 자동 충족
- 모션: `prefers-reduced-motion: reduce` 시 전환 효과 비활성화
```

### 8. `## 출처` (필수)

KRDS 토큰 / 컴포넌트 / 외부 표준 참조.

```markdown
## 출처

- 카드 padding/반경은 프로젝트 밀도에 맞는 CSS/Tailwind 직접값 사용
- WAI-ARIA: dialog pattern (https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
```

---

## 작성 시 자가 점검

코드 한 줄 작성 전:

- [ ] 기존 컴포넌트 카탈로그(`krds-components.md`)를 먼저 확인했는가?
- [ ] HTML 기본 골격이 `header/main/footer`, `main > section > .container` 구조와 충돌하지 않는가? (R-15)
- [ ] 인터랙티브 컴포넌트면 필수 ARIA가 들어갔는가? (R-16)
- [ ] modifier가 KRDS 의미적 어휘인가? (R-18 — `--blue`, `--big` 같은 시각 단어 금지)
- [ ] 상태 클래스는 BEM modifier로만 했는가? (R-17 — `.is-*` 금지)

---

## 신규 컴포넌트 생성 시 권장 순서

1. 기존 카탈로그로 해결 가능한지 확인하고, 필요 시 UX팀 결정 → 프로젝트 패턴 또는 공통 컴포넌트 후보로 정리
2. `src/snippets/{name}.md` 본 템플릿 복사해 채움
3. `src/styles/6-components/{name}.css` 작성 (BEM + 색상 토큰, 필요 시 CSS nesting + `@apply`)
4. `src/playground/{name}.html` 미리보기 추가
5. `site/components/{name}.md` 문서 페이지
6. `html-semantics.md`에 매핑 추가 + `check-html-structure.js` 매핑 갱신
7. `npm run build:skill` 실행

---

## 참고

- 카탈로그: `skill/references/krds-components.md`
- 시맨틱 매핑: `skill/references/html-semantics.md`
- 토큰: `skill/references/krds-tokens.md`
- 접근성: `skill/references/accessibility.md`
- 금지 패턴: `skill/references/forbidden-patterns.md`
