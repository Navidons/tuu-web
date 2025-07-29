# Image SEO Optimization for The Unity University

This system provides comprehensive SEO optimization for all images in the public folder of The Unity University website.

## 🚀 Quick Start

Run the image SEO optimization:

```bash
pnpm run optimize-images
```

Or run the optimizer directly:

```bash
pnpm run image-seo
```

## 📁 Generated Files

After running the optimization, the following files will be created in the `public` folder:

- **`image-sitemap.xml`** - Image sitemap for search engines
- **`image-manifest.json`** - Complete manifest of all images with SEO data
- **`images-*.json`** - Category-specific image data files

## 🎯 SEO Benefits

### 1. **Alt Text Optimization**
- Automatically generates descriptive alt text for all images
- Includes category context (e.g., "Graduation Ceremony - Graduation Ceremonies at The Unity University")
- Improves accessibility and search engine understanding

### 2. **Structured Data**
- Generates JSON-LD structured data for each image
- Includes creator information, licensing, and metadata
- Helps search engines understand image context and ownership

### 3. **Image Sitemap**
- Creates a dedicated image sitemap for search engines
- Improves image indexing and discovery
- Can be submitted to Google Search Console

### 4. **Category Organization**
- Organizes images by category (Hero, Courses, Leadership, etc.)
- Provides context for better SEO performance
- Enables targeted image optimization

## 🛠️ Usage in React Components

### Using the SEOOptimizedImage Component

```tsx
import SEOOptimizedImage from '@/components/seo-optimized-image'

// Basic usage
<SEOOptimizedImage
  src="/hero-section/graduation-day.jpg"
  alt="Graduation Day - Graduation Ceremonies at The Unity University"
  width={800}
  height={600}
  priority={true}
/>

// With category and structured data
<SEOOptimizedImage
  src="/courses/bachelors/bachelor-of-accounting.webp"
  alt="Bachelor of Accounting - Academic Programs at The Unity University"
  category="courses"
  width={400}
  height={300}
/>
```

### Using Helper Functions

```tsx
import { generateImageAltText, generateImageTitle, generateImageDescription } from '@/components/seo-optimized-image'

const filename = "graduation-day.jpg"
const category = "graduation"

const altText = generateImageAltText(filename, category)
const title = generateImageTitle(filename)
const description = generateImageDescription(filename, category)
```

## 📊 Image Categories

The system recognizes and optimizes images in the following categories:

| Category | Description | Example Path |
|----------|-------------|--------------|
| `hero-section` | Main hero section images | `/hero-section/` |
| `ads` | Advertisement banners | `/ads/` |
| `courses` | Academic program images | `/courses/` |
| `leadership` | Leadership team portraits | `/leadership/` |
| `graduation` | Graduation ceremonies | `/graduation/` |

| `research` | Research activities | `/research/` |
| `events` | University events | `/events/` |
| `labs` | Laboratory facilities | `/labs/` |
| `alumni` | Alumni images | `/alumni/` |
| `community-outreaches` | Community service | `/community-outreaches/` |
| `lecturers` | Faculty portraits | `/lecturers/` |
| `sports` | Sports activities | `/sports/` |
| `in-class` | Classroom activities | `/in-class/` |
| `strips` | Promotional strips | `/strips/` |
| `side-show` | Slideshow images | `/side-show/` |
| `patternships` | Partnership images | `/patternships/` |

## 🔍 SEO Features

### 1. **Automatic Alt Text Generation**
- Converts filenames to readable descriptions
- Adds category context
- Includes university branding

### 2. **Structured Data**
- JSON-LD format for search engines
- Includes creator, license, and metadata
- Improves rich snippet opportunities

### 3. **Image Sitemap**
- XML format for search engines
- Includes image titles and captions
- Improves indexing efficiency

### 4. **Performance Optimization**
- Lazy loading support
- Priority loading for hero images
- Responsive sizing
- Quality optimization

## 📈 Monitoring and Analytics

### Google Search Console
1. Submit `image-sitemap.xml` to Google Search Console
2. Monitor image indexing performance
3. Track image search impressions and clicks

### Google Analytics
1. Monitor image engagement metrics
2. Track image download events
3. Analyze user interaction with images

## 🔧 Customization

### Adding New Categories
Edit `scripts/image-seo-optimizer.ts` and add new categories to the `imageCategories` object:

```typescript
const imageCategories = {
  'new-category': {
    prefix: 'new',
    category: 'New Category',
    description: 'Description of new category images'
  }
}
```

### Custom Alt Text Generation
Modify the `generateAltText` function to customize alt text generation logic.

### Structured Data Customization
Update the `generateStructuredData` function to include additional metadata.

## 🚀 Best Practices

1. **Run optimization regularly** when adding new images
2. **Use the SEOOptimizedImage component** for all images
3. **Submit sitemap** to search engines after updates
4. **Monitor performance** in Google Search Console
5. **Optimize image file sizes** for better loading speed
6. **Use descriptive filenames** for better SEO

## 📞 Support

For questions or issues with image SEO optimization, contact the development team or refer to the generated documentation in the `public` folder. 