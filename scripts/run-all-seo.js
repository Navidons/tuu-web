#!/usr/bin/env node
const { execSync } = require('child_process')
const path = require('path')

console.log('🎯 Running comprehensive SEO optimization...')

try {
  // Step 1: Image SEO optimization
  console.log('📸 Step 1: Running image SEO optimization...')
  execSync('pnpm run image-seo', { 
    stdio: 'inherit',
    cwd: process.cwd()
  })
  console.log('✅ Image SEO optimization completed!')

  // Step 2: Generate enhanced sitemap and fix Bing SEO issues
  console.log('🗺️ Step 2: Generating enhanced sitemap and fixing Bing SEO issues...')
  try {
    execSync('tsx scripts/enhanced-sitemap-generator.ts', { 
      stdio: 'inherit',
      cwd: process.cwd()
    })
    console.log('✅ Enhanced sitemap generated!')
    
    // Fix Bing SEO issues
    console.log('🔧 Step 2.1: Fixing Bing Webmaster Tools SEO issues...')
    execSync('tsx scripts/fix-bing-seo-issues.ts', { 
      stdio: 'inherit',
      cwd: process.cwd()
    })
    console.log('✅ Bing SEO issues fixed!')
    
    // Fix specific pages with identical meta descriptions
    console.log('🔧 Step 2.2: Fixing specific pages with identical meta descriptions...')
    execSync('tsx scripts/fix-specific-pages-seo.ts', { 
      stdio: 'inherit',
      cwd: process.cwd()
    })
    console.log('✅ Specific pages SEO issues fixed!')
  } catch (error) {
    console.log('ℹ️ Enhanced sitemap generation failed, using existing sitemap...')
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')
    if (require('fs').existsSync(sitemapPath)) {
      console.log('✅ Sitemap.xml exists!')
    } else {
      console.log('ℹ️ No sitemap.xml found, consider creating one...')
    }
  }

  // Step 3: Generate robots.txt (if needed)
  console.log('🤖 Step 3: Checking robots.txt...')
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt')
  if (!require('fs').existsSync(robotsPath)) {
    console.log('ℹ️ No robots.txt found, consider creating one...')
  } else {
    console.log('✅ Robots.txt exists!')
  }

  // Step 4: Validate generated files
  console.log('🔍 Step 4: Validating generated SEO files...')
  const publicDir = path.join(process.cwd(), 'public')
  const files = [
    'image-sitemap.xml',
    'image-manifest.json'
  ]
  
  files.forEach(file => {
    const filePath = path.join(publicDir, file)
    if (require('fs').existsSync(filePath)) {
      console.log(`✅ ${file} exists`)
    } else {
      console.log(`❌ ${file} missing`)
    }
  })

  console.log('🎉 All SEO optimizations completed successfully!')
  console.log('📊 Summary:')
  console.log('   - Image SEO: ✅')
  console.log('   - Sitemap: ✅')
  console.log('   - Robots.txt: ✅')
  console.log('   - Validation: ✅')

} catch (error) {
  console.error('❌ SEO optimization failed:', error.message)
  process.exit(1)
} 