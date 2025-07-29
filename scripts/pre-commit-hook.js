#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🔍 Checking for image changes in public folder...')

try {
  // Check if there are any changes in the public folder
  const publicDir = path.join(process.cwd(), 'public')
  
  if (fs.existsSync(publicDir)) {
    // Run comprehensive SEO optimization
    console.log('🔄 Running comprehensive SEO optimization before commit...')
    execSync('pnpm run seo', { 
      stdio: 'inherit',
      cwd: process.cwd()
    })
    
    // Add the generated SEO files to the commit
    const generatedFiles = [
      'public/image-sitemap.xml',
      'public/image-manifest.json'
    ]
    
    // Add category-specific files
    const categoryFiles = fs.readdirSync(publicDir)
      .filter(file => file.startsWith('images-') && file.endsWith('.json'))
      .map(file => `public/${file}`)
    
    const allFiles = [...generatedFiles, ...categoryFiles]
    
    for (const file of allFiles) {
      if (fs.existsSync(file)) {
        try {
          execSync(`git add "${file}"`, { 
            stdio: 'inherit',
            cwd: process.cwd()
          })
          console.log(`✅ Added ${file} to commit`)
        } catch (error) {
          console.warn(`⚠️ Could not add ${file} to commit:`, error.message)
        }
      }
    }
    
    console.log('✅ Image SEO optimization completed and files added to commit!')
  } else {
    console.log('ℹ️ No public folder found, skipping image SEO optimization')
  }
} catch (error) {
  console.error('❌ Error in pre-commit hook:', error)
  process.exit(1)
} 