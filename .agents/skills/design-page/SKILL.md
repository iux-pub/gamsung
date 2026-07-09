---
name: design-page
description: INFOUX 기준으로 새 페이지, 화면, 랜딩, 상세, 목록, 관리자 화면을 설계하거나 구현할 때 사용. 코드 작성 전에 사이트 유형, 사용자 핵심 과업, page shell, section 패턴과 재사용 컴포넌트를 확정한다.
---

# design-page

페이지 코드를 바로 작성하지 않는다. 먼저 `contracts/task-contract.md` 형식으로 Task Contract를 선언한다.

## 절차

1. `skill/references/project-profiles.md`에서 사이트 유형과 기본 section 흐름을 판정한다.
2. 사용자의 핵심 과업을 한 문장으로 쓴다.
3. `skill/references/krds-components.md`에서 재사용할 컴포넌트를 고른다.
4. `contracts/html-page-contract.json`으로 page shell과 section 구조를 확정한다.
5. 인터랙티브 위젯이 있으면 `design-widget` 절차를 함께 적용한다.
6. Task Contract의 필수 항목이 채워진 뒤에만 구현한다.

## 생성 원칙

- `main` 직계 자식은 목적 기반 `section`이다.
- 각 section은 `.container`와 접근 가능한 이름을 가진다.
- 정부·공공 요소는 `publicIdentity: required`일 때만 생성한다.
- 기존 section·컴포넌트 조합으로 해결할 수 있으면 새 block을 만들지 않는다.
- 구현 후 검사는 선택을 대신하는 단계가 아니라 마지막 확인 단계다.
