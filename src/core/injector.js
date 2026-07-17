import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

const AGENT_FILES = {
  '.cursorrules':                     (r) => r,
  '.windsurfrules':                   (r) => r,
  'CLAUDE.md':                        (r) => r,
  '.github/copilot-instructions.md':  (r) => r,
  'AGENTS.md':                        (r) => r,
  '.clinerules':                      (r) => r,
}

export async function writeAllAgentFiles(rulebook) {
  const cwd = process.cwd()
  for (const [file, transform] of Object.entries(AGENT_FILES)) {
    const filepath = path.join(cwd, file)
    await fs.ensureFile(filepath)
    await fs.writeFile(filepath, transform(rulebook), 'utf8')
    console.log(chalk.dim(`  \u2713 ${file}`))
  }
}

export async function updateRegistryInAllFiles(registrySection) {
  const cwd = process.cwd()
  const PART_6_MARKER = '# PART 6: COMPONENT REGISTRY'
  const END_MARKER    = '# END VIBECRAFT'

  for (const [file] of Object.entries(AGENT_FILES)) {
    const filepath = path.join(cwd, file)
    if (!await fs.pathExists(filepath)) continue

    let content = await fs.readFile(filepath, 'utf8')

    const startIdx = content.indexOf(PART_6_MARKER)
    const endIdx   = content.indexOf(END_MARKER)

    if (startIdx !== -1 && endIdx !== -1) {
      const before = content.slice(0, startIdx)
      const after  = content.slice(endIdx + END_MARKER.length)
      content = before + registrySection.trimEnd() + '\n' + END_MARKER + after
    }

    await fs.writeFile(filepath, content, 'utf8')
  }
}
