---
name: change-token
description: 색상, 폰트, 브레이크포인트 등 INFOUX 토큰을 추가·변경·재매핑할 때 사용. foundation, semantic alias, 생성 CSS와 starter 영향 범위를 먼저 확인한다.
---

# change-token

## 절차

1. 변경 목적이 primitive 추가인지 semantic alias 변경인지 구분한다.
2. `skill/references/krds-tokens.md`와 `tokens/foundation.json`에서 기존 토큰으로 해결 가능한지 확인한다.
3. 사용처를 검색하고 대비, 상태, 다크 표면 등 영향 범위를 기록한다.
4. 원본 `tokens/foundation.json`만 수정하고 생성물은 빌드로 갱신한다.
5. `npm run build:tokens` 후 원본과 starter의 drift를 확인한다.

## 금지

- CSS에서 raw 색상으로 우회
- 기존 의미와 다른 용도로 semantic token 재사용
- 생성된 `tokens/build/tokens.css` 직접 수정
- 사용처 조사 없이 토큰 삭제 또는 이름 변경
