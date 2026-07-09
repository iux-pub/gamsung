---
name: review-ui
description: INFOUX 기준으로 UI 구현을 리뷰하거나 규칙 준수 여부를 점검할 때 사용. 검사 결과만 나열하지 않고 Task Contract, 승인 패턴, 실제 구현의 차이를 우선 분석한다.
---

# review-ui

## 리뷰 순서

1. Task Contract 또는 작업 의도를 확인한다.
2. 사이트 유형과 선택한 page/component/widget 패턴이 맞는지 본다.
3. 기존 컴포넌트 재사용 가능성을 확인한다.
4. 시맨틱 HTML, ARIA 관계, 키보드, 포커스, 터치 영역을 검토한다.
5. 토큰, BEM, Tailwind v4, CSS layer 규칙을 검토한다.
6. 자동 검사는 마지막 증거로 실행한다.

발견 사항은 사용자 영향이 큰 순서로 파일과 위치를 제시한다. 검사 통과만으로 설계 의도가 맞다고 결론내리지 않는다.
