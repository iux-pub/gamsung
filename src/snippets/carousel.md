# 캐러셀 (Carousel) — KRDS

스크롤 스냅 기반 슬라이드 컨테이너.

## 기본 마크업

```html
<div class="carousel" aria-roledescription="carousel" aria-label="추천 항목">
  <div class="carousel__viewport">
    <ol class="carousel__track">
      <li class="carousel__slide" aria-roledescription="slide" aria-label="1 / 3">
        <img src="/img1.jpg" alt="설명">
      </li>
      <li class="carousel__slide" aria-roledescription="slide" aria-label="2 / 3">
        <img src="/img2.jpg" alt="설명">
      </li>
      <li class="carousel__slide" aria-roledescription="slide" aria-label="3 / 3">
        <img src="/img3.jpg" alt="설명">
      </li>
    </ol>
  </div>

  <button type="button" class="carousel__nav carousel__nav--prev" aria-label="이전 슬라이드">‹</button>
  <button type="button" class="carousel__nav carousel__nav--next" aria-label="다음 슬라이드">›</button>

  <div class="carousel__indicators" role="tablist">
    <button type="button" class="carousel__dot" role="tab" aria-selected="true" aria-label="1번 슬라이드"></button>
    <button type="button" class="carousel__dot" role="tab" aria-selected="false" aria-label="2번 슬라이드"></button>
    <button type="button" class="carousel__dot" role="tab" aria-selected="false" aria-label="3번 슬라이드"></button>
  </div>
</div>
```

## 접근성 (WCAG 2.2 + KRDS)

- 자동 재생은 **기본 OFF** 권장 — 사용자 통제권 (WCAG 2.2.2)
- 자동 재생 시: 일시정지 버튼 필수 + `prefers-reduced-motion: reduce` 시 자동 비활성
- 인디케이터는 키보드 작동 가능
- 슬라이드별 `aria-label="N / 총수"`로 위치 안내

## 출처

- CSS: `src/styles/6-components/carousel.css`
