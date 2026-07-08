# 표 (Table) — KRDS

데이터 표. 모바일에서는 가로 스크롤 컨테이너로 감싸서 사용.

## 기본 마크업

```html
<div class="table-wrap">
  <table class="table">
    <caption class="table__caption">2026년 1분기 신청 현황</caption>
    <thead>
      <tr>
        <th scope="col">번호</th>
        <th scope="col">신청자</th>
        <th scope="col">신청일</th>
        <th scope="col">상태</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>홍길동</td>
        <td>2026-04-01</td>
        <td><span class="tag tag--success">완료</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

## Variant

- 기본
- `.table--hover` — 행 호버 강조
- `.table--striped` — 줄무늬 (짝수 행 회색)
- `.table--compact` — 좁은 패딩 (8px 12px)
- `.table--comfortable` — 넓은 패딩 (20px)

## 정렬 가능한 헤더

```html
<th scope="col" aria-sort="ascending">
  <button type="button">신청일</button>
</th>
```

## 선택된 행

```html
<tr aria-selected="true">...</tr>
```

## 접근성

- `<th scope="col">` 또는 `scope="row">` 필수
- `<caption>`으로 표 제목 명시
- 정렬 헤더는 `aria-sort="ascending|descending|none"`
- 선택 행은 `aria-selected="true"`
- 모바일 가로 스크롤은 `<div class="table-wrap">` 래퍼로 감싸기

## 출처

- CSS: `src/styles/6-components/table.css`
