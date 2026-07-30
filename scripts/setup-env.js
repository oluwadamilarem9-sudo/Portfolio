#!/usr/bin/env node
/**
 * Ensures .env exists from .env.example if missing.
 * Run automatically before dev/build.
 */
import { existsSync, copyFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const envPath = join(root, '.env')
const examplePath = join(root, '.env.example')

if (!existsSync(envPath) && existsSync(examplePath)) {
  copyFileSync(examplePath, envPath)
  console.log('[setup] Created .env from .env.example')
}
