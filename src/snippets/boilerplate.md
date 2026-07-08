# HTML 보일러플레이트 (Boilerplate)

## 기본 마크업

기본 마크업은 일반사이트, 공공서비스, 공공기관, CMS·관리자, 커머스·예약 모두에 적용 가능한 공통 골격이다. 공식 배너, 정부 상징, 운영기관 식별자, 공공 푸터 필수 링크는 사이트 유형 판정에서 적용 대상이 확인된 경우에만 추가한다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>페이지 제목</title>
  <link rel="stylesheet" href="../../dist/css/style.css">
</head>
<body>
  <a href="#main" class="skip-to-content">본문 바로가기</a>

  <header id="header" class="site-header">
    <div class="container">
      <!-- 브랜드, GNB, 유틸리티 -->
    </div>
  </header>

  <main id="main">
    <section class="section section--content" aria-labelledby="section-title">
      <div class="container">
        <h1 id="section-title">페이지 제목</h1>
        <!-- 페이지 콘텐츠 -->
      </div>
    </section>
  </main>

  <footer id="footer" class="site-footer">
    <div class="container">
      <!-- 로고, 연락처, 저작권, 주요 링크 -->
    </div>
  </footer>
</body>
</html>
```

## 필수 요소 체크리스트

| 요소 | 코드 | 용도 |
|------|------|------|
| 문서 언어 | `lang="ko"` | 스크린리더 언어 설정 |
| 뷰포트 | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | 반응형 대응 |
| 본문 바로가기 | `<a href="#main" class="skip-to-content">본문 바로가기</a>` | 키보드/스크린리더 사용자 편의 |
| Header 랜드마크 | `<header id="header">` | 페이지 헤더 영역 |
| Main 랜드마크 | `<main id="main">` | 주요 콘텐츠 영역 (skip-to-content 타겟) |
| Footer 랜드마크 | `<footer id="footer">` | 페이지 푸터 영역 |
| 콘텐츠 래퍼 | `.container` | 최대 너비 제한 + 중앙 정렬 |
| Section 이름 | `aria-labelledby` 또는 heading | 섹션의 접근 가능한 이름 |

## Page Shell 계약

에이전트가 페이지 HTML을 새로 만들 때는 아래 순서로 구조를 잡는다.

1. 사이트 유형을 먼저 판정한다.
2. `body` 첫 요소로 `.skip-to-content`를 둔다.
3. 큰 랜드마크는 `header#header`, `main#main`, `footer#footer`만 사용한다.
4. `main`의 직계 자식은 `section`으로 둔다.
5. 각 `section`은 `.container`를 직접 포함하고, heading 또는 `aria-labelledby`/`aria-label`로 접근 가능한 이름을 가진다.
6. 페이지 전체를 컴포넌트화하지 않고 `main` 내부 section 단위로 분리한다.

### Section archetype

| Archetype | 클래스 | 용도 |
|-----------|--------|------|
| 도입 | `.section--intro` | 브랜드, 대표 메시지, 핵심 CTA |
| 본문 | `.section--content` | 일반 콘텐츠, 소개, 상세 설명 |
| 목록 | `.section--list` | 카드, 뉴스, 게시물, 링크 목록 |
| 폼 | `.section--form` | 신청, 문의, 검색 입력 |
| 데이터 | `.section--data` | 표, 통계, 현황 |
| 검색 | `.section--search` | 검색/필터 영역 |
| 절차 | `.section--process` | 단계, 이용 방법, 신청 흐름 |
| 안내 | `.section--notice` | 공지, 알림, 유의사항 |

## 프로젝트 유형별 추가 요소

| 유형 | 추가 검토 요소 |
|------|----------------|
| 일반사이트 | 브랜드 로고, 주요 링크, 연락처, 개인정보처리방침 등 자체 운영 정보 |
| 공공서비스 | 민원/신청/조회/정책/참여 흐름, 서비스 안내, 로그인/인증, 공공 푸터 필수 링크 검토 |
| 공공기관 | 기관 CI/BI, 기관 소개, 공지, 정보공개, 운영기관 정보. 공식 배너와 정부 상징은 요구 확인 후 |
| CMS·관리자 | 서비스명, 사용자 메뉴, 로그아웃, 업무 내비게이션. 정부 아이덴티티 요소 제외 |
| 커머스·예약 | 상품/예약/결제 흐름, 약관/환불/개인정보 링크, 전환 CTA |

## 레이아웃 크기 기준

| 영역 | 모바일 | 태블릿 | PC |
|------|--------|--------|-----|
| 헤더 높이 | 최소 56px | 최소 64px | **최소 100px** |
| 푸터 높이 | 자동 | 자동 | 자동 |
| 컨테이너 max-width | 100% | 100% | 1200px |
| 컨테이너 좌우 패딩 | 16px | 24px | 40px |

```css
.site-header {
  min-height: 5.6rem; // 모바일 56px

  @media (min-width: 768px) {
    min-height: 6.4rem; // 태블릿 64px
  }

  @media (min-width: 1280px) {
    min-height: 10rem; // PC 100px
  }
}
```

## 접근성 주의사항

- `skip-to-content` 링크: `<body>` 바로 뒤 첫 번째 요소로 배치. 평소 화면에서 숨겨지고 포커스 시 표시
- `header/main/footer`는 암묵적 랜드마크가 있으므로 기본적으로 role을 중복 작성하지 않는다
- `id="main"`: 본문 바로가기 링크의 타겟
- 페이지당 `<main>` 태그는 1개만 사용
- `main` 안의 `section`은 제목을 갖거나 `aria-labelledby`/`aria-label`로 이름을 제공
- `lang="ko"` 필수: 스크린리더가 한국어로 콘텐츠를 읽도록 설정
- 페이지 `<title>`은 고유하고 설명적인 텍스트 사용

## 참고 파일

미리보기: `src/playground/boilerplate.html`
