# 체크박스 & 라디오 — KRDS Form check

## 기본 마크업

### 체크박스

```html
<label class="check">
  <input type="checkbox" name="agree" value="true">
  <span class="check__box" aria-hidden="true"></span>
  <span class="check__label">개인정보 수집·이용에 동의합니다</span>
</label>
```

### 라디오

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

## 시맨틱 구조

- **Root 태그**: `<label class="check">` 또는 `<label class="radio">` (input을 감쌈)
- **자식**: `<input type="checkbox|radio">` → `<span __box aria-hidden="true">` (시각 박스) → `<span __label>` (텍스트)
- **그룹**: 라디오는 `<fieldset>` + `<legend>` 필수
- **필수 ARIA**: 시각 박스에 `aria-hidden="true"` — native input이 정보를 담당
- 상세: `skill/references/html-semantics.md#check-radio`

## 사양

- 박스 크기: 24×24
- 컨테이너 최소 높이: `--touch-target-min` (44px)
- native `<input>`은 시각적으로 숨김 (sr-only) — 키보드/스크린리더는 정상 작동

## 접근성

- `<label>`로 input + box + 텍스트를 묶어 클릭 영역 전체 확보
- 라디오 그룹은 `<fieldset><legend>`로 묶기
- 시각 박스(`__box`)는 `aria-hidden="true"` (스크린리더는 native input만 인식)

## 출처

- CSS: `src/styles/6-components/check-radio.css`
