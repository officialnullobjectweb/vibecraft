import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import { init }  from './commands/init.js'
import { scan }  from './commands/scan.js'
import { watch } from './commands/watch.js'
import { add }   from './commands/add.js'

export async function run(command) {
  if (command === '--version' || command === '-v') {
    const dir = path.dirname(fileURLToPath(import.meta.url))
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, '..', 'package.json'), 'utf8'))
    console.log(`v${pkg.version}`)
    return
  }

  const commands = {
    init:  { fn: init,  desc: 'First-time setup - configure stack, theme, and motion' },
    scan:  { fn: scan,  desc: 'Scan project components and update registry' },
    watch: { fn: watch, desc: 'Watch for component changes and auto-update registry' },
    add:   { fn: add,   desc: 'Manually register a component in the registry' },
  }

  if (command) {
    const cmd = commands[command]
    if (!cmd) {
      console.log(chalk.red(`\n  Unknown command: ${command}\n`))
      showHelp(commands)
      process.exit(1)
    }
    await cmd.fn()
    return
  }

  showHelp(commands)
}

function showHelp(commands) {
  console.log(chalk.bold.cyan('\n  \u26A1 VibeCraft 2.0 \u2014 Living Design OS\n'))
  console.log(chalk.bold('  Usage:\n'))
  for (const [name, cmd] of Object.entries(commands)) {
    console.log(`    vibecraft ${name.padEnd(8)} ${chalk.dim(cmd.desc)}`)
  }
  console.log(`    vibecraft --version ${chalk.dim('  Show version')}`)
  console.log()
}
