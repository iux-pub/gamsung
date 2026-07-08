# 주 메뉴 (Main Menu) — KRDS

드롭다운형 주 내비게이션. 헤더 안에서 사용.

## 기본 마크업

```html
<nav class="main-menu" aria-label="주 메뉴">
  <ul class="main-menu__list">
    <li class="main-menu__item">
      <a class="main-menu__link" href="/about">소개</a>
    </li>

    <li class="main-menu__item">
      <button type="button" class="main-menu__link" aria-haspopup="true" aria-expanded="false" aria-controls="submenu-services">
        서비스
      </button>
      <ul id="submenu-services" class="main-menu__submenu" hidden>
        <li><a href="/services/a">서비스 A</a></li>
        <li><a href="/services/b">서비스 B</a></li>
        <li><a href="/services/c" aria-current="page">서비스 C</a></li>
      </ul>
    </li>

    <li class="main-menu__item">
      <a class="main-menu__link" href="/contact">문의</a>
    </li>
  </ul>
</nav>
```

## 동작 (JS)

- 드롭다운 토글: `aria-haspopup` 가진 `<button>` 클릭 → 해당 `aria-controls` 서브메뉴 hidden 토글 + `aria-expanded` 토글
- 외부 클릭 시 닫기
- ESC 키로 닫기 + 트리거 버튼으로 포커스 복귀
- 키보드: 화살표로 항목 이동, Enter/Space로 선택

## 접근성

- 서브메뉴 트리거는 `<button>` 권장 (`<a>` 아님 — 링크가 아니므로)
- `aria-haspopup="true"` + `aria-expanded` 상태값
- `aria-controls`로 서브메뉴 id 연결
- 서브메뉴 `<ul>`은 `hidden` 속성으로 노출 제어
- 현재 페이지: `aria-current="page"`

## 출처

- CSS: `src/styles/6-components/main-menu.css`
