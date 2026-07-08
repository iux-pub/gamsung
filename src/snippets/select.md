# 셀렉트 (Select) — KRDS

native `<select>` 기반. input과 동일 사이즈/패딩 토큰.

## 기본 마크업

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

## 사이즈

- `.select--small` (40px) / 기본 medium (48px) / `.select--large` (56px)

## 상태

- 기본 / hover / focus / disabled / error (`.select--error` 또는 `aria-invalid="true"`)

## 접근성

- 첫 옵션은 `<option value="">선택하세요</option>` 같은 placeholder 권장
- `<label for>` + `<select id>` 연결 필수
- 옵션 텍스트는 명확하고 간결하게

## 출처

- CSS: `src/styles/6-components/select.css`
