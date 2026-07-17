import fs from 'fs-extra'
import { glob } from 'glob'

const REGISTRY_START = '# ════════════════════════════════════════════\n# PART 6: COMPONENT REGISTRY'
const REGISTRY_END   = '# ════════════════════════════════════════════\n# END VIBECRAFT'

export function generateRegistry(components = []) {
  const header = `${REGISTRY_START}
# Auto-updated by: npx vibecraft scan
# AI: READ THIS BEFORE BUILDING ANYTHING
${REGISTRY_END}

## HOW TO USE THIS
Before building any component:
1. Search this list for the component you need
2. If found → import from listed path. DO NOT rebuild.
3. If not found → build it, then add to this list.

## CRITICAL RULE
If a component exists in this registry and you build
a new version instead of importing the existing one,
you have introduced a bug. Treat duplication as a bug.

`

  if (components.length === 0) {
    return header + `## REGISTRY IS EMPTY
No components registered yet.
Run: npx vibecraft scan
Or: npx vibecraft watch (auto-updates as you build)
`
  }

  const grouped = components.reduce((acc, comp) => {
    const cat = comp.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(comp)
    return acc
  }, {})

  let output = header

  for (const [category, comps] of Object.entries(grouped)) {
    output += `\n## ${category}\n`
    for (const comp of comps) {
      output += `- **${comp.name}**\n`
      output += `  Import: \`import { ${comp.exports.join(', ')} } from "${comp.path}"\`\n`
      output += `  Props: ${comp.props}\n`
      output += `  Variants: ${comp.variants || 'default'}\n`
      if (comp.uses) output += `  Uses: ${comp.uses}\n`
      output += '\n'
    }
  }

  return output
}

export async function scanProject(cwd = process.cwd()) {
  const patterns = [
    'src/components/**/*.{tsx,jsx}',
    'components/**/*.{tsx,jsx}',
    'app/components/**/*.{tsx,jsx}',
  ]

  const files = await glob(patterns, { cwd, absolute: true })
  const components = []

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    const comp = extractComponentInfo(content, file, cwd)
    if (comp) components.push(comp)
  }

  return components
}

function extractComponentInfo(content, filepath, cwd) {
  const exportMatches = content.match(/export\s+(?:function|const|class)\s+(\w+)/g) || []
  const exportDefault = content.match(/export\s+default\s+(?:function|const|class)\s+(\w+)/)
  const exports = exportMatches.map(m => m.split(/\s+/).pop())

  if (exports.length === 0 && !exportDefault) return null
  if (exportDefault) exports.unshift(exportDefault[1])

  const propsMatch = content.match(/interface\s+\w*Props[^{]*{([^}]*)}/s)
  const props = propsMatch
    ? propsMatch[1].trim().split('\n').map(p => p.trim()).filter(Boolean).join(', ')
    : 'see file'

  const uses = []
  if (content.includes('from "motion"') || content.includes("from 'motion'")) uses.push('motion.dev')
  if (content.includes('from "gsap"') || content.includes("from 'gsap'")) uses.push('gsap')
  if (content.includes('@radix-ui')) uses.push('radix-ui')
  if (content.includes('shadcn')) uses.push('shadcn')

  const relativePath = filepath.replace(cwd, '').replace('/src/', '@/').replace('.tsx', '').replace('.jsx', '')

  return {
    name: exports[0],
    exports,
    path: relativePath,
    props: props.slice(0, 100) + (props.length > 100 ? '...' : ''),
    variants: 'default',
    uses: uses.join(', ') || null,
    category: detectCategory(filepath, content),
  }
}

function detectCategory(filepath, content) {
  const path = filepath.toLowerCase()
  if (path.includes('/ui/'))       return 'Base UI'
  if (path.includes('/sections/')) return 'Page Sections'
  if (path.includes('/layouts/'))  return 'Layouts'
  if (path.includes('/effects/'))  return 'Visual Effects'
  if (path.includes('/forms/'))    return 'Forms'
  if (path.includes('/charts/'))   return 'Data & Charts'
  if (path.includes('/nav'))       return 'Navigation'

  if (content.includes('form') || content.includes('input')) return 'Forms'
  if (content.includes('chart') || content.includes('graph')) return 'Data & Charts'
  if (content.includes('nav') || content.includes('menu'))    return 'Navigation'
  if (content.includes('hero') || content.includes('section')) return 'Page Sections'

  return 'Components'
}
