# 카드 (Card) — KRDS

## 기본 마크업

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

## 사이즈 (KRDS 정의 — 4종, 반응형)

| 사이즈 | 클래스 | Mobile padding | PC padding |
|--------|--------|---------------|-----------|
| xsmall | `.card--xsmall` | 12px | 16px |
| small | `.card--small` | 20px | 24px |
| medium | (기본) | 24px | 32px |
| large | `.card--large` | 24px | 40px |

## Variant

- `.card` — 기본 (border-light + 흰 배경)
- `.card--inverse` — 다크 배경 + 흰 텍스트
- `.card--elevated` — border 없이 그림자만 (`--shadow-2`)
- `.card--link` 또는 `<a class="card">` — 호버 시 floating

```html
<a class="card card--link" href="/article/1">
  <div class="card__body">호버 시 그림자 + 살짝 위로 이동</div>
</a>
```

## 접근성

- 시맨틱 컨테이너: `<article>` (독립 콘텐츠) / `<section>` (관련 섹션) / `<div>` (장식)
- 카드 전체가 링크면 `<a class="card">` 또는 카드 내부 `<a>`만 링크 (이중 링크 금지)
- 카드 내 인터랙티브 요소는 `aria-label`로 컨텍스트 명시 권장

## 출처

- 카드 padding/반경은 프로젝트 밀도에 맞는 CSS/Tailwind 직접값 사용
- CSS: `src/styles/6-components/card.css`
