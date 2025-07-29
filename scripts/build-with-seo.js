#!/usr/bin/env node
const { execSync } = require('child_process')
const path = require('path')

console.log('🚀 Starting build process with SEO optimization...')

try {
  // Step 1: Run comprehensive SEO optimization
  console.log('📸 Running comprehensive SEO optimization...')
  execSync('pnpm run seo', { 
    stdio: 'inherit',
    cwd: process.cwd()
  })
  console.log('✅ SEO optimization completed!')

  // Step 2: Run Next.js build
  console.log('🏗️ Starting Next.js build...')
  execSync('next build', { 
    stdio: 'inherit',
    cwd: process.cwd()
  })
  console.log('✅ Build completed successfully!')

} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
} 