#!/usr/bin/env node

import { execSync } from 'child_process'
import path from 'path'

console.log('🚀 Starting Image SEO Optimization for The Unity University...')

try {
  // Run the image SEO optimizer
  console.log('📸 Processing all images in public folder...')
  execSync('npx tsx scripts/image-seo-optimizer.ts', { 
    stdio: 'inherit',
    cwd: process.cwd()
  })

  console.log('✅ Image SEO optimization completed successfully!')
  console.log('')
  console.log('📁 Generated files:')
  console.log('  - public/image-sitemap.xml (Image sitemap for search engines)')
  console.log('  - public/image-manifest.json (Complete image manifest)')
  console.log('  - public/images-*.json (Category-specific image data)')
  console.log('')
  console.log('🔍 SEO Benefits:')
  console.log('  - All images now have proper alt text and titles')
  console.log('  - Structured data for better search engine understanding')
  console.log('  - Image sitemap for improved indexing')
  console.log('  - Category-based organization for better discoverability')
  console.log('')
  console.log('📝 Next Steps:')
  console.log('  1. Use the SEOOptimizedImage component in your React components')
  console.log('  2. Submit the image-sitemap.xml to Google Search Console')
  console.log('  3. Monitor image performance in Google Analytics')
  console.log('  4. Consider implementing lazy loading for better performance')

} catch (error) {
  console.error('❌ Error running image SEO optimization:', error)
  process.exit(1)
} 