import React from 'react'
import Image from 'next/image'

interface SEOOptimizedImageProps {
  src: string
  alt: string
  title?: string
  description?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  category?: string
  structuredData?: any
}

export default function SEOOptimizedImage({
  src,
  alt,
  title,
  description,
  width,
  height,
  className,
  priority = false,
  loading = 'lazy',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  category,
  structuredData
}: SEOOptimizedImageProps) {
  // Generate structured data for the image
  const generateStructuredData = () => {
    if (structuredData) return structuredData

    return {
      "@type": "ImageObject",
      "name": title || alt,
      "description": description || alt,
      "contentUrl": src,
      "thumbnailUrl": src,
      "uploadDate": new Date().toISOString(),
      "creator": {
        "@type": "Organization",
        "name": "The Unity University"
      },
      "license": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
      "acquireLicensePage": "https://tuu.university/contact",
      "creditText": "The Unity University",
      "caption": alt
    }
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        className={className}
        priority={priority}
        loading={loading}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData())
        }}
      />
    </>
  )
}

// Helper function to generate SEO-friendly alt text
export function generateImageAltText(filename: string, category?: string): string {
  const name = filename
    .replace(/\.(jpg|jpeg|png|webp|gif)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim()

  if (category) {
    const categoryMap: { [key: string]: string } = {
      'hero-section': 'Hero Images',
      'ads': 'Advertisement Banners',
      'courses': 'Academic Programs',
      'leadership': 'Leadership Team',
      'graduation': 'Graduation Ceremonies',
      'student-life': 'Student Life',
      'research': 'Research Activities',
      'events': 'University Events',
      'labs': 'Laboratory Facilities',
      'alumni': 'Alumni',
      'community-outreaches': 'Community Outreach',
      'lecturers': 'Faculty',
      'sports': 'Sports Activities',
      'in-class': 'Classroom Activities',
      'strips': 'Promotional Strips',
      'side-show': 'Slideshow Images',
      'patternships': 'Partnerships'
    }

    const categoryName = categoryMap[category] || category
    return `${name} - ${categoryName} at The Unity University`
  }

  return `${name} - The Unity University`
}

// Helper function to generate SEO-friendly title
export function generateImageTitle(filename: string): string {
  const name = filename
    .replace(/\.(jpg|jpeg|png|webp|gif)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim()

  return `${name} | The Unity University`
}

// Helper function to generate SEO-friendly description
export function generateImageDescription(filename: string, category?: string): string {
  const name = filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '').replace(/[-_]/g, ' ')
  
  if (category) {
    const categoryMap: { [key: string]: string } = {
      'hero-section': 'Main hero section images for university website',
      'ads': 'Marketing and promotional banner images',
      'courses': 'Course and program-related images',
      'leadership': 'University leadership and faculty portraits',
      'graduation': 'Graduation ceremony and celebration images',
      'student-life': 'Student activities and campus life images',
      'research': 'Research and academic activities images',
      'events': 'Special events and celebrations',
      'labs': 'Laboratory and facility images',
      'alumni': 'Alumni and graduate images',
      'community-outreaches': 'Community service and outreach activities',
      'lecturers': 'Faculty and lecturer portraits',
      'sports': 'Sports and athletic activities',
      'in-class': 'Classroom and learning environment images',
      'strips': 'Promotional strip images',
      'side-show': 'Slideshow and presentation images',
      'patternships': 'University partnership and collaboration images'
    }

    const categoryDesc = categoryMap[category] || `${category} images`
    return `${categoryDesc} featuring ${name} at The Unity University.`
  }

  return `Image of ${name} at The Unity University.`
} 