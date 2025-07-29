import React from 'react'
import Head from 'next/head'

interface RichSearchResultsProps {
  title?: string
  description?: string
  url?: string
  logo?: string
  images?: string[]
  sitelinks?: Array<{
    title: string
    description: string
    url: string
  }>
  actions?: Array<{
    title: string
    url: string
  }>
  organization?: {
    name: string
    type: string
    address: string
    phone: string
    email: string
    logo: string
  }
}

export default function RichSearchResults({
  title = "The Unity University | Academic Excellence",
  description = "The Unity University offers world-class education with campuses in Liberia and Somaliland. Study Medicine, IT, Business, and more with globally recognized programs.",
  url = "https://tuu.university",
  logo = "/tuu-logo/tuu-logo.png",
  images = [
    "/hero-section/hero.png",
    "/leadership/plof.PLO-lumumba.jpg",
    "/graduation/graduation-day.jpg",
    "/campus/university-campus.jpg"
  ],
  sitelinks = [
    {
      title: "Apply Now",
      description: "Become a student at The Unity University and take the first step towards your future.",
      url: "/admissions/apply"
    },
    {
      title: "About Us",
      description: "The Unity University is committed to academic excellence and global education standards.",
      url: "/about"
    },
    {
      title: "Programs",
      description: "Explore our undergraduate and graduate programs in Medicine, IT, Business, and more.",
      url: "/academics"
    },
    {
      title: "Contact Us",
      description: "Get in touch with The Unity University for admissions, inquiries, and support.",
      url: "/about/contact"
    },
    {
      title: "Admissions",
      description: "Learn about our admission requirements, application process, and deadlines.",
      url: "/admissions"
    },

  ],
  actions = [
    { title: "Apply Now", url: "/admissions/apply" },
    { title: "Programs", url: "/academics" },
    { title: "Contact Us", url: "/about/contact" },
    { title: "About TUU", url: "/about" }
  ],
  organization = {
    name: "The Unity University",
    type: "EducationalOrganization",
    address: "Multiple Campuses in Liberia and Somaliland",
    phone: "+252 634 210013",
    email: "info@tuu.university",
    logo: "/tuu-logo/tuu-logo.png"
  }
}: RichSearchResultsProps) {
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${url}#organization`,
          "name": organization.name,
          "url": url,
          "logo": {
            "@type": "ImageObject",
            "url": `${url}${organization.logo}`,
            "width": 512,
            "height": 512
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": organization.phone,
            "contactType": "customer service",
            "email": organization.email
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Multiple Locations",
            "addressCountry": "Liberia, Somaliland"
          },
          "sameAs": [
            "https://facebook.com/theunityuniversity",
            "https://twitter.com/tuu_university",
            "https://linkedin.com/company/the-unity-university"
          ]
        },
        {
          "@type": "WebSite",
          "@id": `${url}#website`,
          "url": url,
          "name": title,
          "description": description,
          "publisher": {
            "@id": `${url}#organization`
          },
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${url}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          ]
        },
        {
          "@type": "CollegeOrUniversity",
          "@id": `${url}#university`,
          "name": organization.name,
          "url": url,
          "logo": {
            "@type": "ImageObject",
            "url": `${url}${organization.logo}`
          },
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Multiple Locations",
            "addressCountry": "Liberia, Somaliland"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": organization.phone,
            "contactType": "admissions",
            "email": organization.email
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Academic Programs",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Course",
                  "name": "Bachelor of Medicine",
                  "description": "Medical degree program"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Course",
                  "name": "Bachelor of Information Technology",
                  "description": "IT degree program"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Course",
                  "name": "Master of Business Administration",
                  "description": "MBA program"
                }
              }
            ]
          },
          "image": images.map(img => ({
            "@type": "ImageObject",
            "url": `${url}${img}`,
            "width": 1200,
            "height": 630
          }))
        }
      ]
    }

    return structuredData
  }

  return (
    <Head>
      {/* Enhanced Meta Tags for Rich Search Results */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="university, education, Liberia, Somaliland, medicine, IT, business, admissions" />
      
      {/* Open Graph Tags for Rich Social Media Previews */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${url}${logo}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="The Unity University" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${logo}`} />
      
      {/* Additional Meta Tags for Rich Results */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data for Rich Search Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData())
        }}
      />
      
      {/* Additional Structured Data for Sitelinks */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "The Unity University",
            "url": url,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${url}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            },
            "sameAs": [
              `${url}/about`,
              `${url}/academics`,
              `${url}/admissions`,
              `${url}/about/contact`
            ]
          })
        }}
      />
    </Head>
  )
} 