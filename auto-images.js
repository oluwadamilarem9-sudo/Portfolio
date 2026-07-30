#!/usr/bin/env node
/**
 * auto-images.js
 *
 * Uses the Unsplash API to automatically download representative images
 * for key website sections and save them into /public/images.
 *
 * Usage:
 * 1. Add UNSPLASH_ACCESS_KEY to your .env file.
 * 2. Run: node auto-images.js
 */

import dotenv from 'dotenv'
import axios from 'axios'
import { createWriteStream, existsSync, mkdirSync, copyFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

if (!UNSPLASH_ACCESS_KEY) {
  console.error(
    '[auto-images] UNSPLASH_ACCESS_KEY is missing. Add it to your .env file before running this script.',
  )
  process.exit(1)
}

const IMAGES_DIR = join(__dirname, 'public', 'images')

const sections = [
  { key: 'hero', query: 'modern web app hero background', count: 5 },
  { key: 'services', query: 'saas services technology', count: 5 },
  { key: 'team', query: 'software engineering team office', count: 5 },
  { key: 'dashboard', query: 'analytics dashboard ui', count: 5 },
  { key: 'saas', query: 'SaaS web application', count: 5 },
  { key: 'technology', query: 'technology abstract gradient', count: 5 },
  { key: 'office', query: 'modern office workspace', count: 5 },
  { key: 'coding', query: 'developer coding on laptop', count: 5 },
]

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
    console.log('[auto-images] Created directory:', dir)
  }
}

async function searchUnsplash(query, page = 1) {
  const url = 'https://api.unsplash.com/search/photos'
  const res = await axios.get(url, {
    params: {
      query,
      per_page: 1,
      page,
      orientation: 'landscape',
    },
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  })

  const results = res.data?.results || []
  if (!results.length) {
    throw new Error(`No Unsplash results for query "${query}" (page ${page})`)
  }

  return results[0].urls?.regular || results[0].urls?.full || results[0].urls?.small
}

async function downloadImage(url, filePath) {
  console.log('[auto-images] Downloading', url, '→', filePath)
  const res = await axios.get(url, { responseType: 'stream' })

  await new Promise((resolve, reject) => {
    const writer = createWriteStream(filePath)
    res.data.pipe(writer)
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

async function processSection(section) {
  const { key, query, count } = section
  console.log(`\n[auto-images] Section "${key}" (${query})`)

  for (let i = 1; i <= count; i++) {
    const filename = `${key}-${i}.jpg`
    const filePath = join(IMAGES_DIR, filename)

    if (existsSync(filePath)) {
      console.log(`  - Skipping existing file: ${filename}`)
      continue
    }

    try {
      const imageUrl = await searchUnsplash(query, i)
      await downloadImage(imageUrl, filePath)
      console.log(`  ✓ Saved ${filename}`)
    } catch (err) {
      console.error(`  ✗ Failed to fetch image ${i} for "${key}":`, err.message)
    }
  }

  // Ensure a primary <key>.jpg alias pointing at the first image
  const primary = join(IMAGES_DIR, `${key}.jpg`)
  const first = join(IMAGES_DIR, `${key}-1.jpg`)
  if (!existsSync(primary) && existsSync(first)) {
    copyFileSync(first, primary)
    console.log(`  ✓ Created alias ${key}.jpg`)
  }
}

async function main() {
  console.log('[auto-images] Starting image download…')
  ensureDir(IMAGES_DIR)

  for (const section of sections) {
    // eslint-disable-next-line no-await-in-loop
    await processSection(section)
  }

  console.log('\n[auto-images] Done. You can now use files from /public/images in your UI.')
}

main().catch((err) => {
  console.error('[auto-images] Unexpected error:', err)
  process.exit(1)
})

