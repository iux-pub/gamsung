# 탭 (Tab) — KRDS

## 기본 마크업 (WAI-ARIA tabs pattern)

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

## 사이즈

- `.tab__list--small` (40px height) — 보조 컨텍스트
- 기본 (48px) — 표준
- `.tab__list--large` (56px height) — 강조

## 동작 (JS — 별도 구현)

- 탭 클릭 → 모든 `aria-selected="false"` + 클릭한 탭만 `aria-selected="true"`
- 모든 패널 `hidden` + 활성 탭의 `aria-controls` 패널만 `hidden` 제거
- 키보드 — 좌/우 화살표로 탭 이동, Home/End로 처음/마지막
- 비활성 탭은 `tabindex="-1"`로 Tab 키에서 제외 (활성 탭만 `tabindex` 없음)

## 접근성 (KRDS + WAI-ARIA)

- `role="tablist"` + 각 탭에 `role="tab"`, 패널에 `role="tabpanel"`
- 탭 ↔ 패널 연결: `aria-controls` (탭 → 패널 id), `aria-labelledby` (패널 → 탭 id)
- 활성 표시는 `aria-selected="true"` (시각 인디케이터는 CSS가 자동 처리)
- `aria-label` 또는 `aria-labelledby`로 탭 그룹의 목적 명시 권장

## 출처

- CSS: `src/styles/6-components/tab.css`
