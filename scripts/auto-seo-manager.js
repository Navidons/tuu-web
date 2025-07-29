#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')

class AutoSEOManager {
  constructor() {
    this.isWatching = false
    this.debounceTimer = null
  }

  // Run SEO optimization
  runSEOOptimization() {
    try {
      console.log('🔄 Running comprehensive SEO optimization...')
      execSync('pnpm run seo', { 
        stdio: 'inherit',
        cwd: process.cwd()
      })
      console.log('✅ SEO optimization completed successfully!')
      return true
    } catch (error) {
      console.error('❌ Error running SEO optimization:', error)
      return false
    }
  }

  // Watch for changes in public folder
  startWatching() {
    if (this.isWatching) {
      console.log('👀 Already watching for changes...')
      return
    }

    console.log('👀 Starting file watcher for public folder...')
    
    const watcher = chokidar.watch('public/**/*', {
      ignored: [
        'public/image-sitemap.xml',
        'public/image-manifest.json',
        'public/images-*.json',
        'public/**/*.json',
        'node_modules/**'
      ],
      persistent: true
    })

    watcher.on('change', (filePath) => {
      console.log(`📁 File changed: ${filePath}`)
      this.debounceOptimization()
    })

    watcher.on('add', (filePath) => {
      console.log(`📁 File added: ${filePath}`)
      this.debounceOptimization()
    })

    watcher.on('unlink', (filePath) => {
      console.log(`📁 File removed: ${filePath}`)
      this.debounceOptimization()
    })

    this.isWatching = true
    console.log('✅ File watcher started. Press Ctrl+C to stop.')
  }

  // Debounce optimization to avoid running too frequently
  debounceOptimization() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }
    
    this.debounceTimer = setTimeout(() => {
      console.log('🔄 Changes detected, running SEO optimization...')
      this.runSEOOptimization()
    }, 2000) // Wait 2 seconds after last change
  }

  // Setup Git hooks
  setupGitHooks() {
    try {
      console.log('🔧 Setting up Git hooks...')
      
      // Create .husky directory if it doesn't exist
      const huskyDir = path.join(process.cwd(), '.husky')
      if (!fs.existsSync(huskyDir)) {
        fs.mkdirSync(huskyDir, { recursive: true })
      }

      // Create pre-commit hook
      const preCommitHook = path.join(huskyDir, 'pre-commit')
      const hookContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run image SEO optimization before commit
node scripts/pre-commit-hook.js`

      fs.writeFileSync(preCommitHook, hookContent)
      fs.chmodSync(preCommitHook, '755')

      console.log('✅ Git hooks setup completed!')
      return true
    } catch (error) {
      console.error('❌ Error setting up Git hooks:', error)
      return false
    }
  }

  // Install dependencies
  installDependencies() {
    try {
      console.log('📦 Installing required dependencies...')
      execSync('pnpm add husky --save-dev', { 
        stdio: 'inherit',
        cwd: process.cwd()
      })
      
      console.log('🔧 Setting up Husky...')
      execSync('pnpm exec husky install', { 
        stdio: 'inherit',
        cwd: process.cwd()
      })
      
      console.log('✅ Dependencies installed successfully!')
      return true
    } catch (error) {
      console.error('❌ Error installing dependencies:', error)
      return false
    }
  }

  // Show help
  showHelp() {
    console.log(`
🎓 Auto SEO Manager for The Unity University

Usage:
  node scripts/auto-seo-manager.js [command]

Commands:
  run          - Run SEO optimization once
  watch        - Start watching for file changes
  setup        - Setup Git hooks and dependencies
  help         - Show this help message

Examples:
  node scripts/auto-seo-manager.js run
  node scripts/auto-seo-manager.js watch
  node scripts/auto-seo-manager.js setup
`)
  }
}

// Main execution
const manager = new AutoSEOManager()
const command = process.argv[2] || 'help'

switch (command) {
  case 'run':
    manager.runSEOOptimization()
    break
  case 'watch':
    manager.startWatching()
    break
  case 'setup':
    manager.installDependencies()
    manager.setupGitHooks()
    break
  case 'help':
  default:
    manager.showHelp()
    break
} 