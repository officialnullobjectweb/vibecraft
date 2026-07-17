import enquirer from 'enquirer'
import chalk from 'chalk'
import { selectStack } from '../core/selector.js'
import { generateStaticRules } from '../core/static-rules.js'
import { generateUXRules } from '../core/ux-rules.js'
import { generateRegistry } from '../core/registry.js'
import { writeAllAgentFiles } from '../core/injector.js'

const { Select } = enquirer

export async function init() {
  console.log(chalk.bold.cyan('\n  ⚡ VibeCraft 2.0 — Project Setup\n'))
  console.log(chalk.dim('  3 questions to define your design system.\n'))

  const { projectType } = await new Select({
    name: 'projectType',
    message: 'What are you building?',
    choices: [
      { name: 'Landing Page / Marketing', value: 'Landing Page / Marketing' },
      { name: 'SaaS Dashboard / App', value: 'SaaS Dashboard / App' },
      { name: 'Portfolio / Creative', value: 'Portfolio / Creative' },
      { name: 'E-commerce', value: 'E-commerce' },
      { name: 'AI Product', value: 'AI Product' },
      { name: 'Developer Tool', value: 'Developer Tool' },
    ],
  }).run()

  const { vibe } = await new Select({
    name: 'vibe',
    message: 'What should it feel like?',
    choices: [
      { name: 'Clean & Minimal', value: 'Clean & Minimal' },
      { name: 'Bold & Energetic', value: 'Bold & Energetic' },
      { name: 'Dark & Futuristic', value: 'Dark & Futuristic' },
      { name: 'Elegant & Premium', value: 'Elegant & Premium' },
      { name: 'Playful & Fun', value: 'Playful & Fun' },
      { name: 'Brutalist & Raw', value: 'Brutalist & Raw' },
    ],
  }).run()

  const { motion } = await new Select({
    name: 'motion',
    message: 'How much animation?',
    choices: [
      { name: 'None — Static', value: 'None — Static' },
      { name: 'Subtle — Micro only', value: 'Subtle — Micro only' },
      { name: 'Moderate — Transitions', value: 'Moderate — Transitions' },
      { name: 'Cinematic — Full', value: 'Cinematic — Full' },
    ],
  }).run()

  const stack = selectStack({ projectType, vibe, motion })
  const staticRules = generateStaticRules(stack)
  const uxRules     = generateUXRules()
  const registry    = generateRegistry()

  const rulebook = [staticRules, uxRules, registry].join('\n\n')

  console.log(chalk.dim('\n  Writing to all agent files...\n'))
  await writeAllAgentFiles(rulebook)

  console.log(chalk.green('\n  \u2713 VibeCraft initialized\n'))
  console.log(chalk.dim('  Recommended libraries to install:\n'))

  for (const install of stack.stack.installs) {
    console.log(chalk.cyan(`    ${install}`))
  }

  console.log(chalk.dim('\n  Then run:'))
  console.log(chalk.cyan('    npx vibecraft scan') + chalk.dim('  to detect existing components'))
  console.log(chalk.cyan('    npx vibecraft watch') + chalk.dim(' to auto-update registry as you build'))
  console.log()
}
