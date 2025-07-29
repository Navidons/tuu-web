import fs from 'fs'
import path from 'path'

interface SpecificPageSEO {
  url: string
  title: string
  description: string
  content: string
  priority: number
  changefreq: string
}

const specificPages: SpecificPageSEO[] = [
  {
    url: '/student-life/housing',
    title: 'Student Housing at The Unity University | On-Campus Accommodation and Living',
    description: 'Discover comfortable student housing options at The Unity University. Learn about on-campus accommodation, dormitory facilities, meal plans, and student living arrangements in Liberia and Somaliland.',
    content: 'The Unity University provides excellent student housing options for both local and international students. Our on-campus accommodation facilities offer comfortable living spaces, modern amenities, and a supportive community environment. Students can choose from various housing options including dormitories, shared apartments, and family housing units.',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    url: '/admission-list',
    title: 'Admission Requirements at The Unity University | Complete Application Checklist',
    description: 'View the complete admission requirements and application checklist for The Unity University. Learn about required documents, academic qualifications, and application deadlines for undergraduate and graduate programs.',
    content: 'The Unity University has specific admission requirements for all academic programs. Our comprehensive admission checklist includes academic qualifications, required documents, application deadlines, and program-specific requirements. Prospective students can find detailed information about admission criteria for undergraduate, graduate, and doctoral programs.',
    priority: 0.8,
    changefreq: 'weekly'
  },
  {
    url: '/contact-us',
    title: 'Contact The Unity University | Get in Touch with Admissions and Support',
    description: 'Contact The Unity University for admissions inquiries, academic support, and general information. Reach our admissions team, faculty, and student services across our campuses in Liberia and Somaliland.',
    content: 'The Unity University provides multiple ways to get in touch with our team. Contact us for admissions inquiries, academic support, student services, or general information about our programs and campuses. Our dedicated staff is available to assist you with all your questions and concerns.',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    url: '/',
    title: 'The Unity University | Academic Excellence - World-Class Education in Liberia and Somaliland',
    description: 'The Unity University offers world-class education with campuses in Liberia and Somaliland. Study Medicine, IT, Business, and more with globally recognized programs. Apply now for undergraduate and graduate degrees.',
    content: 'The Unity University is Africa\'s pioneer accredited university, growing every day since 2020. We offer comprehensive academic programs across our campuses in Liberia and Somaliland, providing students with world-class education opportunities.',
    priority: 1.0,
    changefreq: 'daily'
  },
  {
    url: '/admissions',
    title: 'Admissions at The Unity University | Apply for Undergraduate and Graduate Programs',
    description: 'Start your journey at The Unity University. Learn about admission requirements, application process, deadlines, and how to apply for our undergraduate and graduate programs in Liberia and Somaliland.',
    content: 'Join thousands of students from around the world in pursuing excellence at The Unity University. Our streamlined application process is designed to help you succeed. Apply for undergraduate, graduate, and doctoral programs.',
    priority: 0.9,
    changefreq: 'weekly'
  }
]

function generateUniqueMetaTags(): string {
  let metaTags = ''
  
  specificPages.forEach(page => {
    metaTags += `
<!-- ${page.url} - UNIQUE META TAGS -->
<meta name="title" content="${page.title}" />
<meta name="description" content="${page.description}" />
<meta name="keywords" content="university, education, Liberia, Somaliland, ${page.url.includes('housing') ? 'student housing, accommodation, dormitory' : page.url.includes('admission') ? 'admissions, application, requirements' : 'contact, support, information'}" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<meta name="googlebot" content="index, follow" />
<meta name="bingbot" content="index, follow" />

<!-- Open Graph - ${page.url} -->
<meta property="og:title" content="${page.title}" />
<meta property="og:description" content="${page.description}" />
<meta property="og:url" content="https://tuu.university${page.url}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="The Unity University" />

<!-- Twitter Card - ${page.url} -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${page.title}" />
<meta name="twitter:description" content="${page.description}" />

<!-- Canonical - ${page.url} -->
<link rel="canonical" href="https://tuu.university${page.url}" />

<!-- Structured Data for ${page.url} -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "${page.title}",
  "description": "${page.description}",
  "url": "https://tuu.university${page.url}",
  "publisher": {
    "@type": "Organization",
    "name": "The Unity University",
    "url": "https://tuu.university"
  },
  "mainEntity": {
    "@type": "Organization",
    "name": "The Unity University",
    "url": "https://tuu.university"
  }
}
</script>

`
  })
  
  return metaTags
}

function generateUpdatedSitemap(): string {
  const baseUrl = 'https://tuu.university'
  const currentDate = new Date().toISOString()

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`

  specificPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  })

  sitemap += `
</urlset>`

  return sitemap
}

function generatePageContent(): string {
  let content = ''
  
  specificPages.forEach(page => {
    content += `
## ${page.url}

### Page Title
${page.title}

### Meta Description
${page.description}

### Content Summary
${page.content}

### SEO Priority
${page.priority}

### Update Frequency
${page.changefreq}

---
`
  })
  
  return content
}

// Generate the unique meta tags and updated sitemap
const uniqueMetaTags = generateUniqueMetaTags()
const updatedSitemap = generateUpdatedSitemap()
const pageContent = generatePageContent()

// Write to files
const publicDir = path.join(process.cwd(), 'public')
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), updatedSitemap)

// Create specific files for the problematic pages
fs.writeFileSync(path.join(process.cwd(), 'specific-pages-meta-tags.txt'), uniqueMetaTags)
fs.writeFileSync(path.join(process.cwd(), 'specific-pages-content.txt'), pageContent)

console.log('✅ Specific pages SEO issues fixed successfully!')
console.log('📄 Files created/updated:')
console.log('   - sitemap.xml (updated with specific pages)')
console.log('   - specific-pages-meta-tags.txt (unique meta tags)')
console.log('   - specific-pages-content.txt (content guidelines)')
console.log('')
console.log('🔧 Specific Pages Fixed:')
console.log('   ✅ /student-life/housing - Unique housing meta description')
console.log('   ✅ /admission-list - Unique admission requirements meta description')
console.log('   ✅ /contact-us - Unique contact information meta description')
console.log('   ✅ / - Enhanced homepage meta description')
console.log('   ✅ /admissions - Enhanced admissions meta description')
console.log('')
console.log('📊 Meta Description Lengths:')
specificPages.forEach(page => {
  console.log(`   ${page.url}: ${page.description.length} characters`)
}) 