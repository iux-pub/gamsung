# 퍼블리셔용 starter 사용 설명서

이 문서는 `iux-pub/starter`를 처음 내려받은 퍼블리셔가 프로젝트를 열고, 화면을 만들고, 검증하는 순서를 안내한다.

starter는 빈 HTML/CSS 템플릿이 아니라 **INFOMIND UX팀의 퍼블리싱 기준이 들어 있는 시작 세트**다. 색상 토큰, 기본 레이아웃, 컴포넌트 CSS, 마크업 스니펫, 검사 스크립트가 함께 들어 있다.

---

## 1. 처음 받은 뒤 할 일

### 1-1. 프로젝트 받기

```bash
git clone https://github.com/iux-pub/starter.git 프로젝트명
cd 프로젝트명
```

회사 Git 저장소에 새 프로젝트로 올릴 예정이면 기존 starter Git 기록을 끊고 새 저장소로 시작한다.

```bash
rm -rf .git
git init
git remote add origin 새_프로젝트_GIT_URL
```

### 1-2. 패키지 설치

```bash
npm install
```

설치가 꼬이면 다음 순서로 다시 설치한다.

```bash
rm -rf node_modules package-lock.json
npm install
```

### 1-3. 첫 빌드

```bash
npm run build
```

정상 빌드되면 `dist/css/style.css`가 생성된다. HTML에서는 이 파일을 연결해서 사용한다.

```html
<link rel="stylesheet" href="dist/css/style.css">
```

---

## 2. 먼저 열어볼 파일

| 파일 | 용도 |
|------|------|
| `index.html` | 기본 페이지 골격 확인용 |
| `src/styles/style.css` | 전체 CSS 진입점. 토큰, reset, component CSS를 불러온다 |
| `tokens/foundation.json` | 브랜드 색상과 기본 폰트의 원본 |
| `tokens/build/tokens.css` | 자동 생성 토큰 CSS. 직접 수정하지 않는다 |
| `src/styles/6-components/` | 버튼, 폼, 탭, 모달 등 컴포넌트 CSS |
| `src/snippets/` | 컴포넌트별 HTML 예시 |
| `contracts/task-contract.md` | 화면 만들기 전 사이트 유형과 구현 범위를 정리하는 계약서 |
| `AGENTS.md` | AI 도구와 사람이 함께 지켜야 하는 작업 규칙 |

처음에는 `index.html`, `src/snippets/boilerplate.md`, `src/snippets/btn.md`, `src/snippets/form.md` 정도만 먼저 보면 된다.

---

## 3. 화면을 만들 때 기본 순서

### 3-1. 사이트 유형부터 정한다

작업 전 프로젝트를 아래 중 하나로 본다.

| 유형 | 기준 |
|------|------|
| 일반사이트 | 회사, 브랜드, 홍보 사이트 |
| 공공서비스 | 신청, 조회, 민원, 정책 참여 서비스 |
| 공공기관 | 기관 대표 홈페이지 |
| CMS·관리자 | 관리자, 업무 시스템, 운영 화면 |
| 커머스·예약 | 상품, 예약, 결제 흐름 |

정부 상징, 공식 배너, 공공 푸터 필수 링크는 모든 프로젝트에 넣지 않는다. 적용 대상이 확인된 공공 프로젝트에서만 추가한다.

### 3-2. 페이지 골격을 유지한다

기본 구조는 아래 순서를 지킨다.

```html
<a href="#main" class="skip-to-content">본문 바로가기</a>

<header id="header" class="site-header">
  <div class="container">
    <!-- 브랜드, 메뉴, 유틸리티 -->
  </div>
</header>

<main id="main">
  <section class="section section--content" aria-labelledby="page-title">
    <div class="container">
      <h1 id="page-title">페이지 제목</h1>
      <!-- 페이지 콘텐츠 -->
    </div>
  </section>
</main>

<footer id="footer" class="site-footer">
  <div class="container">
    <!-- 푸터 정보 -->
  </div>
</footer>
```

중요한 기준은 세 가지다.

- `body` 첫 요소는 본문 바로가기 링크다.
- `main`의 바로 아래에는 `section`을 둔다.
- 각 `section` 안에는 `.container`를 직접 넣고, 제목 또는 `aria-labelledby`/`aria-label`을 제공한다.

### 3-3. 컴포넌트는 스니펫에서 시작한다

새로 마크업을 외워서 만들기보다 `src/snippets/`의 예시를 먼저 복사해서 조정한다.

자주 쓰는 파일:

| 파일 | 쓰는 경우 |
|------|-----------|
| `src/snippets/boilerplate.md` | 새 HTML 페이지 골격 |
| `src/snippets/btn.md` | 버튼 |
| `src/snippets/form.md` | 입력폼 |
| `src/snippets/check-radio.md` | 체크박스, 라디오 |
| `src/snippets/table.md` | 표 |
| `src/snippets/card.md` | 카드 목록 |
| `src/snippets/tab.md` | 탭 |
| `src/snippets/modal.md` | 모달 |
| `src/snippets/accordion.md` | 아코디언 |
| `src/snippets/pagination.md` | 페이지네이션 |

컴포넌트 CSS는 `src/styles/6-components/`에 있다. 기존 컴포넌트로 해결되는 경우 새 클래스를 만들지 않고 modifier를 조합한다.

---

## 4. CSS 작성 기준

### 4-1. 색상은 토큰만 쓴다

색상은 직접 쓰지 않는다.

```css
/* 금지 */
.box {
  color: #222;
  background: rgb(255, 255, 255);
}

/* 사용 */
.box {
  color: var(--color-text);
  background: var(--color-surface);
}
```

브랜드 색상 변경은 `tokens/foundation.json`에서 하고, 저장 후 다시 빌드한다.

```bash
npm run build
```

`tokens/build/tokens.css`는 자동 생성 파일이므로 직접 고치지 않는다.

### 4-2. 간격과 크기는 프로젝트 값 사용 가능

간격, 너비, 높이, radius, font-size는 프로젝트 맥락에 맞게 직접값을 쓸 수 있다.

```css
.notice-box {
  padding: 2.4rem;
  border-radius: 0.8rem;
  font-size: 1.6rem;
}
```

단, 같은 값이 계속 반복되면 공통 클래스나 컴포넌트로 정리한다.

### 4-3. BEM 이름을 쓴다

`src/styles/5-objects/`, `src/styles/6-components/`의 클래스는 BEM을 따른다.

```css
.card {}
.card__header {}
.card__title {}
.card--featured {}
.card__action--primary {}
```

금지 예시:

```css
.card__header__title {} /* element 2단계 중첩 금지 */
.card--blue {}          /* 시각 단어 modifier 금지 */
.is-active {}           /* 비-BEM 상태 클래스 금지 */
```

상태는 의미 있는 modifier와 ARIA 속성을 함께 쓴다.

```html
<button class="tab__button tab__button--selected" aria-selected="true">
  탭 제목
</button>
```

### 4-4. SCSS는 쓰지 않는다

이 starter는 표준 CSS와 Tailwind v4 기준이다. `.scss` 파일, SCSS 변수, SCSS mixin은 사용하지 않는다.

CSS nesting은 사용할 수 있지만, 너무 깊게 중첩하지 않는다.

### 4-5. 프로젝트별 스타일은 별도 파일로 추가한다

starter의 공통 CSS는 여러 프로젝트에서 재사용할 기준이다. 특정 프로젝트 화면에만 필요한 스타일은 공통 컴포넌트 파일을 바로 고치기보다 **프로젝트 전용 CSS 파일을 새로 만들어 연결**한다.

가장 단순한 방식은 `src/styles/project.css`를 추가하는 것이다.

```txt
src/styles/
  style.css
  project.css
```

`src/styles/style.css` 맨 아래의 확장 슬롯에 import를 추가한다.

```css
/* ─── 프로젝트별 스타일 확장 슬롯 ─── */
@import "./project.css";
```

이후 `npm run build`를 실행하면 `project.css`까지 포함된 `dist/css/style.css`가 생성된다. HTML에는 기존처럼 `dist/css/style.css` 하나만 연결하면 된다.

```html
<link rel="stylesheet" href="dist/css/style.css">
```

프로젝트 규모가 작으면 `project.css` 하나로 충분하다. 페이지나 업무 영역이 많으면 폴더를 나눠도 된다.

```txt
src/styles/project/
  index.css
  main.css
  sub.css
  admin.css
```

이 경우 `project/index.css`에서 영역별 CSS를 모으고, `style.css`에서는 `index.css`만 import한다.

```css
/* src/styles/project/index.css */
@import "./main.css";
@import "./sub.css";
@import "./admin.css";
```

```css
/* src/styles/style.css */
/* ─── 프로젝트별 스타일 확장 슬롯 ─── */
@import "./project/index.css";
```

파일을 나눌 때는 역할 기준으로 나눈다.

| 상황 | 권장 위치 |
|------|-----------|
| 특정 프로젝트 전체에만 필요한 레이아웃 | `src/styles/project.css` 또는 `src/styles/project/layout.css` |
| 특정 페이지 전용 스타일 | `src/styles/project/pages/{page-name}.css` |
| 관리자, 사용자 화면처럼 영역이 나뉘는 스타일 | `src/styles/project/admin.css`, `src/styles/project/service.css` |
| 버튼, 폼, 카드 같은 공통 컴포넌트 자체 수정 | `src/styles/6-components/{component}.css` |
| 토큰 색상, 기본 폰트 변경 | `tokens/foundation.json` |

공통 컴포넌트 파일을 수정해야 하는 경우는 제한한다. 예를 들어 모든 버튼의 높이, variant, focus 스타일을 바꾸는 작업은 `src/styles/6-components/btn.css` 수정이 맞다. 반대로 특정 메인 화면의 CTA 버튼만 간격이 다르다면 프로젝트 전용 CSS에서 section 또는 page block 기준으로 조정한다.

```css
/* project.css 예시 */
.home-hero__actions {
  display: flex;
  gap: 1.2rem;
  margin-top: 2.4rem;
}

.home-hero__actions .btn {
  min-width: 16rem;
}
```

프로젝트 전용 CSS에서도 규칙은 동일하다.

- 색상은 `var(--color-*)`만 사용한다.
- BEM 이름을 사용한다.
- `.is-active`, `.has-error` 같은 비-BEM 상태 클래스는 쓰지 않는다.
- `#fff`, `rgb()`, `hsl()` 같은 raw color는 쓰지 않는다.
- `:focus { outline: none }`으로 포커스를 없애지 않는다.
- CSS 수정 후 `npm run build`, `npm run check`, `npm run lint:css`를 실행한다.

---

## 5. 개발 중 자주 쓰는 명령

| 명령 | 언제 쓰나 |
|------|-----------|
| `npm run build` | 토큰과 CSS를 한 번에 다시 만들 때 |
| `npm run watch:css` | CSS 수정 중 자동 빌드가 필요할 때 |
| `npm run check` | 금지 패턴, page shell, ARIA, label 관계를 검사할 때 |
| `npm run lint:css` | CSS 문법과 스타일 규칙을 검사할 때 |
| `npm run lint:css -- --fix` | 자동 수정 가능한 CSS 문제를 정리할 때 |

보통 작업 중에는 터미널 하나에서 아래 명령을 켜 둔다.

```bash
npm run watch:css
```

작업을 마무리할 때는 아래 순서로 확인한다.

```bash
npm run check
npm run lint:css
npm run build
```

---

## 6. 접근성 기본 체크

퍼블리싱 완료 전에 최소한 아래 항목은 직접 확인한다.

- 이미지에는 `alt`가 있다. 장식 이미지는 `alt=""`를 쓴다.
- 입력 요소에는 연결된 `<label for="...">`가 있다.
- 버튼처럼 동작하는 것은 `<button>`을 쓴다.
- 링크처럼 이동하는 것은 `<a href="...">`를 쓴다.
- `div`나 `span`에 클릭 이벤트만 붙여서 버튼처럼 만들지 않는다.
- 키보드 `Tab`으로 이동했을 때 포커스가 보인다.
- 모바일에서 버튼, 링크, 입력 요소의 터치 영역이 최소 44px 이상이다.
- 모달, 탭, 아코디언 같은 위젯은 `aria-*`와 키보드 동작을 확인한다.
- 텍스트와 배경 대비는 일반 텍스트 4.5:1 이상, 큰 텍스트 3:1 이상을 목표로 한다.

---

## 7. AI 도구와 같이 작업할 때

Codex, Claude Code, Cursor 같은 AI 도구를 사용할 때는 이 starter의 `AGENTS.md`, `CLAUDE.md`, `.claude/skills/`, `.agents/skills/`가 기준이 된다.

AI에게 화면 작업을 맡길 때는 처음에 아래 정보를 짧게 준다.

```text
이 프로젝트는 infoUX starter 기준으로 작업해줘.
사이트 유형은 CMS·관리자이고, 이번 작업은 사용자 목록 화면 section 퍼블리싱이야.
기존 컴포넌트와 src/snippets 패턴을 우선 사용하고, 색상은 var(--color-*)만 써줘.
```

AI가 바로 코드를 만들려고 하면 먼저 `contracts/task-contract.md` 기준으로 사이트 유형, 핵심 과업, 재사용 컴포넌트, 위젯, 예외를 정리하게 한다.

---

## 8. 문제 상황별 확인

### 스타일이 적용되지 않는다

1. `npm run build`를 실행했는지 확인한다.
2. HTML에 `dist/css/style.css`가 연결되어 있는지 확인한다.
3. HTML 파일 위치에 따라 CSS 경로가 맞는지 확인한다.

예:

```html
<!-- 루트 index.html -->
<link rel="stylesheet" href="dist/css/style.css">

<!-- 하위 폴더 pages/about.html -->
<link rel="stylesheet" href="../dist/css/style.css">
```

### 토큰을 고쳤는데 색이 안 바뀐다

1. `tokens/foundation.json`을 수정했는지 확인한다.
2. `tokens/build/tokens.css`를 직접 수정하지 않았는지 확인한다.
3. `npm run build`를 다시 실행한다.

### `npm run check`에서 오류가 난다

오류 메시지가 가리키는 파일과 규칙 번호를 먼저 본다.

자주 걸리는 항목:

| 항목 | 해결 |
|------|------|
| raw color | `#fff`, `rgb()`, `hsl()`을 `var(--color-*)`로 교체 |
| img alt 누락 | 의미 이미지에는 설명, 장식 이미지는 `alt=""` 추가 |
| label 누락 | input id와 label for 연결 |
| page shell 오류 | `skip-to-content`, `main#main`, `section > .container` 구조 확인 |
| ARIA 누락 | 탭, 모달, 아코디언 스니펫 기준으로 보정 |

### 브라우저에서 레이아웃이 깨진다

1. 모바일 360px, 태블릿 768px, PC 1280px 기준으로 확인한다.
2. 가로 스크롤이 생기면 고정 width, 긴 단어, table, flex item의 `min-width`를 확인한다.
3. 버튼과 카드 안의 텍스트가 넘치면 줄바꿈, min/max width, padding을 조정한다.

---

## 9. 작업 완료 전 체크리스트

- [ ] `npm run check`를 실행했다.
- [ ] `npm run lint:css`를 실행했다.
- [ ] `npm run build`가 성공했다.
- [ ] HTML에 `skip-to-content`, `header`, `main`, `footer`가 있다.
- [ ] `main` 안의 콘텐츠가 `section > .container` 구조다.
- [ ] 이미지 `alt`, 폼 `label`, 버튼/링크의 시맨틱 태그를 확인했다.
- [ ] 색상은 `var(--color-*)` 토큰만 사용했다.
- [ ] 프로젝트 전용 CSS가 필요하면 별도 파일을 만들고 `src/styles/style.css` 확장 슬롯에서 import했다.
- [ ] BEM 2단계 element, `.is-*`, `.has-*`, 시각 modifier를 쓰지 않았다.
- [ ] 모바일 360px에서 가로 스크롤과 터치 영역을 확인했다.
- [ ] 디자인과 다르게 보정한 부분은 이유를 메모했다.

---

## 10. 기억할 원칙

starter의 목적은 빠르게 예쁜 화면을 만드는 것보다, 프로젝트마다 같은 품질 기준으로 퍼블리싱을 시작하게 하는 것이다.

처음에는 새 구조를 만들기보다 아래 순서를 우선한다.

1. `src/snippets/`에서 비슷한 마크업을 찾는다.
2. `src/styles/6-components/`의 기존 컴포넌트를 조합한다.
3. 색상은 `tokens/foundation.json`과 `var(--color-*)`로 해결한다.
4. 새 컴포넌트가 필요하면 일회성 프로젝트 패턴인지 공통 컴포넌트 후보인지 구분한다.
5. 마지막에 `check`, `lint`, `build`로 확인한다.
