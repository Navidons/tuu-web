const { execSync } = require('child_process')
const path = require('path')

class ImageSEOPlugin {
  constructor(options = {}) {
    this.options = {
      runOnBuild: true,
      runOnDev: false,
      ...options
    }
  }

  apply(compiler) {
    // Run on build
    if (this.options.runOnBuild) {
      compiler.hooks.beforeCompile.tap('ImageSEOPlugin', () => {
        try {
          console.log('🔄 Running image SEO optimization...')
          execSync('npm run image-seo', { 
            stdio: 'inherit',
            cwd: process.cwd()
          })
          console.log('✅ Image SEO optimization completed!')
        } catch (error) {
          console.warn('⚠️ Image SEO optimization failed, continuing with build...')
          console.error(error)
        }
      })
    }

    // Run on dev mode if enabled
    if (this.options.runOnDev) {
      compiler.hooks.watchRun.tap('ImageSEOPlugin', () => {
        try {
          console.log('🔄 Running image SEO optimization in dev mode...')
          execSync('npm run image-seo', { 
            stdio: 'inherit',
            cwd: process.cwd()
          })
          console.log('✅ Image SEO optimization completed!')
        } catch (error) {
          console.warn('⚠️ Image SEO optimization failed in dev mode...')
          console.error(error)
        }
      })
    }
  }
}

module.exports = ImageSEOPlugin 