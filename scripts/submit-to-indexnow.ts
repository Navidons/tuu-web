import { IndexNowService } from '../lib/indexnow';

// Configuration
const DOMAIN = 'tuu.university';
const API_KEY = '88e3f866fd0c4ec9af63b5e8592f777a';

// All pages to submit (based on app folder structure)
const MAIN_PAGES = [
  // Main pages
  'https://tuu.university/',
  'https://tuu.university/about',
  'https://tuu.university/academics',
  'https://tuu.university/admissions',
  'https://tuu.university/student-life',
  
  // About section
  'https://tuu.university/about/leadership',
  'https://tuu.university/about/network',
  'https://tuu.university/about/history',
  'https://tuu.university/about/contact',
  
  // Academics section
  'https://tuu.university/academics/undergraduate',
  'https://tuu.university/academics/graduate',
  'https://tuu.university/academics/calendar',
  
  // Admissions section
  'https://tuu.university/admissions/apply',
  'https://tuu.university/admissions/international',
  
  // Liberia section
  'https://tuu.university/liberia',
  'https://tuu.university/liberia/about/leadership',
  'https://tuu.university/liberia/about/history',
  'https://tuu.university/liberia/about/contact',
  'https://tuu.university/liberia/academics',
  'https://tuu.university/liberia/academics/undergraduate',
  'https://tuu.university/liberia/academics/graduate',
  
  // Somaliland section
  'https://tuu.university/somaliland',
  'https://tuu.university/somaliland/about/history',
  'https://tuu.university/somaliland/about/leadership',
  'https://tuu.university/somaliland/about/contact',
  'https://tuu.university/somaliland/academics',
  'https://tuu.university/somaliland/academics/undergraduate',
  'https://tuu.university/somaliland/academics/graduate',
  'https://tuu.university/somaliland/admissions/apply',
  'https://tuu.university/somaliland/admissions/international',
];

// Helper function to validate URL
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return url.startsWith('https://tuu.university/');
  } catch {
    return false;
  }
}

// Helper function to display help
function showHelp() {
  console.log(`
🚀 IndexNow URL Submission Tool for TUU University

Usage:
  pnpm indexnow                    # Submit all main pages
  pnpm indexnow --help            # Show this help
  pnpm indexnow --single <url>    # Submit a single URL
  pnpm indexnow --custom <urls>   # Submit custom URLs (comma-separated)
  pnpm indexnow --test            # Test the connection

Examples:
  pnpm indexnow --single https://tuu.university/new-page
  pnpm indexnow --custom "https://tuu.university/page1,https://tuu.university/page2"

Configuration:
  Domain: ${DOMAIN}
  API Key: ${API_KEY}
  Key Location: https://${DOMAIN}/40a3b80eaf2842f2b9ca2e2d4a941404.txt
`);
}

// Test connection function
async function testConnection() {
  const indexNow = new IndexNowService(DOMAIN);
  
  console.log('🔍 Testing IndexNow connection...');
  console.log(`Domain: ${DOMAIN}`);
  console.log(`API Key: ${API_KEY}`);
  console.log(`Key Location: https://${DOMAIN}/40a3b80eaf2842f2b9ca2e2d4a941404.txt`);
  
  try {
    // Test with a single URL
    const result = await indexNow.submitUrl('https://tuu.university/');
    
    console.log(`\n📊 Test Results:`);
    console.log(`Status: ${result.status}`);
    console.log(`Message: ${result.message}`);
    
          if (result.status === 200 || result.status === 202) {
        console.log('✅ Connection test successful!');
      } else if (result.status === 403) {
        console.log('⚠️  Key validation failed. Check your key file is accessible.');
      } else if (result.status === 422) {
        console.log('⚠️  URL validation failed. Check your domain configuration.');
      } else {
        console.log('❌ Connection test failed.');
      }
  } catch (error) {
    console.error('❌ Network error during test:', error);
  }
}

// Submit main pages
async function submitMainPages() {
  const indexNow = new IndexNowService(DOMAIN);
  
  console.log('🚀 Submitting main pages to IndexNow...');
  console.log(`Total pages: ${MAIN_PAGES.length}`);
  
  try {
    const result = await indexNow.submitUrls(MAIN_PAGES);
    
    console.log(`\n📊 Submission Results:`);
    console.log(`Status: ${result.status}`);
    console.log(`Message: ${result.message}`);
    
    if (result.status === 200 || result.status === 202) {
      console.log('✅ All main pages submitted successfully!');
      console.log('\n📋 Submitted URLs:');
      MAIN_PAGES.forEach((url, index) => {
        console.log(`  ${index + 1}. ${url}`);
      });
    } else {
      console.log('❌ Failed to submit URLs');
      console.log('💡 Check the error message above for troubleshooting.');
    }
  } catch (error) {
    console.error('❌ Error submitting URLs:', error);
  }
}

// Submit a single URL
async function submitSingleUrl(url: string) {
  if (!isValidUrl(url)) {
    console.error('❌ Invalid URL. URL must be from tuu.university domain.');
    process.exit(1);
  }

  const indexNow = new IndexNowService(DOMAIN);
  
  console.log(`🚀 Submitting single URL to IndexNow...`);
  console.log(`URL: ${url}`);
  
  try {
    const result = await indexNow.submitUrl(url);
    
    console.log(`\n📊 Submission Results:`);
    console.log(`Status: ${result.status}`);
    console.log(`Message: ${result.message}`);
    
    if (result.status === 200 || result.status === 202) {
      console.log('✅ URL submitted successfully!');
    } else {
      console.log('❌ Failed to submit URL');
    }
  } catch (error) {
    console.error('❌ Error submitting URL:', error);
  }
}

// Submit custom URLs
async function submitCustomUrls(urls: string[]) {
  // Validate all URLs
  const invalidUrls = urls.filter(url => !isValidUrl(url));
  if (invalidUrls.length > 0) {
    console.error('❌ Invalid URLs found:');
    invalidUrls.forEach(url => console.error(`  - ${url}`));
    console.error('All URLs must be from tuu.university domain.');
    process.exit(1);
  }

  const indexNow = new IndexNowService(DOMAIN);
  
  console.log(`🚀 Submitting ${urls.length} custom URLs to IndexNow...`);
  
  try {
    const result = await indexNow.submitUrls(urls);
    
    console.log(`\n📊 Submission Results:`);
    console.log(`Status: ${result.status}`);
    console.log(`Message: ${result.message}`);
    
    if (result.status === 200 || result.status === 202) {
      console.log('✅ All URLs submitted successfully!');
      console.log('\n📋 Submitted URLs:');
      urls.forEach((url, index) => {
        console.log(`  ${index + 1}. ${url}`);
      });
    } else {
      console.log('❌ Failed to submit URLs');
    }
  } catch (error) {
    console.error('❌ Error submitting URLs:', error);
  }
}

// Main CLI function
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // No arguments - submit main pages
    await submitMainPages();
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case '--help':
    case '-h':
      showHelp();
      break;
      
    case '--test':
      await testConnection();
      break;
      
    case '--single':
      if (args.length < 2) {
        console.error('❌ Please provide a URL after --single');
        console.log('Example: pnpm indexnow --single https://tuu.university/new-page');
        process.exit(1);
      }
      await submitSingleUrl(args[1]);
      break;
      
    case '--custom':
      if (args.length < 2) {
        console.error('❌ Please provide URLs after --custom');
        console.log('Example: pnpm indexnow --custom "url1,url2,url3"');
        process.exit(1);
      }
      const urls = args[1].split(',').map(url => url.trim());
      await submitCustomUrls(urls);
      break;
      
    default:
      console.error(`❌ Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });
}

export { 
  submitMainPages, 
  submitSingleUrl, 
  submitCustomUrls, 
  testConnection,
  MAIN_PAGES 
}; 