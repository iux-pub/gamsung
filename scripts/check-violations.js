#!/usr/bin/env node

// check-violations.js — info-design 컨트랙트 자동 검출
// raw 색상, 옛 시스템 흔적, 옛 variant, SCSS 잔재, 접근성 누락 검출.
//
// 종료 코드: 0 = 통과 또는 경고만, 2 = 오류
//   STRICT=1 환경변수 설정 시 경고도 1로 실패 처리

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const STYLES_DIR = path.join(ROOT, 'src/styles')
const SNIPPETS_DIR = path.join(ROOT, 'src/snippets')
const SITE_DIR = path.join(ROOT, 'site')

const TARGET_FILES = process.argv.slice(2)

// ─── 출력 헬퍼 ─────────────────────────────────────────

const RESET = '\x1b[0m'
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const GREEN = '\x1b[32m'
const CYAN = '\x1b[36m'
const DIM = '\x1b[2m'

let errorCount = 0
let warnCount = 0

function error(file, line, msg, code) {
  const loc = line ? `${file}:${line}` : file
  console.error(`${RED}[ERROR]${RESET} ${loc}\n  ${msg}${code ? `\n  ${DIM}${code}${RESET}` : ''}`)
  errorCount++
}

function warn(file, line, msg, code) {
  const loc = line ? `${file}:${line}` : file
  console.warn(`${YELLOW}[WARN]${RESET}  ${loc}\n  ${msg}${code ? `\n  ${DIM}${code}${RESET}` : ''}`)
  warnCount++
}

const rel = (p) => path.relative(ROOT, p)

// ─── 패턴 정의 ────────────────────────────────────────

// 1. SCSS 잔재 — info-design은 Tailwind v4 + CSS만 허용
const SCSS_USE = /@use\s+['"]/
const SCSS_FORWARD = /@forward\s+['"]/
const SCSS_VAR = /^\s*\$[\w-]+\s*:/

// 2. 옛 토큰명 — KRDS 마이그레이션 전 사용되던 이름 (사용 시 경고)
//   주의: --color-text-disabled, --color-border-light는 KRDS 신규 시스템에도 존재 — 제외
const OLD_TOKEN_NAMES = [
  '--color-primary-light', '--color-primary-dark',
  '--color-text-secondary',
  '--color-bg-secondary',
  '--color-primary-alpha-8', '--color-primary-alpha-6', '--color-black-alpha-50',
  '--font-size-2xl', '--font-size-xl', '--font-size-lg', '--font-size-md',
  '--font-size-base', '--font-size-sm', '--font-size-xs',
  '--font-family-base',
  '--font-weight-medium', '--font-weight-semibold',
  '--leading-tight', '--leading-loose',
  '--spacing-xs', '--spacing-sm', '--spacing-md', '--spacing-lg', '--spacing-xl',
  '--spacing-2xl', '--spacing-3xl',
  '--radius-sm', '--radius-base', '--radius-lg', '--radius-xl', '--radius-full',
  '--shadow-sm', '--shadow-base', '--shadow-lg',
  '--transition-fast', '--transition-base', '--transition-slow'
]

// 3. 옛 버튼 variant — KRDS 변환 필요
const OLD_BTN_VARIANTS = ['btn--ghost', 'btn--outline', 'btn--link', 'btn--sm', 'btn--lg', 'btn--hero']

// 4. Tailwind raw 컬러 유틸리티 — KRDS 시맨틱 토큰 대체 필요
// gray/slate/red/blue/green/amber/yellow + bg/text/border/ring/divide
const TW_RAW_COLOR = /\b(?:bg|text|border|ring|divide|hover:bg|hover:text|hover:border)-(?:gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+\b/

// 5. Tailwind 기본 폰트/사이즈/그림자/z-index/반경
const TW_DEFAULT_TEXT_SIZE = /\btext-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/
const TW_DEFAULT_FONT_WEIGHT = /\bfont-(?:thin|extralight|light|medium|semibold|extrabold|black)\b/
const TW_DEFAULT_RADIUS = /\brounded(?:-(?:sm|md|lg|xl|2xl|3xl|none|full))?\b/
const TW_DEFAULT_SHADOW = /\bshadow(?:-(?:xs|sm|md|lg|xl|2xl|inner|none))\b/
const TW_DEFAULT_ZINDEX = /\bz-(?:0|10|20|30|40|50|auto)\b/
const TW_DEFAULT_BREAKPOINT = /\b(?:sm|md|lg|xl|2xl):/

// 6. CSS hardcoded values
const HARDCODED_HEX = /:\s*#[0-9a-fA-F]{3,8}\b/
const HARDCODED_RGB = /:\s*rgba?\s*\(/
const HARDCODED_HSL = /:\s*hsla?\s*\(/
// 색상 외 단순 px값 (border 1~3px 예외)
const HARDCODED_PX = /(?:^|\s)(?:padding|margin|gap|top|right|bottom|left|width|height|min-width|min-height|max-width|max-height|font-size)\s*:\s*(\d+px)/
const ALLOWED_PX = /^(?:0|1|2|3|44|1px|2px|3px)$/

// 7. CSS 시스템 우회
const IMPORTANT_USED = /!important/
// :focus { outline: none } — 단, :focus:not(:focus-visible) 패턴은 legitimate fallback이라 제외
// 매치는 ":focus" 직후에 공백 또는 "{"가 와야 함 ":focus:" 같은 후속 의사 클래스 제외
const FOCUS_OUTLINE_NONE = /:focus(?![-:\w])\s*\{[^}]*outline\s*:\s*(?:none\b|0\s*(?:!important)?\s*(?:;|}))/

// 8. 호환성 위험 CSS 선택자 — 공공/기관 납품물은 폴백 없는 최신 선택자 의존 금지
const CSS_HAS_SELECTOR = /:has\(/

// 8-1. 모션 접근성 — animation/@keyframes는 reduced-motion 가드 필요 (R-22)
//   transition은 hover 효과 등 오탐이 많아 제외하고, 자동/반복 모션 신호인 animation·@keyframes만 검출한다.
const CSS_ANIMATION = /(?:^|[\s;{])animation(?:-name)?\s*:\s*(?!none\b)/
const CSS_KEYFRAMES = /@keyframes\s/
const REDUCED_MOTION = /prefers-reduced-motion/

// 9. BEM 위반
const BEM_DOUBLE_ELEMENT = /\.([\w-]+)__([\w-]+)__([\w-]+)/

// 10. HTML 위반
const INLINE_STYLE = /\bstyle\s*=/
const INLINE_STYLE_CUSTOM_PROP = /\bstyle\s*=\s*["'][^"']*--[\w-]+:[^"']*["']/
// 실제 <img> 태그만 검출 — src= 필수 (마크다운 안 인라인 `<img>` 같은 문서적 언급 제외)
const MISSING_ALT = /<img(?![^>]*\balt\s*=)[^>]*\bsrc\s*=[^>]*>/
const CLICK_ON_DIV = /<(?:div|span)[^>]+onclick/

// ─── 검사 함수 ────────────────────────────────────────

function checkCssFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const relPath = rel(filePath)

  // 자동 생성 파일 제외
  if (lines[0] && (lines[0].includes('AUTO-GENERATED') || lines[0].includes('자동 생성'))) return

  // 토큰 정의 파일 / 프로젝트 스타일 확장 파일은 raw hex 허용 (정의 자체가 raw임)
  const normPath = filePath.replace(/\\/g, '/');
  const isTokenFile = normPath.includes('1-settings') ||
                       normPath.includes('_project-style') ||
                       normPath.includes('tokens/build')

  const isEntryFile = /\/src\/styles\/(?:style|docs)\.css$/.test(normPath) ||
                      /\/src\/styles\/6-components\/index\.css$/.test(normPath) ||
                      /\/src\/styles\/3-generic\/reset\.css$/.test(normPath)

  if (!isTokenFile && !isEntryFile && !content.includes('@apply')) {
    error(relPath, null, '[R-19] 스타일 CSS는 Tailwind v4 @apply를 우선 사용해야 한다. 토큰이 필요한 값은 var(--token)으로 유지하되 레이아웃/상태 유틸은 @apply로 작성.')
  }

  lines.forEach((line, i) => {
    const lineNum = i + 1
    const trimmed = line.replace(/\/\*.*?\*\//g, '').trim()
    if (!trimmed) return

    // SCSS 문법 — 폐기됨 (R-03)
    if (SCSS_USE.test(trimmed)) {
      error(relPath, lineNum, '[R-03] SCSS @use 사용 금지. CSS @import 또는 Tailwind v4 @theme 사용.', trimmed)
    }
    if (SCSS_FORWARD.test(trimmed)) {
      error(relPath, lineNum, '[R-03] SCSS @forward 사용 금지.', trimmed)
    }
    if (SCSS_VAR.test(trimmed)) {
      error(relPath, lineNum, '[R-03] SCSS 변수 ($var) 금지. CSS 커스텀 프로퍼티 사용.', trimmed)
    }

    // 옛 토큰명 — info-design 컨트랙트 점검 (R-01: 토큰 시스템)
    for (const oldName of OLD_TOKEN_NAMES) {
      if (trimmed.includes(`var(${oldName})`)) {
        warn(relPath, lineNum, `[R-01] 옛 토큰명 \`${oldName}\` 사용. 현행 토큰으로 교체 권장.`, trimmed)
      }
    }

    // 옛 btn variant — 카탈로그 위반 (R-06: 시각적 modifier 금지와 같은 맥락)
    for (const oldVar of OLD_BTN_VARIANTS) {
      if (trimmed.match(new RegExp(`\\.${oldVar.replace(/--/g, '\\-\\-')}\\b`))) {
        warn(relPath, lineNum, `[R-06] 옛 버튼 variant \`.${oldVar}\` 사용. KRDS 4 variant(--primary/--secondary/--tertiary/--text) + 5 size(--xsmall..--xlarge)로 교체.`, trimmed)
      }
    }

    if (!isTokenFile) {
      // raw hex (R-01)
      if (HARDCODED_HEX.test(trimmed)) {
        error(relPath, lineNum, '[R-01] Raw hex 색상 금지. var(--color-*) 토큰 사용.', trimmed)
      }
      // raw rgb/hsl (R-01)
      if (HARDCODED_RGB.test(trimmed)) {
        error(relPath, lineNum, '[R-01] Raw rgb/rgba 색상 금지. var(--color-*) 토큰 사용.', trimmed)
      }
      if (HARDCODED_HSL.test(trimmed)) {
        error(relPath, lineNum, '[R-01] Raw hsl/hsla 색상 금지. var(--color-*) 토큰 사용.', trimmed)
      }
      // hardcoded px (R-01) — 간격/크기는 프로젝트 맥락에 따라 허용하되 반복 패턴은 토큰 권장
      const pxMatch = trimmed.match(HARDCODED_PX)
      if (pxMatch && !ALLOWED_PX.test(pxMatch[1])) {
        warn(relPath, lineNum, `[R-01] 하드코딩 \`${pxMatch[1]}\`. 반복되는 간격/크기라면 토큰화 권장.`, trimmed)
      }
    }

    // !important (R-02) — components/utilities 외 금지
    if (IMPORTANT_USED.test(trimmed) && !filePath.includes('7-utilities')) {
      // 외부 라이브러리 오버라이드 사유 주석이 있으면 허용
      const hasJustification = trimmed.includes('/* ') || (lines[i - 1] || '').includes('/*')
      if (!hasJustification) {
        warn(relPath, lineNum, '[R-02] !important 사용 시 사유 주석 필수.', trimmed)
      }
    }

    // 폴백 없는 :has() 의존 (R-20)
    if (CSS_HAS_SELECTOR.test(trimmed)) {
      error(relPath, lineNum, '[R-20] 핵심 CSS에서 :has() 선택자 사용 금지. sibling selector, 상태 class, ARIA 속성 selector로 대체.', trimmed)
    }

    // BEM 2단계 element (R-05)
    const bemMatch = trimmed.match(BEM_DOUBLE_ELEMENT)
    if (bemMatch) {
      error(relPath, lineNum, `[R-05] BEM 2단계 element 중첩 금지: .${bemMatch[1]}__${bemMatch[2]}__${bemMatch[3]}`, trimmed)
    }
  })

  // focus outline none 패턴 (R-11) — 멀티라인 스캔
  const contentNoComments = content.replace(/\/\*[\s\S]*?\*\//g, '')
  if (FOCUS_OUTLINE_NONE.test(contentNoComments)) {
    const matchLine = lines.findIndex(l => l.match(/:focus(?![-:\w])\s*\{/))
    error(relPath, matchLine + 1, '[R-11] :focus { outline: none } 금지. KRDS 4px primary outline 유지.', '')
  }

  // R-22: animation/@keyframes 사용 시 prefers-reduced-motion 가드 필요 — 파일 단위 멀티라인 스캔
  //   전정기관 장애·멀미 민감 사용자를 위해 자동/반복 모션은 모션 최소화 선호를 존중해야 한다.
  const hasAnimation = CSS_ANIMATION.test(contentNoComments) || CSS_KEYFRAMES.test(contentNoComments)
  if (hasAnimation && !REDUCED_MOTION.test(contentNoComments)) {
    const animLine = lines.findIndex(l => CSS_ANIMATION.test(l) || CSS_KEYFRAMES.test(l))
    warn(relPath, animLine + 1, '[R-22] animation/@keyframes 사용 파일에 @media (prefers-reduced-motion: reduce) 가드가 없다. 모션 최소화 선호 시 애니메이션을 축소·정지해야 한다.', '')
  }
}

// 의도적으로 잘못된 예시(❌ 금지)를 포함하는 자동 생성 문서 — 검사 제외
const HTML_SKIP_PATTERNS = [
  /\/site\/conventions\//, // rules.json → build:rules가 생성한 규칙 문서
  /\/site\/accessibility\// // 접근성 가이드 — "Don't" 예시 포함
]

function shouldSkipHtmlFile(filePath) {
  const normPath = filePath.replace(/\\/g, '/');
  return HTML_SKIP_PATTERNS.some(re => re.test(normPath))
}

function checkHtmlFile(filePath) {
  if (shouldSkipHtmlFile(filePath)) return

  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const relPath = rel(filePath)

  // R-14: 페이지 진입점(<body> 포함)에 skip-to-content 필수
  // 면제: partial(_includes), playground(내부 데모), snippet(컴포넌트 마크업 조각)
  const normPath = filePath.replace(/\\/g, '/');
  const hasBody = /<body\b/.test(content)
  const isPartial = /\/_includes\/partials\//.test(normPath) || /\/_includes\/components\//.test(normPath)
  const isPlayground = /\/src\/playground\//.test(normPath)
  const isSnippet = /\/src\/snippets\//.test(normPath)
  if (hasBody && !isPartial && !isPlayground && !isSnippet) {
    if (!/skip-to-content/.test(content)) {
      error(relPath, null, '[R-14] 건너뛰기 링크 누락. <body> 진입 직후 <a href="#main" class="skip-to-content"> 추가 필요.')
    }
  }

  lines.forEach((line, i) => {
    const lineNum = i + 1
    const trimmed = line.trim()
    if (!trimmed) return

    // 인라인 스타일 (R-07) — CSS 변수 주입은 허용
    if (INLINE_STYLE.test(trimmed) && !INLINE_STYLE_CUSTOM_PROP.test(trimmed)) {
      warn(relPath, lineNum, '[R-07] 인라인 style 금지. BEM 클래스 또는 Tailwind 유틸 사용.', trimmed.slice(0, 100))
    }

    // BEM 2단계 HTML (R-08)
    const bemMatch = trimmed.match(BEM_DOUBLE_ELEMENT)
    if (bemMatch) {
      warn(relPath, lineNum, '[R-08] BEM 2단계 element 중첩 클래스 금지.', trimmed.slice(0, 100))
    }

    // alt 누락 (R-09)
    if (MISSING_ALT.test(trimmed)) {
      error(relPath, lineNum, '[R-09] <img> alt 속성 누락. 장식이면 alt="".', trimmed.slice(0, 100))
    }

    // div onclick (R-10)
    if (CLICK_ON_DIV.test(trimmed)) {
      error(relPath, lineNum, '[R-10] <div>/<span> onclick 금지. <button> 또는 <a> 사용.', trimmed.slice(0, 100))
    }

    // Tailwind raw 컬러 유틸 (R-01: 토큰 시스템 우회)
    if (TW_RAW_COLOR.test(trimmed)) {
      const match = trimmed.match(TW_RAW_COLOR)
      error(relPath, lineNum, `[R-01] Tailwind raw 컬러 유틸 \`${match[0]}\` 금지. KRDS 시맨틱(bg-primary/text-text/bg-danger 등) 사용.`, trimmed.slice(0, 100))
    }

    // Tailwind 기본 텍스트 사이즈 (R-01: 권장 스케일 점검)
    if (TW_DEFAULT_TEXT_SIZE.test(trimmed)) {
      const match = trimmed.match(TW_DEFAULT_TEXT_SIZE)
      warn(relPath, lineNum, `[R-01] Tailwind 기본 \`${match[0]}\` 사용. 반복되는 타입 계층이면 프로젝트/INFOMIND 스케일 사용 권장.`, trimmed.slice(0, 100))
    }

    // Tailwind 기본 폰트 두께 (R-01)
    if (TW_DEFAULT_FONT_WEIGHT.test(trimmed)) {
      const match = trimmed.match(TW_DEFAULT_FONT_WEIGHT)
      warn(relPath, lineNum, `[R-01] \`${match[0]}\` 사용. 제품 내 타입 위계와 일관되는지 확인 필요.`, trimmed.slice(0, 100))
    }

    // Tailwind 기본 반경 (R-01)
    if (TW_DEFAULT_RADIUS.test(trimmed)) {
      const match = trimmed.match(TW_DEFAULT_RADIUS)
      // rounded-full은 rounded-max로 교체
      if (match[0] !== 'rounded-none') {
        warn(relPath, lineNum, `[R-01] Tailwind 기본 \`${match[0]}\` 사용. 반복되는 컴포넌트 반경이면 공통 토큰 사용 권장.`, trimmed.slice(0, 100))
      }
    }

    // Tailwind 기본 그림자 (R-01)
    if (TW_DEFAULT_SHADOW.test(trimmed)) {
      const match = trimmed.match(TW_DEFAULT_SHADOW)
      warn(relPath, lineNum, `[R-01] Tailwind 기본 \`${match[0]}\` 사용. 반복되는 elevation이면 INFOMIND shadow 토큰 사용 권장.`, trimmed.slice(0, 100))
    }

    // Tailwind 기본 z-index (R-01)
    if (TW_DEFAULT_ZINDEX.test(trimmed)) {
      const match = trimmed.match(TW_DEFAULT_ZINDEX)
      warn(relPath, lineNum, `[R-01] Tailwind 기본 \`${match[0]}\` 사용 지양. INFOMIND z-{dropdown|modal|toast 등} 사용.`, trimmed.slice(0, 100))
    }

    // Tailwind 기본 브레이크포인트 (R-01)
    if (TW_DEFAULT_BREAKPOINT.test(trimmed)) {
      const match = trimmed.match(TW_DEFAULT_BREAKPOINT)
      warn(relPath, lineNum, `[R-01] Tailwind 기본 \`${match[0]}\` 사용. INFOUX 브레이크포인트 \`mobile:\` / \`tablet:\` / \`pc:\` 사용.`, trimmed.slice(0, 100))
    }

    // 옛 btn variant (R-06: 시각적/구형 modifier)
    for (const oldVar of OLD_BTN_VARIANTS) {
      if (trimmed.match(new RegExp(`\\b${oldVar.replace(/--/g, '\\-\\-')}\\b`))) {
        warn(relPath, lineNum, `[R-06] 옛 버튼 variant \`${oldVar}\` 사용. KRDS variant로 교체.`, trimmed.slice(0, 100))
      }
    }
  })
}

// ─── SCSS 파일 잔재 검출 ──────────────────────────────

function checkScssRemnants() {
  const dirs = [path.join(ROOT, 'src'), path.join(ROOT, 'starter', 'src')]
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue
    const found = collectFiles(dir, '.scss', ['node_modules'])
    for (const f of found) {
      error(rel(f), null, '[R-03] SCSS 파일 잔재. info-design은 CSS만 허용. 파일 삭제 또는 마이그레이션 필요.')
    }
  }
}

// ─── 컴포넌트 인덱스 일관성 ───────────────────────────

function checkComponentIndex() {
  const indexPath = path.join(STYLES_DIR, '6-components', 'index.css')
  if (!fs.existsSync(indexPath)) return

  const indexContent = fs.readFileSync(indexPath, 'utf-8')
  const componentsDir = path.join(STYLES_DIR, '6-components')

  const cssFiles = fs.readdirSync(componentsDir)
    .filter(f => f.endsWith('.css') && f !== 'index.css')
    .map(f => f.replace(/\.css$/, ''))

  const importedNames = []
  indexContent.split('\n').forEach(line => {
    const match = line.match(/@import\s+["']\.\/([^"']+)\.css["']/)
    if (match) importedNames.push(match[1])
  })

  cssFiles.forEach(name => {
    if (!importedNames.includes(name)) {
      error(rel(indexPath), null, `${name}.css가 존재하지만 index.css에 @import 누락.`)
    }
  })
}

// ─── 파일 수집 ────────────────────────────────────────

function collectFiles(dir, ext, excludes = []) {
  if (!fs.existsSync(dir)) return []
  const results = []
  function walk(current) {
    fs.readdirSync(current).forEach(name => {
      const full = path.join(current, name)
      const stat = fs.statSync(full)
      if (stat.isDirectory()) walk(full)
      else if (full.endsWith(ext) && !excludes.some(e => full.includes(e))) {
        results.push(full)
      }
    })
  }
  walk(dir)
  return results
}

// ─── 메인 ──────────────────────────────────────────────

function main() {
  console.log(`${CYAN}[check-violations]${RESET} info-design 컨트랙트 검사 시작...\n`)

  if (TARGET_FILES.length > 0) {
    for (const target of TARGET_FILES) {
      const abs = path.resolve(target)
      if (!fs.existsSync(abs)) {
        console.error(`파일을 찾을 수 없음: ${target}`)
        process.exit(1)
      }
      if (abs.endsWith('.css')) checkCssFile(abs)
      if (abs.endsWith('.html') || abs.endsWith('.njk') || abs.endsWith('.md')) checkHtmlFile(abs)
    }
  } else {
    const cssFiles = collectFiles(STYLES_DIR, '.css', ['node_modules'])
    cssFiles.forEach(checkCssFile)

    // SCSS 잔재
    checkScssRemnants()

    // HTML/NJK/스니펫 (Markdown 안 HTML 포함)
    const htmlFiles = [
      ...collectFiles(SNIPPETS_DIR, '.md'),
      ...collectFiles(SITE_DIR, '.html', ['_site', 'node_modules']),
      ...collectFiles(SITE_DIR, '.njk', ['_site', 'node_modules']),
      ...collectFiles(path.join(ROOT, 'src/playground'), '.html')
    ]
    htmlFiles.forEach(checkHtmlFile)

    checkComponentIndex()
  }

  console.log('')

  if (errorCount === 0 && warnCount === 0) {
    console.log(`${GREEN}✓ info-design 컨트랙트 위반 없음${RESET}`)
    process.exit(0)
  }

  if (errorCount > 0) {
    console.error(`${RED}오류 ${errorCount}개${RESET}${warnCount > 0 ? `, ${YELLOW}경고 ${warnCount}개${RESET}` : ''}`)
    process.exit(2)
  }

  console.warn(`${YELLOW}경고 ${warnCount}개${RESET} (오류 없음)`)
  // 경고는 CI/Git hook을 차단하지 않는다 (오류만 차단). 경고를 차단하려면 STRICT=1 환경변수.
  process.exit(process.env.STRICT === '1' ? 1 : 0)
}

main()
