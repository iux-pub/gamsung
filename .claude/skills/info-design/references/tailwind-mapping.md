# Tailwind v4 매핑

INFOUX는 Tailwind v4 `@theme`에 색상과 폰트만 공개한다.

## 색상 유틸리티

| Tailwind | 토큰 | 용도 |
|----------|------|------|
| `bg-primary` | `--color-primary` | 메인 액션 |
| `bg-primary-hover` | `--color-primary-hover` | hover 상태 |
| `bg-primary-pressed` | `--color-primary-pressed` | active 상태 |
| `text-text` | `--color-text` | 본문 텍스트 |
| `text-text-bolder` | `--color-text-bolder` | 강조 텍스트 |
| `text-text-subtle` | `--color-text-subtle` | 보조 텍스트 |
| `text-text-disabled` | `--color-text-disabled` | 비활성 텍스트 |
| `text-text-inverse` | `--color-text-inverse` | 어두운 배경 위 텍스트 |
| `bg-bg` | `--color-bg` | 기본 배경 |
| `bg-bg-subtler` | `--color-bg-subtler` | 보조 배경 |
| `bg-surface` | `--color-surface` | 카드/패널 표면 |
| `border-border` | `--color-border` | 기본 보더 |
| `border-border-light` | `--color-border-light` | 약한 보더 |
| `border-border-primary` | `--color-border-primary` | 활성 보더 |
| `text-danger-text` | `--color-danger-text` | 오류 텍스트 |
| `bg-danger-surface` | `--color-danger-surface` | 오류 배경 |

단계 색상은 예외적으로만 사용한다.

| Tailwind | 토큰 |
|----------|------|
| `bg-primary-{5..95}` | `--color-primary-{5..95}` |
| `bg-secondary-{5..95}` | `--color-secondary-{5..95}` |
| `bg-gray-{0,5,10,..,95,100}` | `--color-gray-*` |
| `bg-danger-{5..95}` | `--color-danger-*` |
| `bg-warning-{5..95}` | `--color-warning-*` |
| `bg-success-{5..95}` | `--color-success-*` |
| `bg-info-{5..95}` | `--color-info-*` |

## 폰트 유틸리티

| Tailwind | 토큰 |
|----------|------|
| `font-sans` | `--font-sans` |
| `font-mono` | `--font-mono` |

## 직접값 사용

간격, 크기, 타이포 스케일, 반경, 그림자, 모션, z-index는 Tailwind arbitrary value 또는 CSS 직접값으로 작성한다.

```css
.card {
  @apply p-[2.4rem] rounded-[0.6rem] shadow-[0_0.8rem_1.6rem_#00000014];
}
```
