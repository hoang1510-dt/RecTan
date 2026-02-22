import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const orvalCliPath = resolve('node_modules/orval/dist/bin/orval.mjs')

const result = spawnSync(process.execPath, [orvalCliPath, '--config', './orval.config.ts'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_TLS_REJECT_UNAUTHORIZED: '0',
  },
})

if (result.error) {
  throw result.error
}

if (typeof result.status === 'number' && result.status !== 0) {
  process.exit(result.status)
}
