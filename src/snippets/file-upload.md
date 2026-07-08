# 파일 업로드 (File Upload) — KRDS

## 기본 마크업

```html
<label class="file-upload">
  <input type="file" id="file" accept="image/*">
  <span class="file-upload__trigger">파일 선택</span>
  <span class="file-upload__filename" aria-live="polite">선택된 파일 없음</span>
</label>
```

> 파일명 표시는 JS로 갱신 — `input.files[0].name`을 `.file-upload__filename`에 채워 넣는다.

## 다중 선택

```html
<label class="file-upload">
  <input type="file" id="docs" multiple accept=".pdf,.doc,.docx">
  <span class="file-upload__trigger">문서 선택</span>
  <span class="file-upload__filename">선택된 파일 없음</span>
</label>
```

## 접근성

- `<label>`로 input과 트리거를 묶어 키보드 포커스 시 트리거 외곽선 노출
- `aria-live="polite"`로 파일명 변경을 스크린리더에 안내
- `accept` 속성으로 허용 파일 타입 명시 (브라우저 필터링 + 사용자 안내)
- 업로드 진행률은 별도 `<progress>` 또는 토스트로 표시

## 출처

- CSS: `src/styles/6-components/file-upload.css`
