# 버튼 (Button) — KRDS

## 기본 마크업

```html
<button type="button" class="btn btn--primary">버튼 텍스트</button>
```

## Variant (KRDS 정의 — 4종)

| Variant | 클래스 | 용도 |
|---------|--------|------|
| Primary | `.btn--primary` | 메인 CTA (저장, 제출, 확인) |
| Secondary | `.btn--secondary` | 보조 액션 (primary 톤 옅은 채움 + primary border) |
| Tertiary | `.btn--tertiary` | 약한 액션 (투명 + gray border) |
| Text | `.btn--text` | 텍스트 링크형 (배경/border 없음) |

## Size (KRDS 정의 — 5종)

| Size | 클래스 | 높이 | padding-x | 사용 권장 |
|------|--------|------|-----------|----------|
| xsmall | `.btn--xsmall` | 32px | 10px | 데스크탑 dense UI 한정 |
| small | `.btn--small` | 40px | 12px | 데스크탑 보조 액션 |
| medium | (기본 — 클래스 없음) | 48px | 16px | **모바일·기본 권장** |
| large | `.btn--large` | 56px | 20px | 강조 CTA |
| xlarge | `.btn--xlarge` | 64px | 24px | 히어로/랜딩 CTA |

> **모바일 환경에선 medium(48px) 이상 사용.** xsmall(32) · small(40)은 WCAG 권장 터치 영역(44px)보다 작아 모바일 부적합.

## 조합 예시

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

## 접근성 (KRDS + WCAG 2.1 AA)

- `<button type="button">` 태그 사용 필수. `<a>` 태그를 버튼 용도로 쓰지 않는다
- 아이콘만 있는 버튼은 `aria-label` 필수: `<button class="btn" aria-label="메뉴 열기">...</button>`
- 비활성은 `disabled` 속성 (또는 `aria-disabled="true"`)
- 포커스 outline은 `reset.css`에서 전역 관리 (4px primary 외곽선) — 컴포넌트에서 제거 금지
- `prefers-reduced-motion` 대응: 모션 감소 설정 시 transition 자동 비활성 (Phase 6에서 추가)

## 출처

- KRDS 버튼 명세: https://www.krds.go.kr/html/site/component/component_summary.html
- 색상: `--color-button-*`, `--color-text-*`
- 크기/간격/반경: CSS/Tailwind 직접값
- CSS: `src/styles/6-components/btn.css`
