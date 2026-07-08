# 토글 스위치 (Switch) — KRDS

## 기본 마크업

```html
<label class="switch">
  <input type="checkbox" name="notify" role="switch">
  <span class="switch__track" aria-hidden="true"></span>
  <span class="switch__label">알림 받기</span>
</label>
```

## 사양

- 트랙: 44×24, 핸들: 20×20
- 컨테이너 최소 높이: `--touch-target-min` (44px)
- ON/OFF 즉시 반영되는 설정에 사용 (저장 버튼 없이 즉시 토글)

## 체크박스 vs 스위치 사용 기준

- **체크박스**: 옵션 선택, 동의(약관), 폼 제출과 함께 저장
- **스위치**: 즉시 효과 발생하는 ON/OFF 설정 (알림 ON/OFF, 다크모드 등)

## 접근성

- `role="switch"` 권장 — 스크린리더가 "스위치"로 안내
- 시각 트랙(`__track`)은 `aria-hidden="true"`
- 상태 변경은 native `:checked`만으로 충분 (별도 aria-checked 불필요)

## 출처

- CSS: `src/styles/6-components/switch.css`
