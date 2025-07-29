import fs from 'fs'
import path from 'path'

interface Sitelink {
  title: string
  description: string
  url: string
  priority: number
  changefreq: string
}

interface PageData {
  url: string
  title: string
  description: string
  priority: number
  changefreq: string
  sitelinks?: Sitelink[]
  images?: string[]
}

const pages: PageData[] = [
  {
    url: '/',
    title: 'The Unity University | Academic Excellence',
    description: 'The Unity University offers world-class education with campuses in Liberia and Somaliland. Study Medicine, IT, Business, and more with globally recognized programs.',
    priority: 1.0,
    changefreq: 'daily',
    sitelinks: [
      {
        title: 'Apply Now',
        description: 'Become a student at The Unity University and take the first step towards your future.',
        url: '/admissions/apply',
        priority: 0.9,
        changefreq: 'weekly'
      },
      {
        title: 'About Us',
        description: 'The Unity University is committed to academic excellence and global education standards.',
        url: '/about',
        priority: 0.8,
        changefreq: 'monthly'
      },
      {
        title: 'Programs',
        description: 'Explore our undergraduate and graduate programs in Medicine, IT, Business, and more.',
        url: '/academics',
        priority: 0.9,
        changefreq: 'weekly'
      },
      {
        title: 'Contact Us',
        description: 'Get in touch with The Unity University for admissions, inquiries, and support.',
        url: '/about/contact',
        priority: 0.7,
        changefreq: 'monthly'
      },
      {
        title: 'Admissions',
        description: 'Learn about our admission requirements, application process, and deadlines.',
        url: '/admissions',
        priority: 0.9,
        changefreq: 'weekly'
      },
      {
        title: 'Student Life',
        description: 'Discover campus life, activities, and opportunities at The Unity University.',
        url: '/student-life',
        priority: 0.6,
        changefreq: 'monthly'
      }
    ],
    images: [
      '/hero-section/hero.png',
      '/leadership/plof.PLO-lumumba.jpg',
      '/graduation/graduation-day.jpg',
      '/campus/university-campus.jpg'
    ]
  },
  {
    url: '/about',
    title: 'About The Unity University',
    description: 'Learn about The Unity University\'s mission, vision, and commitment to academic excellence across our campuses in Liberia and Somaliland.',
    priority: 0.8,
    changefreq: 'monthly',
    sitelinks: [
      {
        title: 'Our History',
        description: 'Discover the rich history and founding principles of The Unity University.',
        url: '/about/history',
        priority: 0.7,
        changefreq: 'monthly'
      },
      {
        title: 'Leadership',
        description: 'Meet the distinguished leaders and faculty of The Unity University.',
        url: '/about/leadership',
        priority: 0.6,
        changefreq: 'monthly'
      },
      {
        title: 'Global Network',
        description: 'Explore our international partnerships and global educational network.',
        url: '/about/network',
        priority: 0.6,
        changefreq: 'monthly'
      },
      {
        title: 'Contact Information',
        description: 'Get in touch with The Unity University for any inquiries.',
        url: '/about/contact',
        priority: 0.8,
        changefreq: 'monthly'
      }
    ]
  },
  {
    url: '/academics',
    title: 'Academic Programs at The Unity University',
    description: 'Explore our comprehensive range of undergraduate and graduate programs in Medicine, Information Technology, Business Administration, and more.',
    priority: 0.9,
    changefreq: 'weekly',
    sitelinks: [
      {
        title: 'Undergraduate Programs',
        description: 'Discover our bachelor\'s degree programs designed for your future success.',
        url: '/academics/undergraduate',
        priority: 0.9,
        changefreq: 'weekly'
      },
      {
        title: 'Graduate Programs',
        description: 'Advance your career with our master\'s degree programs and specialized courses.',
        url: '/academics/graduate',
        priority: 0.9,
        changefreq: 'weekly'
      },
      {
        title: 'Academic Calendar',
        description: 'Stay updated with important academic dates, deadlines, and events.',
        url: '/academics/calendar',
        priority: 0.7,
        changefreq: 'monthly'
      }
    ]
  },
  {
    url: '/admissions',
    title: 'Admissions at The Unity University',
    description: 'Start your journey at The Unity University. Learn about admission requirements, application process, and deadlines for our programs.',
    priority: 0.9,
    changefreq: 'weekly',
    sitelinks: [
      {
        title: 'Apply Now',
        description: 'Submit your application to join The Unity University community.',
        url: '/admissions/apply',
        priority: 1.0,
        changefreq: 'weekly'
      },
      {
        title: 'International Students',
        description: 'Information for international students applying to The Unity University.',
        url: '/admissions/international',
        priority: 0.8,
        changefreq: 'monthly'
      },
      {
        title: 'Requirements',
        description: 'Learn about admission requirements and eligibility criteria.',
        url: '/admissions',
        priority: 0.9,
        changefreq: 'monthly'
      }
    ]
  },
  {
    url: '/liberia',
    title: 'The Unity University - Liberia Campus',
    description: 'Experience world-class education at The Unity University Liberia campus. Offering programs in Medicine, IT, Business, and more.',
    priority: 0.8,
    changefreq: 'weekly',
    sitelinks: [
      {
        title: 'Liberia Programs',
        description: 'Explore academic programs available at our Liberia campus.',
        url: '/liberia/academics',
        priority: 0.9,
        changefreq: 'weekly'
      },
      {
        title: 'About Liberia Campus',
        description: 'Learn about our Liberia campus facilities and community.',
        url: '/liberia/about',
        priority: 0.7,
        changefreq: 'monthly'
      },
      {
        title: 'Apply to Liberia',
        description: 'Apply for programs at The Unity University Liberia campus.',
        url: '/liberia/admissions/apply',
        priority: 0.9,
        changefreq: 'weekly'
      }
    ]
  },
  {
    url: '/somaliland',
    title: 'The Unity University - Somaliland Campus',
    description: 'Join The Unity University Somaliland campus for exceptional education in Medicine, Technology, and Business programs.',
    priority: 0.8,
    changefreq: 'weekly',
    sitelinks: [
      {
        title: 'Somaliland Programs',
        description: 'Discover academic programs offered at our Somaliland campus.',
        url: '/somaliland/academics',
        priority: 0.9,
        changefreq: 'weekly'
      },
      {
        title: 'About Somaliland Campus',
        description: 'Explore our Somaliland campus and its unique offerings.',
        url: '/somaliland/about',
        priority: 0.7,
        changefreq: 'monthly'
      },
      {
        title: 'Apply to Somaliland',
        description: 'Apply for programs at The Unity University Somaliland campus.',
        url: '/somaliland/admissions/apply',
        priority: 0.9,
        changefreq: 'weekly'
      }
    ]
  }
]

function generateEnhancedSitemap(): string {
  const baseUrl = 'https://tuu.university'
  const currentDate = new Date().toISOString()

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`

  pages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`

    // Add images if available
    if (page.images) {
      page.images.forEach(image => {
        sitemap += `
    <image:image>
      <image:loc>${baseUrl}${image}</image:loc>
      <image:title>${page.title}</image:title>
      <image:caption>${page.description}</image:caption>
    </image:image>`
      })
    }

    sitemap += `
  </url>`
  })

  sitemap += `
</urlset>`

  return sitemap
}

function generateSitelinksSitemap(): string {
  const baseUrl = 'https://tuu.university'
  const currentDate = new Date().toISOString()

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  pages.forEach(page => {
    if (page.sitelinks) {
      page.sitelinks.forEach(sitelink => {
        sitemap += `
  <url>
    <loc>${baseUrl}${sitelink.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${sitelink.changefreq}</changefreq>
    <priority>${sitelink.priority}</priority>
  </url>`
      })
    }
  })

  sitemap += `
</urlset>`

  return sitemap
}

// Generate the enhanced sitemap
const enhancedSitemap = generateEnhancedSitemap()
const sitelinksSitemap = generateSitelinksSitemap()

// Write to files
const publicDir = path.join(process.cwd(), 'public')
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), enhancedSitemap)
fs.writeFileSync(path.join(publicDir, 'sitelinks-sitemap.xml'), sitelinksSitemap)

console.log('✅ Enhanced sitemap generated successfully!')
console.log('📄 Files created:')
console.log('   - sitemap.xml (with images and rich data)')
console.log('   - sitelinks-sitemap.xml (for sitelinks)') 