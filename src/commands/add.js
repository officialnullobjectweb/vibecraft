import enquirer from 'enquirer'
import chalk from 'chalk'
import { scanProject, generateRegistry } from '../core/registry.js'
import { updateRegistryInAllFiles } from '../core/injector.js'

const { Input } = enquirer

export async function add() {
  console.log(chalk.bold.cyan('\n  \u2795 Manually add a component to the registry\n'))

  const { name } = await new Input({
    name: 'name',
    message: 'Component name (e.g., ProductCard):',
    validate: (v) => v.trim().length > 0,
  }).run()

  const { path } = await new Input({
    name: 'path',
    message: 'Import path (e.g., @/components/ProductCard):',
    validate: (v) => v.trim().length > 0,
  }).run()

  const { exports } = await new Input({
    name: 'exports',
    message: 'Exports (comma-separated, e.g., ProductCard, ProductCardSkeleton):',
    initial: name,
  }).run()

  const { category } = await new Input({
    name: 'category',
    message: 'Category (e.g., Base UI, Page Sections, Forms):',
    initial: 'Components',
  }).run()

  const { props } = await new Input({
    name: 'props',
    message: 'Props description (optional):',
  }).run()

  const exportList = exports.split(',').map(e => e.trim())

  const components = await scanProject()

  components.push({
    name,
    exports: exportList,
    path,
    props: props || 'see file',
    variants: 'default',
    uses: null,
    category,
  })

  const registrySection = generateRegistry(components)
  await updateRegistryInAllFiles(registrySection)

  console.log(chalk.green(`\n  \u2713 ${name} registered\n`))
}
