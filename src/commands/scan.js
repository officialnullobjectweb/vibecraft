import chalk from 'chalk'
import { scanProject, generateRegistry } from '../core/registry.js'
import { updateRegistryInAllFiles } from '../core/injector.js'

export async function scan() {
  console.log(chalk.bold.cyan('\n  \u{1F50D} Scanning project for components...\n'))

  const components = await scanProject()
  const registrySection = generateRegistry(components)

  await updateRegistryInAllFiles(registrySection)

  console.log(chalk.green(`  \u2713 Registry updated: ${components.length} components found\n`))

  if (components.length === 0) {
    console.log(chalk.dim('  No components found yet. Start building and run again.\n'))
    return
  }

  const grouped = components.reduce((acc, c) => {
    const cat = c.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(c)
    return acc
  }, {})

  for (const [category, comps] of Object.entries(grouped)) {
    console.log(chalk.dim(`  ${category}:\n`))
    for (const comp of comps) {
      console.log(chalk.dim(`    \u2192 ${comp.name}`) + chalk.dim(` (${comp.path})`))
    }
    console.log()
  }
}
