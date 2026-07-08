# 사이트 헤더 (Site Header)

사이트 유형과 무관하게 사용할 수 있는 공통 헤더 패턴. 브랜드 + 주 메뉴 + 액션 영역을 기본으로 하며, 공식 배너·정부 상징·운영기관 식별자는 공공서비스/공공기관에서 적용 대상이 확인된 경우에만 별도 추가한다.

## 기본 마크업

```html
<header id="header" class="site-header">
  <div class="container site-header__inner">
    <a class="site-header__brand" href="/">
      <img src="/logo.svg" alt="기관명">
      <span class="site-header__brand-name">기관명</span>
    </a>

    <nav class="site-header__nav" aria-label="주 메뉴">
      <ul class="site-header__menu">
        <li><a href="/about">소개</a></li>
        <li><a href="/services" aria-current="page">서비스</a></li>
        <li><a href="/notice">공지</a></li>
      </ul>
    </nav>

    <div class="site-header__actions">
      <button type="button" class="btn btn--text btn--small">로그인</button>
      <button type="button" class="site-header__toggle" aria-label="메뉴 열기" aria-expanded="false">☰</button>
    </div>
  </div>
</header>
```

## 동작

- 모바일/태블릿 (< 1280px): 주 메뉴 숨김 + 햄버거 토글 노출
- PC (≥ 1280px): 주 메뉴 노출 + 햄버거 숨김
- `position: sticky` 적용 (스크롤 시에도 상단 유지)

## 접근성

- `<header id="header">` 시맨틱 태그 사용 (페이지당 하나)
- 주 메뉴는 `<nav aria-label="주 메뉴">` (페이지에 nav가 여러 개면 label 필수)
- 현재 페이지 메뉴: `aria-current="page"`
- 모바일 토글: `aria-label="메뉴 열기/닫기"` + `aria-expanded` 상태 토글
- 로고 `<img>` `alt` 텍스트 필수 (KRDS R-09)

## 조건부 공공/정부 요소

아래 요소는 모든 사이트의 기본값이 아니다.

- 공식 배너: 공공서비스 중 정부 상징 사용이 명시되었거나 과업에서 요구된 경우만 생성
- 정부 상징 로고: 정부 상징 사용 대상 서비스에서만 생성
- 운영기관 식별자: 상위 운영기관 표시가 과업에 포함된 경우만 생성
- 일반사이트, CMS·관리자, 커머스·예약에서는 위 항목을 생성하지 않고 체크리스트에서 N/A 처리

## 출처

- CSS: `src/styles/6-components/header.css`
