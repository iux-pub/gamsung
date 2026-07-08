/**
 * 파운데이션 토큰 빌드 스크립트
 *
 * 입력:
 *   tokens/foundation.json          (색상 + 기본 폰트 + 브레이크포인트 단일 소스)
 *
 * 출력:
 *   tokens/build/tokens.css         (공개 CSS 변수 + Tailwind v4 theme)
 *
 * 사용법: node scripts/build-tokens.js
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SOURCE_PATH = path.join(ROOT, 'tokens', 'foundation.json')
const BUILD_DIR = path.join(ROOT, 'tokens', 'build')
const CSS_PATH = path.join(BUILD_DIR, 'tokens.css')

if (!fs.existsSync(BUILD_DIR)) fs.mkdirSync(BUILD_DIR, { recursive: true })

const source = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf-8'))

function getByPath(tokenPath) {
  return tokenPath.split('.').reduce((acc, key) => acc?.[key], source)
}

function resolveValue(value) {
  if (typeof value !== 'string') return value

  return value.replace(/\{([^}]+)\}/g, (_, ref) => {
    const token = getByPath(ref)
    if (!token || !('value' in token)) {
      throw new Error(`토큰 참조를 찾을 수 없음: ${ref}`)
    }
    return resolveValue(token.value)
  })
}

function readToken(tokenPath) {
  const token = getByPath(tokenPath)
  if (!token || !('value' in token)) {
    throw new Error(`토큰을 찾을 수 없음: ${tokenPath}`)
  }
  return resolveValue(token.value)
}

function cssLine(name, tokenPath) {
  return `  ${name}: ${readToken(tokenPath)};`
}

const lines = []
const w = (s) => lines.push(s)

w('/**')
w(' * AUTO-GENERATED — tokens/build/tokens.css')
w(' * 출처: tokens/foundation.json')
w(' * 직접 수정 금지. 변경은 tokens/foundation.json에서 한다.')
w(' *')
w(' * 공개 토큰은 색상, 기본 폰트, 브레이크포인트만 발행한다.')
w(' * 간격·크기·타이포 스케일·반경·모션·그림자·z-index는 CSS/Tailwind 직접값으로 작성한다.')
w(' */')
w('')
w(':root {')
w('  /* Font families */')
w(cssLine('  --font-sans'.trim(), 'font.family.sans'))
w(cssLine('  --font-mono'.trim(), 'font.family.mono'))
w('')
w('  /* Breakpoints */')
w(cssLine('--breakpoint-mobile', 'breakpoint.mobile'))
w(cssLine('--breakpoint-tablet', 'breakpoint.tablet'))
w(cssLine('--breakpoint-pc', 'breakpoint.pc'))
w('')
w('  /* Semantic colors */')
w(cssLine('--color-primary', 'primitive.color.light.primary.50'))
w(cssLine('--color-primary-hover', 'primitive.color.light.primary.60'))
w(cssLine('--color-primary-pressed', 'primitive.color.light.primary.70'))
w(cssLine('--color-secondary', 'primitive.color.light.secondary.50'))
w(cssLine('--color-text', 'mode-light.color.text.basic'))
w(cssLine('--color-text-bolder', 'mode-light.color.text.bolder'))
w(cssLine('--color-text-subtle', 'mode-light.color.text.subtle'))
w(cssLine('--color-text-disabled', 'mode-light.color.text.disabled'))
w(cssLine('--color-text-inverse', 'mode-light.color.text.basic-inverse'))
w(cssLine('--color-bg', 'mode-light.color.background.white'))
w(cssLine('--color-bg-subtler', 'mode-light.color.background.gray-subtler'))
w(cssLine('--color-bg-subtle', 'mode-light.color.background.gray-subtle'))
w(cssLine('--color-bg-inverse', 'mode-light.color.background.inverse'))
w(cssLine('--color-bg-dim', 'mode-light.color.background.dim'))
w(cssLine('--color-surface', 'mode-light.color.surface.white'))
w(cssLine('--color-surface-subtler', 'mode-light.color.surface.gray-subtler'))
w(cssLine('--color-surface-disabled', 'mode-light.color.surface.disabled'))
w(cssLine('--color-surface-primary-subtler', 'mode-light.color.surface.primary-subtler'))
w(cssLine('--color-surface-information-subtler', 'mode-light.color.surface.information-subtler'))
w(cssLine('--color-surface-success-subtler', 'mode-light.color.surface.success-subtler'))
w(cssLine('--color-surface-warning-subtler', 'mode-light.color.surface.warning-subtler'))
w(cssLine('--color-surface-danger-subtler', 'mode-light.color.surface.danger-subtler'))
w(cssLine('--color-border', 'mode-light.color.border.gray'))
w(cssLine('--color-border-light', 'mode-light.color.border.gray-light'))
w(cssLine('--color-border-dark', 'mode-light.color.border.gray-dark'))
w(cssLine('--color-border-primary', 'mode-light.color.border.primary'))
w(cssLine('--color-border-primary-light', 'mode-light.color.border.primary-light'))
w(cssLine('--color-border-information-light', 'mode-light.color.border.information-light'))
w(cssLine('--color-border-success-light', 'mode-light.color.border.success-light'))
w(cssLine('--color-border-warning-light', 'mode-light.color.border.warning-light'))
w(cssLine('--color-border-danger-light', 'mode-light.color.border.danger-light'))
w(cssLine('--color-border-disabled', 'mode-light.color.border.disabled'))
w(cssLine('--color-link', 'mode-light.color.link.default'))
w(cssLine('--color-link-hover', 'mode-light.color.link.hover'))
w(cssLine('--color-link-pressed', 'mode-light.color.link.pressed'))
w(cssLine('--color-link-visited', 'mode-light.color.link.visited'))
w(cssLine('--color-button-primary-fill', 'mode-light.color.button.primary-fill'))
w(cssLine('--color-button-primary-fill-hover', 'mode-light.color.button.primary-fill-hover'))
w(cssLine('--color-button-primary-fill-pressed', 'mode-light.color.button.primary-fill-pressed'))
w(cssLine('--color-button-secondary-fill', 'mode-light.color.button.secondary-fill'))
w(cssLine('--color-button-secondary-fill-hover', 'mode-light.color.button.secondary-fill-hover'))
w(cssLine('--color-button-secondary-fill-pressed', 'mode-light.color.button.secondary-fill-pressed'))
w(cssLine('--color-button-secondary-border', 'mode-light.color.button.secondary-border'))
w(cssLine('--color-button-tertiary-fill', 'mode-light.color.button.tertiary-fill'))
w(cssLine('--color-button-tertiary-fill-hover', 'mode-light.color.button.tertiary-fill-hover'))
w(cssLine('--color-button-tertiary-fill-pressed', 'mode-light.color.button.tertiary-fill-pressed'))
w(cssLine('--color-button-tertiary-border', 'mode-light.color.button.tertiary-border'))
w(cssLine('--color-button-text-fill', 'mode-light.color.button.text-fill'))
w(cssLine('--color-button-text-fill-hover', 'mode-light.color.button.text-fill-hover'))
w(cssLine('--color-button-text-fill-pressed', 'mode-light.color.button.text-fill-pressed'))
w(cssLine('--color-button-text-border', 'mode-light.color.button.text-border'))
w(cssLine('--color-button-disabled-fill', 'mode-light.color.button.disabled-fill'))
w(cssLine('--color-button-disabled-border', 'mode-light.color.button.disabled-border'))
w(cssLine('--color-input-surface', 'mode-light.color.input.surface'))
w(cssLine('--color-input-surface-disabled', 'mode-light.color.input.surface-disabled'))
w(cssLine('--color-input-border', 'mode-light.color.input.border'))
w(cssLine('--color-input-border-active', 'mode-light.color.input.border-active'))
w(cssLine('--color-input-border-disabled', 'mode-light.color.input.border-disabled'))
w(cssLine('--color-input-border-error', 'mode-light.color.input.border-error'))
w(cssLine('--color-danger', 'primitive.color.light.danger.50'))
w(cssLine('--color-danger-text', 'mode-light.color.text.danger'))
w(cssLine('--color-danger-surface', 'mode-light.color.surface.danger-subtler'))
w(cssLine('--color-warning', 'primitive.color.light.warning.50'))
w(cssLine('--color-warning-text', 'mode-light.color.text.warning'))
w(cssLine('--color-warning-surface', 'mode-light.color.surface.warning-subtler'))
w(cssLine('--color-success', 'primitive.color.light.success.50'))
w(cssLine('--color-success-text', 'mode-light.color.text.success'))
w(cssLine('--color-success-surface', 'mode-light.color.surface.success-subtler'))
w(cssLine('--color-info', 'primitive.color.light.information.50'))
w(cssLine('--color-info-text', 'mode-light.color.text.information'))
w(cssLine('--color-info-surface', 'mode-light.color.surface.information-subtler'))
w(cssLine('--color-point', 'primitive.color.light.point.50'))
w(cssLine('--color-brand', 'primitive.color.light.brand.50'))
w('')
w('  /* 감성미식 브랜드 시맨틱 — 피그마 디자인 변수 정본 매핑 */')
w(cssLine('--color-brand-point', 'primitive.color.light.brand.point'))
w(cssLine('--color-brand-text', 'primitive.color.light.brand.text'))
w(cssLine('--color-brand-text-subtle', 'primitive.color.light.brand.text-subtle'))
w(cssLine('--color-brand-bg', 'primitive.color.light.gray.5'))
w(cssLine('--color-brand-card', 'primitive.color.light.alpha.white80'))
w(cssLine('--color-brand-border', 'primitive.color.light.alpha.white50'))
w(cssLine('--color-brand-active', 'primitive.color.light.brand.active'))
w(cssLine('--color-brand-step-muted', 'primitive.color.light.brand.step-muted'))
w('')
w('  /* 단계 색상: 필요한 경우에만 제한적으로 사용 */')
const colorGroups = ['primary', 'secondary', 'gray', 'danger', 'warning', 'success', 'information', 'point', 'brand']
const stages = ['5', '10', '20', '30', '40', '50', '60', '70', '80', '90', '95']
colorGroups.forEach(group => {
  const stageList = group === 'gray' ? ['0', ...stages, '100'] : stages
  stageList.forEach(stage => {
    if (source.primitive.color.light[group]?.[stage]) {
      w(cssLine(`--color-${group}-${stage}`, `primitive.color.light.${group}.${stage}`))
    }
  })
})
w(cssLine('--color-alpha-black-50', 'primitive.color.light.alpha.black50'))
w(cssLine('--color-alpha-black-75', 'primitive.color.light.alpha.black75'))
w('}')
w('')
w('[data-color-mode="high-contrast"] {')
w(cssLine('--color-primary', 'primitive.color.high-contrast.primary.50'))
w(cssLine('--color-primary-hover', 'primitive.color.high-contrast.primary.60'))
w(cssLine('--color-primary-pressed', 'primitive.color.high-contrast.primary.70'))
w(cssLine('--color-text', 'mode-high-contrast.color.text.basic'))
w(cssLine('--color-text-bolder', 'mode-high-contrast.color.text.bolder'))
w(cssLine('--color-text-subtle', 'mode-high-contrast.color.text.subtle'))
w(cssLine('--color-text-disabled', 'mode-high-contrast.color.text.disabled'))
w(cssLine('--color-text-inverse', 'mode-high-contrast.color.text.basic-inverse'))
w(cssLine('--color-bg', 'mode-high-contrast.color.background.white'))
w(cssLine('--color-bg-subtler', 'mode-high-contrast.color.background.gray-subtler'))
w(cssLine('--color-bg-subtle', 'mode-high-contrast.color.background.gray-subtle'))
w(cssLine('--color-bg-inverse', 'mode-high-contrast.color.background.inverse'))
w(cssLine('--color-bg-dim', 'mode-high-contrast.color.background.dim'))
w(cssLine('--color-surface', 'mode-high-contrast.color.surface.white'))
w(cssLine('--color-surface-subtler', 'mode-high-contrast.color.surface.gray-subtler'))
w(cssLine('--color-surface-disabled', 'mode-high-contrast.color.surface.disabled'))
w(cssLine('--color-border', 'mode-high-contrast.color.border.gray'))
w(cssLine('--color-border-light', 'mode-high-contrast.color.border.gray-light'))
w(cssLine('--color-border-dark', 'mode-high-contrast.color.border.gray-dark'))
w(cssLine('--color-border-primary', 'mode-high-contrast.color.border.primary'))
w(cssLine('--color-border-disabled', 'mode-high-contrast.color.border.disabled'))
w('}')
w('')
w('@theme {')
w('  /* Tailwind 기본 색상 팔레트 비활성화 — INFOUX 색상만 노출 */')
w('  --color-*: initial;')
w('')
w(`  --font-sans: ${readToken('font.family.sans')};`)
w(`  --font-mono: ${readToken('font.family.mono')};`)
w('')
w('  /* Tailwind responsive variants: mobile:, tablet:, pc: */')
w('  --breakpoint-*: initial;')
w(`  --breakpoint-mobile: ${readToken('breakpoint.mobile')};`)
w(`  --breakpoint-tablet: ${readToken('breakpoint.tablet')};`)
w(`  --breakpoint-pc: ${readToken('breakpoint.pc')};`)
w('')
;[
  'primary', 'primary-hover', 'primary-pressed', 'secondary',
  'text', 'text-bolder', 'text-subtle', 'text-disabled', 'text-inverse',
  'bg', 'bg-subtler', 'bg-subtle', 'bg-inverse', 'bg-dim',
  'surface', 'surface-subtler', 'surface-disabled', 'surface-primary-subtler',
  'surface-information-subtler', 'surface-success-subtler', 'surface-warning-subtler', 'surface-danger-subtler',
  'border', 'border-light', 'border-dark', 'border-primary', 'border-primary-light',
  'border-information-light', 'border-success-light', 'border-warning-light', 'border-danger-light', 'border-disabled',
  'link', 'link-hover', 'link-pressed', 'link-visited',
  'button-primary-fill', 'button-primary-fill-hover', 'button-primary-fill-pressed',
  'button-secondary-fill', 'button-secondary-fill-hover', 'button-secondary-fill-pressed', 'button-secondary-border',
  'button-tertiary-fill', 'button-tertiary-fill-hover', 'button-tertiary-fill-pressed', 'button-tertiary-border',
  'button-text-fill', 'button-text-fill-hover', 'button-text-fill-pressed', 'button-text-border',
  'button-disabled-fill', 'button-disabled-border',
  'input-surface', 'input-surface-disabled', 'input-border', 'input-border-active', 'input-border-disabled', 'input-border-error',
  'danger', 'danger-text', 'danger-surface',
  'warning', 'warning-text', 'warning-surface',
  'success', 'success-text', 'success-surface',
  'info', 'info-text', 'info-surface', 'point', 'brand',
  'brand-point', 'brand-text', 'brand-text-subtle', 'brand-bg', 'brand-card', 'brand-border', 'brand-active', 'brand-step-muted',
  'alpha-black-50', 'alpha-black-75'
].forEach(name => {
  w(`  --color-${name}: var(--color-${name});`)
})

colorGroups.forEach(group => {
  const stageList = group === 'gray' ? ['0', ...stages, '100'] : stages
  stageList.forEach(stage => {
    if (source.primitive.color.light[group]?.[stage]) {
      w(`  --color-${group}-${stage}: var(--color-${group}-${stage});`)
    }
  })
})
w('}')

fs.writeFileSync(CSS_PATH, lines.join('\n') + '\n')
console.log(`✓ tokens.css (${(fs.statSync(CSS_PATH).size / 1024).toFixed(1)}KB, ${lines.length}줄)`)
console.log('')
console.log('완료. 출력:')
console.log(`  - ${path.relative(ROOT, CSS_PATH)}`)
