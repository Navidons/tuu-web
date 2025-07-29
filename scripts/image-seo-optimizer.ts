import fs from 'fs'
import path from 'path'

interface ImageSEO {
  filename: string
  altText: string
  title: string
  description: string
  category: string
  structuredData: any
}

const imageCategories = {
  'hero-section': {
    prefix: 'hero',
    category: 'Hero Images',
    description: 'Main hero section images for university website'
  },
  'ads': {
    prefix: 'ad',
    category: 'Advertisement Banners',
    description: 'Marketing and promotional banner images'
  },
  'courses': {
    prefix: 'course',
    category: 'Academic Programs',
    description: 'Course and program-related images'
  },
  'leadership': {
    prefix: 'leadership',
    category: 'Leadership Team',
    description: 'University leadership and faculty portraits'
  },
  'graduation': {
    prefix: 'graduation',
    category: 'Graduation Ceremonies',
    description: 'Graduation ceremony and celebration images'
  },
  'student-life': {
    prefix: 'student',
    category: 'Student Life',
    description: 'Student activities and campus life images'
  },
  'research': {
    prefix: 'research',
    category: 'Research Activities',
    description: 'Research and academic activities images'
  },
  'events': {
    prefix: 'event',
    category: 'University Events',
    description: 'Special events and celebrations'
  },
  'labs': {
    prefix: 'lab',
    category: 'Laboratory Facilities',
    description: 'Laboratory and facility images'
  },
  'alumni': {
    prefix: 'alumni',
    category: 'Alumni',
    description: 'Alumni and graduate images'
  },
  'community-outreaches': {
    prefix: 'community',
    category: 'Community Outreach',
    description: 'Community service and outreach activities'
  },
  'lecturers': {
    prefix: 'lecturer',
    category: 'Faculty',
    description: 'Faculty and lecturer portraits'
  },
  'sports': {
    prefix: 'sport',
    category: 'Sports Activities',
    description: 'Sports and athletic activities'
  },
  'in-class': {
    prefix: 'class',
    category: 'Classroom Activities',
    description: 'Classroom and learning environment images'
  },
  'strips': {
    prefix: 'strip',
    category: 'Promotional Strips',
    description: 'Promotional strip images'
  },
  'side-show': {
    prefix: 'slideshow',
    category: 'Slideshow Images',
    description: 'Slideshow and presentation images'
  },
  'patternships': {
    prefix: 'partnership',
    category: 'Partnerships',
    description: 'University partnership and collaboration images'
  }
}

function generateAltText(filename: string, category: string): string {
  const name = filename
    .replace(/\.(jpg|jpeg|png|webp|gif)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim()

  const categoryInfo = imageCategories[category as keyof typeof imageCategories]
  
  if (categoryInfo) {
    return `${name} - ${categoryInfo.category} at The Unity University`
  }
  
  return `${name} - The Unity University`
}

function generateTitle(filename: string, category: string): string {
  const name = filename
    .replace(/\.(jpg|jpeg|png|webp|gif)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim()

  return `${name} | The Unity University`
}

function generateDescription(filename: string, category: string): string {
  const categoryInfo = imageCategories[category as keyof typeof imageCategories]
  
  if (categoryInfo) {
    return `${categoryInfo.description} featuring ${filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '').replace(/[-_]/g, ' ')} at The Unity University.`
  }
  
  return `Image of ${filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '').replace(/[-_]/g, ' ')} at The Unity University.`
}

function generateStructuredData(filename: string, category: string, filepath: string): any {
  const categoryInfo = imageCategories[category as keyof typeof imageCategories]
  
  return {
    "@type": "ImageObject",
    "name": generateTitle(filename, category),
    "description": generateDescription(filename, category),
    "contentUrl": `https://tuu.university${filepath}`,
    "thumbnailUrl": `https://tuu.university${filepath}`,
    "uploadDate": new Date().toISOString(),
    "creator": {
      "@type": "Organization",
      "name": "The Unity University"
    },
    "license": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    "acquireLicensePage": "https://tuu.university/contact",
    "creditText": "The Unity University",
    "caption": generateAltText(filename, category)
  }
}

function processDirectory(dirPath: string, basePath: string = ''): ImageSEO[] {
  const results: ImageSEO[] = []
  
  try {
    const items = fs.readdirSync(dirPath)
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item)
      const relativePath = path.join(basePath, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        const subResults = processDirectory(fullPath, relativePath)
        results.push(...subResults)
      } else if (stat.isFile()) {
        // Check if it's an image file
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']
        const ext = path.extname(item).toLowerCase()
        
        if (imageExtensions.includes(ext)) {
          const category = basePath.split(path.sep)[0] || 'general'
          const filepath = `/${relativePath.replace(/\\/g, '/')}`
          
          const seoData: ImageSEO = {
            filename: item,
            altText: generateAltText(item, category),
            title: generateTitle(item, category),
            description: generateDescription(item, category),
            category: category,
            structuredData: generateStructuredData(item, category, filepath)
          }
          
          results.push(seoData)
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error)
  }
  
  return results
}

function generateImageSitemap(seoData: ImageSEO[]): string {
  const baseUrl = 'https://tuu.university'
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
  sitemap += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
  
  for (const image of seoData) {
    sitemap += '  <url>\n'
    sitemap += `    <loc>${baseUrl}/images</loc>\n`
    sitemap += '    <image:image>\n'
    sitemap += `      <image:loc>${baseUrl}${image.structuredData.contentUrl}</image:loc>\n`
    sitemap += `      <image:title>${image.title}</image:title>\n`
    sitemap += `      <image:caption>${image.altText}</image:caption>\n`
    sitemap += '    </image:image>\n'
    sitemap += '  </url>\n'
  }
  
  sitemap += '</urlset>'
  
  return sitemap
}

function generateImageManifest(seoData: ImageSEO[]): any {
  return {
    version: "1.0",
    generated: new Date().toISOString(),
    totalImages: seoData.length,
    categories: Object.keys(imageCategories),
    images: seoData.map(img => ({
      filename: img.filename,
      altText: img.altText,
      title: img.title,
      category: img.category,
      url: img.structuredData.contentUrl
    }))
  }
}

// Main execution
const publicDir = path.join(process.cwd(), 'public')
console.log('Starting image SEO optimization...')

const allImageSEO = processDirectory(publicDir)

console.log(`Processed ${allImageSEO.length} images`)

// Generate sitemap
const imageSitemap = generateImageSitemap(allImageSEO)
fs.writeFileSync(path.join(publicDir, 'image-sitemap.xml'), imageSitemap)

// Generate manifest
const imageManifest = generateImageManifest(allImageSEO)
fs.writeFileSync(path.join(publicDir, 'image-manifest.json'), JSON.stringify(imageManifest, null, 2))

// Generate individual category files
const categories = [...new Set(allImageSEO.map(img => img.category))]
for (const category of categories) {
  const categoryImages = allImageSEO.filter(img => img.category === category)
  const categoryData = {
    category,
    count: categoryImages.length,
    images: categoryImages
  }
  
  const safeCategoryName = category.toLowerCase().replace(/\s+/g, '-')
  fs.writeFileSync(
    path.join(publicDir, `images-${safeCategoryName}.json`),
    JSON.stringify(categoryData, null, 2)
  )
}

console.log('Image SEO optimization completed!')
console.log(`Generated files:
- image-sitemap.xml
- image-manifest.json
- ${categories.length} category-specific JSON files`)

export { allImageSEO, generateAltText, generateTitle, generateDescription } 