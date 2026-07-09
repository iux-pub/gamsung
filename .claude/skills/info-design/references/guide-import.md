# 개발팀 레포에 가이드 임포트하기

이 문서는 **UX 팀장이 개발팀 환경에 info-design 스킬을 배포하는 방법**과
**개발자가 작업 시작 시 활성화하는 방법**을 다룬다.

---

## 1. UX 팀장 — 스킬 배포

### A. 자기 환경 (UX 팀장 본인)

```bash
# infoUX 레포에서 스킬 콘텐츠 빌드
cd ~/Documents/Work/프로젝트/infoUX
npm run build:skill

# 스킬 디렉토리에 동기화
rsync -av --delete skill/ ~/.claude/skills/info-design/
```

### B. 개발팀 환경 (각 개발자 머신)

**옵션 1 — 레포에 직접 접근 가능한 경우**:
```bash
# UX 팀장이 개발팀 머신에 직접 들어가서:
cd /path/to/dev-team/project
mkdir -p .claude/skills
rsync -av --delete /path/to/infoUX/skill/ .claude/skills/info-design/
```

**옵션 2 — Git 서브트리/서브모듈** (권장):
```bash
# 개발팀 레포 루트에서:
git subtree add --prefix=.claude/skills/info-design \
  https://github.com/iux-pub/info-design.git main --squash

# 갱신 시:
git subtree pull --prefix=.claude/skills/info-design \
  https://github.com/iux-pub/info-design.git main --squash
```

**옵션 3 — 압축 패키지 배포**:
```bash
# UX 팀장이:
cd ~/Documents/Work/프로젝트/infoUX
tar -czf info-design-$(date +%Y%m%d).tar.gz -C skill .

# 각 개발자:
mkdir -p .claude/skills/info-design
tar -xzf info-design-YYYYMMDD.tar.gz -C .claude/skills/info-design
```

---

## 2. 개발팀 레포에 토큰 CSS 같이 배포

스킬은 **규정**만 담고 있다. 실제 토큰 CSS는 별도 배포 필요.

### 권장 구조 (개발팀 프로젝트)

```
project/
├── .claude/
│   └── skills/
│       └── info-design/         ← 컨트랙트 (UX팀 배포)
│           ├── SKILL.md
│           └── references/
├── src/
│   └── styles/
│       ├── tokens.css           ← KRDS 토큰 (UX팀 배포)
│       ├── components/
│       │   └── (KRDS 컴포넌트 CSS — UX팀 배포)
│       └── app.css              ← 프로젝트 진입점
└── CLAUDE.md                    ← 트리거 + 강제 임포트
```

`tokens.css`와 `components/`는 infoUX 레포의 빌드 산출물:
- `tokens.css` ← `infoUX/tokens/build/tokens.css`
- `components/*.css` ← `infoUX/src/styles/6-components/*.css`

---

## 3. 개발팀 CLAUDE.md — 자동 적용 패턴

개발팀 프로젝트의 `CLAUDE.md` 상단에 다음 추가:

```markdown
# [프로젝트명] — 개발 가이드

## UI/스타일 작업 시 자동 적용

모든 CSS/HTML/UI 작업은 별도 트리거 없이 infoUX 컨트랙트를 적용한다.

1. `contracts/task-contract.md` 형식으로 사이트 유형, 핵심 과업, 재사용 패턴과 위젯을 먼저 확정한다.
2. `.claude/skills`에서 작업에 맞는 스킬을 선택한다.
3. 기존 컴포넌트와 승인 패턴을 조합한 뒤 구현한다.

위반 발견 시 LLM은 즉시 작업을 중단하고 사용자에게 보고한다.

### 하네스가 아직 없는 프로젝트의 자체 검증

infoUX 전용 `npm run check`, `scripts/check-violations.js`, `scripts/check-html-structure.js`가 없는 기존 프로젝트라도 검증을 생략하지 않는다.

1. 프로젝트의 `package.json`, CI 설정, README에서 기존 `lint`/`build`/`test`/`a11y` 명령을 찾아 실행한다.
2. 자동 하네스가 없으면 변경 파일을 직접 점검한다.
3. 최소 점검 항목:
   - raw `hex`/`rgb`/`hsl`, Tailwind raw 컬러, SCSS 문법, `!important`
   - 핵심 CSS의 `:has()` 의존, `:focus { outline: none }`
   - BEM 2단계 element, 비-BEM 상태 클래스, 시각적 modifier
   - `div/span` 클릭 핸들러, 이미지 `alt`, 폼 `label`, 필수 ARIA, skip link/page shell
   - 모바일 360px 기준 터치 영역 44px 이상, 텍스트 겹침, 가로 overflow
4. 최종 보고에는 실행한 자동 검증, 대체한 수동 검증, 남은 수동 QA 항목을 구분해 적는다.
```

---

## 4. 개발자 — 작업 시작 절차

```
1. 새 작업 시작 → Claude에게 "info-design 스킬 기준으로 가자" 발화
2. Claude가 SKILL.md를 로드
3. 작업 맥락에 따라 references/* 자동 로드 (token/components/forbidden-patterns 등)
4. 모든 코드 생성이 컨트랙트 안에서 진행
5. 가능한 자동 검증 실행. 하네스가 없으면 자체 검증 체크리스트로 대체
6. 위반 시 Claude가 즉시 보고 + 옵션 제시
```

---

## 5. 갱신 흐름

```
1. UX팀이 KRDS 토큰 또는 컴포넌트 변경 결정
   ↓
2. infoUX 레포에서:
   - tokens/foundation.json (KRDS 정본 갱신 시) 또는
   - tokens/foundation.json (INFOMIND 결정 변경 시) 또는
   - src/styles/6-components/*.css (컴포넌트 변경 시)
   ↓
3. npm run build:tokens && npm run build:skill
   ↓
4. UX 팀장이 개발팀 환경에 rsync (옵션 1) / git subtree pull (옵션 2)
   ↓
5. 개발팀 Claude가 다음 작업 시 새 컨트랙트로 작동
```

---

## 6. 검증 — 컨트랙트 작동 확인

개발팀에서 임포트 후 검증:

```
사용자: "info-design 스킬 기준으로 가자. 빨간색 버튼 만들어줘"

기대 응답:
"info-design 컨트랙트가 활성화되었습니다.

'빨간색' 표현이 모호합니다. KRDS 시맨틱 색상으로 매핑해야 합니다:
1. 오류/삭제 액션 → .btn--primary (단, 색은 → bg-danger 권장하지 않음. KRDS는 primary가 액션 표준)
   또는 .btn--text + text-danger (텍스트만 빨강)
2. 강조/포인트색 → .tag--danger 또는 .badge

어느 것을 의도하신 건가요?"
```

위와 비슷한 응답이 나오면 컨트랙트가 정상 작동.

만약 Claude가 Tailwind 기본 팔레트 raw 컬러를 그대로 출력하면 — 컨트랙트가 활성화되지 않은 것.
"info-design 스킬 기준으로 가자" 트리거 문구를 다시 발화한다.

---

## 7. FAQ

**Q. 한 번에 모든 개발팀에 배포하려면?**
A. Git 서브트리 패턴(옵션 2)을 권장. 개발팀 레포 PR로 일괄 배포 가능.

**Q. 토큰만 자주 바뀌면?**
A. 토큰 CSS만 따로 npm 패키지화 검토 (`@infomind/krds-tokens`) — 별도 인프라 작업 필요.

**Q. 스킬과 토큰이 따로 갱신되면 버전 미스매치 위험은?**
A. 스킬 SKILL.md 헤더에 토큰 빌드 일시를 명시. 개발팀 Claude가 미스매치 감지 시 보고하도록 SKILL.md에 명시한다.

**Q. 외부 협력사도 사용 가능?**
A. 가능. 단, infoUX 레포 자체는 인포마인드 내부용이므로 스킬 배포는 UX팀 검토 후.
