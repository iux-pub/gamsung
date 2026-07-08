# 디자인 토큰 레퍼런스 — INFOUX Foundation

이 문서는 프로젝트에서 사용하는 공개 토큰의 범위와 사용 패턴을 안내한다.

**권위 있는 소스:**
- 단일 소스: `tokens/foundation.json`
- 빌드 산출물: `tokens/build/tokens.css`
- 카탈로그: `skill/references/krds-tokens.md`

`npm run build:tokens`로 산출물을 재생성한다.

## 공개 토큰 범위

```txt
tokens/foundation.json
       │
       └─ tokens/build/tokens.css
            ├─ --color-*      색상/상태 토큰
            ├─ --font-sans    기본 본문 폰트
            └─ --font-mono    코드/고정폭 폰트
```

간격, 크기, 타이포 스케일, 반경, 그림자, 모션, z-index는 토큰화하지 않는다.
프로젝트 화면 밀도와 사용성에 맞게 Tailwind v4 `@apply` 또는 CSS 직접값으로 작성한다.

## 색상 토큰

| 토큰 | 의미 |
|------|------|
| `--color-primary` | 브랜드/주요 액션 |
| `--color-primary-hover` | 주요 액션 hover |
| `--color-primary-pressed` | 주요 액션 active |
| `--color-text` | 본문 텍스트 |
| `--color-text-bolder` | 강조 텍스트 |
| `--color-text-subtle` | 보조 텍스트 |
| `--color-text-disabled` | 비활성 텍스트 |
| `--color-text-inverse` | 어두운 배경 위 텍스트 |
| `--color-bg` | 기본 배경 |
| `--color-bg-subtler` | 보조 배경 |
| `--color-surface` | 카드/패널 표면 |
| `--color-border` | 기본 테두리 |
| `--color-danger` / `--color-warning` / `--color-success` / `--color-info` | 상태 색상 |

단계 색상은 명도 조정이 필요한 예외에만 `--color-primary-50`, `--color-gray-20`처럼 사용한다.

## 폰트 토큰

| 토큰 | 용도 |
|------|------|
| `--font-sans` | 본문/컴포넌트 기본 폰트 |
| `--font-mono` | 코드, kbd, pre 등 고정폭 텍스트 |

폰트 지정은 전역 `body`에서 `var(--font-sans)`로 한 번 적용한다.
