---
name: init-project
description: INFOUX 스타터 기반 새 프로젝트 초기화. 프로젝트 유형과 브랜드 토큰을 반영해 프로젝트 컨트랙트와 토큰을 설정한다. "새 프로젝트", "프로젝트 시작", "init project" 요청 시 사용.
---

# init-project

`https://github.com/iux-pub/starter`를 기반으로 Tailwind v4 + 표준 CSS 프로젝트를 초기화한다.

## 확인 항목

- 프로젝트명
- 사이트 유형: 일반사이트 / 공공서비스 / 공공기관 / CMS·관리자 / 커머스·예약
- 브랜드 primary 색상
- 기본 폰트
- 타깃 브라우저
- 컨테이너 최대 너비
- 정부·공공 아이덴티티 요소 적용 여부

사이트 유형이나 공공 요소 적용 여부를 자료에서 확인할 수 없을 때만 사용자에게 질문한다.

## 실행 절차

1. 스타터를 clone하고 새 Git 저장소로 초기화한다.
2. `tokens/foundation.json`의 primitive 및 semantic 매핑을 프로젝트 값으로 수정한다.
3. 프로젝트 고유 CSS가 필요하면 `src/styles/project.css`를 만들고 `style.css`에서 import한다.
4. 루트 `AGENTS.md`에 프로젝트 유형, 실행 명령, 수정 금지 영역, 검증 명령을 명시한다.
5. 토큰·CSS를 빌드하고 전체 정적 검사를 실행한다.

```bash
git clone https://github.com/iux-pub/starter.git {project}
cd {project}
rm -rf .git
git init
npm install
npm run check
npm run build
```

## 프로젝트 CSS 예시

```css
/* 프로젝트 전용 확장 */
:root {
  --container-max-width: 1200px;
}

.project-shell {
  font-family: var(--font-sans);
  color: var(--color-text);
}
```

브랜드 raw 색상은 CSS에 직접 쓰지 않고 `tokens/foundation.json`의 토큰 정의에서만 관리한다.

## 생성하는 AGENTS.md 핵심

- 가장 가까운 `AGENTS.md`가 해당 디렉터리 작업 규칙을 보강한다.
- UI 작성 전 사이트 유형을 판정한다.
- 색상 토큰, BEM, 시맨틱 HTML, WAI-ARIA, page shell 계약을 따른다.
- 개발팀 소유 코드와 UX팀 소유 CSS 경계를 명시한다.
- 완료 전 `npm run check`, `npm run lint:css`, `npm run build`를 실행한다.
- 자동 검사로 확인할 수 없는 키보드 순서, 스크린리더, 실기기는 수동 QA로 보고한다.

## 금지

- 전처리기 도입
- CSS에 raw hex/rgb/hsl 작성
- 폐기된 토큰 별칭 생성
- 정부 상징이나 공식 배너를 확인 없이 생성
- 검사 실패 상태로 초기화 완료 보고
