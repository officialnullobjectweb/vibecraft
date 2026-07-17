import chokidar from 'chokidar'
import chalk from 'chalk'
import { scan } from './scan.js'

let scanning = false

export async function watch() {
  console.log(chalk.bold.cyan('\n  \u{1F6A8} Watching for component changes...\n'))
  console.log(chalk.dim('  Registry auto-updates when you add/modify components\n'))
  console.log(chalk.dim('  Press Ctrl+C to stop\n'))

  await scan()

  const watcher = chokidar.watch(
    [
      'src/components/**/*.{tsx,jsx}',
      'components/**/*.{tsx,jsx}',
      'app/components/**/*.{tsx,jsx}',
    ],
    {
      ignoreInitial: true,
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 300,
        pollInterval: 100,
      },
    }
  )

  const handleChange = async (eventType, filepath) => {
    if (scanning) return
    scanning = true
    console.log(chalk.dim(`  \u{1F504} ${eventType}: ${filepath}`))
    await scan()
    scanning = false
  }

  watcher
    .on('add',    (p) => handleChange('add', p))
    .on('change', (p) => handleChange('change', p))
    .on('unlink', (p) => handleChange('remove', p))
}
