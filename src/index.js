import chalk from 'chalk'
import { init }  from './commands/init.js'
import { scan }  from './commands/scan.js'
import { watch } from './commands/watch.js'
import { add }   from './commands/add.js'

export async function run(command) {
  const commands = {
    init:  { fn: init,  desc: 'First-time setup — configure stack, theme, and motion' },
    scan:  { fn: scan,  desc: 'Scan project components and update registry' },
    watch: { fn: watch, desc: 'Watch for component changes and auto-update registry' },
    add:   { fn: add,   desc: 'Manually register a component in the registry' },
  }

  if (command && command !== 'init') {
    const cmd = commands[command]
    if (!cmd) {
      console.log(chalk.red(`\n  Unknown command: ${command}\n`))
      showHelp(commands)
      process.exit(1)
    }
    await cmd.fn()
    return
  }

  if (command === 'init') {
    await init()
    return
  }

  showHelp(commands)
}

function showHelp(commands) {
  console.log(chalk.bold.cyan('\n  ⚡ VibeCraft 2.0 — Living Design OS\n'))
  console.log(chalk.bold('  Usage:\n'))
  console.log(chalk.cyan('    npx vibecraft init') + chalk.dim('    # First-time setup'))
  console.log(chalk.cyan('    npx vibecraft scan') + chalk.dim('    # Scan for components'))
  console.log(chalk.cyan('    npx vibecraft watch') + chalk.dim('   # Auto-update registry'))
  console.log(chalk.cyan('    npx vibecraft add') + chalk.dim('     # Add component manually'))
  console.log()
}
