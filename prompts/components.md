# 컴포넌트 스니펫 프롬프트 — KRDS 기반

대상: 모든 코드 생성 AI

이 컴포넌트 패턴을 우선 따라 HTML을 생성하라. 카탈로그 밖 패턴은 프로젝트 필요성과 공통화 가능성을 판단해 확장한다.

> 전체 마크업·variant·접근성 노트의 권위 있는 소스: `src/snippets/{name}.md`
> 자동 합본: `site/prompts/components.md`
> 컴포넌트 카탈로그(BEM·접근성·토큰 매핑): `skill/references/krds-components.md`

---

## 그룹 A — 폼/액션

### 버튼 (btn)

```html
<button type="button" class="btn btn--primary">버튼 텍스트</button>
<button type="button" class="btn btn--secondary btn--small">취소</button>
<button type="button" class="btn btn--tertiary btn--large">더보기</button>
<button type="button" class="btn btn--text">자세히</button>
<button type="button" class="btn btn--primary btn--block">전체 너비 제출</button>
```

KRDS Variant: `--primary` `--secondary` `--tertiary` `--text`
KRDS Size: `--xsmall` `--small` (없음=medium, 기본) `--large` `--xlarge`
**금지**: `--ghost` `--outline` `--link` `--sm` `--lg` `--hero` (옛 variant)

### 폼 필드 (form)

```html
<div class="form-field">
  <label for="name" class="form-field__label">이름</label>
  <input type="text" id="name" class="input">
  <span class="form-field__hint">실명을 입력하세요</span>
</div>

<div class="form-field form-field--error">
  <label for="email" class="form-field__label form-field__label--required">이메일</label>
  <input type="email" id="email" class="input input--error" aria-invalid="true" aria-describedby="email-error" required>
  <span id="email-error" class="form-field__message" role="alert">올바른 이메일을 입력하세요</span>
</div>
```

### 체크박스·라디오 (check-radio)

```html
<label class="check-radio">
  <input type="checkbox" class="check-radio__input">
  <span class="check-radio__box" aria-hidden="true"></span>
  <span class="check-radio__label">동의합니다</span>
</label>
```

### 셀렉트 (select)

```html
<div class="form-field">
  <label for="region" class="form-field__label">지역</label>
  <select id="region" class="select">
    <option value="">선택하세요</option>
    <option value="seoul">서울</option>
  </select>
</div>
```

### 파일 업로드 (file-upload), 스위치 (switch)

→ `src/snippets/{file-upload,switch}.md` 참조

---

## 그룹 B — 컨테이너/레이아웃

### 카드 (card)

```html
<article class="card">
  <header class="card__header">
    <h3 class="card__title">제목</h3>
  </header>
  <div class="card__body">
    <p>내용</p>
  </div>
  <footer class="card__footer">
    <button type="button" class="btn btn--primary">확인</button>
  </footer>
</article>
```

### 모달 (modal)

```html
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__container">
    <header class="modal__header">
      <h2 class="modal__title" id="modal-title">제목</h2>
      <button class="modal__close" data-modal-close aria-label="닫기">×</button>
    </header>
    <div class="modal__body">내용</div>
    <footer class="modal__footer">
      <button type="button" class="btn btn--primary">확인</button>
    </footer>
  </div>
</div>
```

### 탭 (tab)

```html
<div class="tab">
  <div class="tab__list" role="tablist" aria-label="탭 메뉴">
    <button class="tab__button" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">탭 1</button>
    <button class="tab__button" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">탭 2</button>
  </div>
  <div class="tab__panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1">내용 1</div>
  <div class="tab__panel" role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>내용 2</div>
</div>
```

### 아코디언 (accordion), 디스클로저 (disclosure), 사이드 패널 (side-panel)

→ `src/snippets/{accordion,disclosure,side-panel}.md` 참조

---

## 그룹 C — 내비게이션

### 브레드크럼 (breadcrumb)

```html
<nav class="breadcrumb" aria-label="페이지 경로">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item"><a href="/">홈</a></li>
    <li class="breadcrumb__item"><a href="/services">서비스</a></li>
    <li class="breadcrumb__item" aria-current="page">신청하기</li>
  </ol>
</nav>
```

### 페이지네이션 (pagination)

```html
<nav class="pagination" aria-label="페이지 탐색">
  <ul class="pagination__list">
    <li class="pagination__item">
      <a href="?page=1" class="pagination__link pagination__link--prev" aria-label="이전 페이지">‹</a>
    </li>
    <li class="pagination__item">
      <a href="?page=1" class="pagination__link" aria-label="페이지 1">1</a>
    </li>
    <li class="pagination__item">
      <a href="?page=2" class="pagination__link pagination__link--current" aria-current="page" aria-label="페이지 2">2</a>
    </li>
    <li class="pagination__item">
      <a href="?page=3" class="pagination__link pagination__link--next" aria-label="다음 페이지">›</a>
    </li>
  </ul>
</nav>
```

### 헤더 (header), 메인 메뉴 (main-menu)

→ `src/snippets/{header,main-menu}.md` 참조

---

## 그룹 D — 피드백

### 알림 (alert)

```html
<div class="alert alert--success" role="status">
  <strong class="alert__title">저장 완료</strong>
  <p class="alert__message">변경 사항이 저장되었습니다.</p>
</div>
```

KRDS variant: `--success` `--warning` `--danger` `--info`

### 토스트 (toast), 툴팁 (tooltip), 배지 (badge), 태그 (tag), 진행 (progress), 스피너 (spinner), 단계 표시 (step-indicator)

→ `src/snippets/{toast,tooltip,badge,tag,progress,spinner,step-indicator}.md` 참조

---

## 그룹 E — 콘텐츠/표현

### 테이블 (table)

```html
<div class="table-wrapper">
  <table class="table">
    <caption class="sr-only">사용자 목록</caption>
    <thead>
      <tr>
        <th scope="col">이름</th>
        <th scope="col">역할</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>홍길동</td>
        <td>관리자</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 리스트 (list), 캘린더 (calendar), 캐러셀 (carousel)

→ `src/snippets/{list,calendar,carousel}.md` 참조
