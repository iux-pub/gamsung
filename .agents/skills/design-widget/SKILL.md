---
name: design-widget
description: modal, tab, accordion, disclosure, tooltip, carousel, calendar, combobox 같은 인터랙티브 위젯을 설계하거나 구현할 때 사용. 상태 모델, ARIA 관계, 키보드와 포커스 이동을 코드 전에 확정한다.
---

# design-widget

## 구현 전 결정

1. native HTML로 해결 가능한지 먼저 확인한다.
2. `skill/references/html-semantics.md`에서 해당 위젯 패턴을 선택한다.
3. Task Contract의 `interactive`에 위젯명과 상태를 기록한다.
4. 트리거, 제어 대상, id 관계, 초기 상태, 종료 조건을 정한다.
5. Tab, Enter, Space, Escape, 화살표 키와 포커스 복귀 규칙을 정한다.

## 필수 패턴

- 시각 상태는 의미 기반 BEM modifier로 표현한다.
- 의미 상태는 `aria-expanded`, `aria-selected`, `aria-pressed`, `aria-hidden` 등으로 표현한다.
- `aria-controls`, `aria-labelledby`의 대상 id가 실제로 존재해야 한다.
- modal은 열릴 때 내부로 포커스를 이동하고 닫힐 때 트리거로 복귀한다.
- 단순 표시/숨김을 이유로 불필요한 ARIA widget role을 만들지 않는다.
