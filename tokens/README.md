# Tokens — INFOUX Foundation

이 폴더는 인포마인드 UX팀의 파운데이션 토큰 단일 소스다.
**토큰 변경은 반드시 `foundation.json`에서만** 한다. 출력물(`build/`)은 직접 수정하지 않는다.

## 파일 구조

```txt
tokens/
├── foundation.json       ← 색상 + 기본 폰트 단일 소스
├── README.md
└── build/                ← 자동 생성
    └── tokens.css        ← 공개 CSS 변수 + Tailwind v4 @theme
```

## 빌드

```bash
npm run build:tokens
```

## 공개 토큰 범위

`tokens/build/tokens.css`는 다음만 발행한다.

- 색상: `--color-*`
- 폰트 패밀리: `--font-sans`, `--font-mono`

간격, 크기, 타이포 스케일, 반경, 그림자, 모션, z-index는 토큰화하지 않는다.
해당 값은 CSS/Tailwind 직접값으로 작성한다.

## 사용 원칙

- 컴포넌트/페이지 색상은 `--color-*` 시맨틱 토큰을 우선 사용한다.
- 단계 색상은 명도 조정이 필요한 예외에만 `--color-primary-50`, `--color-gray-20`처럼 사용한다.
- 폰트 지정은 전역 `body`에서 `var(--font-sans)`로 한 번 적용한다.
- 코드 영역은 `var(--font-mono)`를 사용한다.
- 공개 사용 규칙에는 `--color-*`, `--font-*`만 포함한다.

## 갱신

색상 또는 기본 폰트 기준이 바뀌면 `foundation.json`만 수정한다.
