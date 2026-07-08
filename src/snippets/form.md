# 폼 필드 (Form Field) — KRDS

KRDS 입력폼 구성: **레이블 → 보조설명 → 입력박스 → 시스템메시지** (요소 간 8px gap)

## 기본 마크업 (텍스트 입력)

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

## 에러 상태

```html
<div class="form-field">
  <label for="email" class="form-field__label">이메일</label>
  <input type="email" id="email" class="input input--error" aria-invalid="true" aria-describedby="email-error" value="invalid">
  <p id="email-error" class="form-field__message form-field__message--error">올바른 이메일 형식이 아닙니다</p>
</div>
```

## Textarea

```html
<div class="form-field">
  <label for="memo" class="form-field__label">메모</label>
  <textarea id="memo" class="textarea" rows="4" placeholder="내용을 입력하세요"></textarea>
</div>
```

## Input 사이즈

| Size | 클래스 | 높이 |
|------|--------|------|
| small | `.input--small` | 40px |
| medium | (기본) | 48px |
| large | `.input--large` | 56px |

## Input type

`type="text|email|password|number|tel|url|search|date|time|datetime-local"` 모두 동일 스타일 적용.

## 상태

- 기본 — `border: 1px solid var(--color-input-border)`
- focus — `border-color: var(--color-input-border-active)` (primary)
- disabled — 회색 배경 + disabled 텍스트, `cursor: not-allowed`
- read-only — `:read-only`로 자동 처리
- error — `.input--error` 또는 `aria-invalid="true"`

## 접근성

- `<label for="id">` + `<input id="id">` 연결 필수
- 필수 항목은 `required` 속성 + 시각 표시(`*`)
- 에러는 `aria-invalid="true"` + `aria-describedby="에러메시지id"`
- 보조설명은 `aria-describedby`로 연결 권장
- placeholder만으로 레이블 대체 금지

## 출처

- KRDS 입력 명세: https://www.krds.go.kr/html/site/component/component_summary.html
- CSS: `src/styles/6-components/form.css`
