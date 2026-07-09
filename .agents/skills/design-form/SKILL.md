---
name: design-form
description: 입력폼, 신청, 문의, 검색 조건, 로그인, 결제 정보 등 form UI를 설계하거나 수정할 때 사용. label, 도움말, 오류, 필수 상태와 제출 흐름을 구현 전에 확정한다.
---

# design-form

## 구현 전 결정

1. 폼의 목적과 제출 후 결과를 Task Contract의 `primaryTask`에 기록한다.
2. 필드 목록, 필수 여부, 입력 형식, 도움말, 오류 메시지를 정한다.
3. 관련 필드는 `fieldset`과 `legend`로 그룹화한다.
4. `skill/references/html-semantics.md`의 form, select, check-radio 패턴을 선택한다.
5. 오류 요약이 필요한 긴 폼인지 판정한다.

## 필수 패턴

- 모든 컨트롤은 보이는 `label` 또는 동등한 접근 가능한 이름을 가진다.
- 도움말과 오류는 고유 id로 `aria-describedby`에 연결한다.
- 오류 상태는 BEM modifier와 `aria-invalid="true"`를 함께 사용한다.
- placeholder는 label을 대체하지 않는다.
- 제출은 native `form`과 `button type="submit"`을 사용한다.
- 모바일 인터랙티브 영역은 44x44px 이상이다.
