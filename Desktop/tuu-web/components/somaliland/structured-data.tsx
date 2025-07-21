export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://tuu.university/somaliland/#organization",
    name: "The Unity University Somaliland",
    alternateName: ["The Unity University", "Jaamacadda The Unity University Somaliland"],
    url: "https://tuu.university/somaliland",
    logo: {
      "@type": "ImageObject",
      url: "https://tuu.university/somaliland/logo.png",
      width: 200,
      height: 200,
    },
    image: [
      "https://tuu.university/somaliland/campus-main.jpg",
      "https://tuu.university/somaliland/campus-aerial.jpg",
      "https://tuu.university/somaliland/students-graduation.jpg",
    ],
    description:
      "The Unity University Somaliland is the premier higher education institution in Hargeisa, offering world-class undergraduate, graduate, and professional programs in Business, IT, Engineering, Health Sciences, and Education.",
    foundingDate: "2009",
    founder: {
      "@type": "Person",
      name: "The Unity University Founders",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "New Generation Campus",
      addressLocality: "Hargeisa",
      addressRegion: "Woqooyi Galbeed",
      addressCountry: "Somaliland",
      postalCode: "00000",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.56,
      longitude: 44.065,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+252-63-4210013",
        contactType: "admissions",
        availableLanguage: ["English", "Somali"],
        areaServed: "Somaliland",
      },
      {
        "@type": "ContactPoint",
        email: "somaliland@tuu.university",
        contactType: "general inquiry",
        availableLanguage: ["English", "Somali"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/TheUnityUniversitySomaliland",
      "https://www.twitter.com/TheUnityUniSomaliland",
      "https://www.linkedin.com/school/the-unity-university-somaliland",
      "https://www.instagram.com/theunityuniversitysomaliland",
    ],
    department: [
      {
        "@type": "EducationalOrganization",
        name: "School of Business Administration",
        description: "Leading business education in Somaliland",
      },
      {
        "@type": "EducationalOrganization",
        name: "School of Information Technology",
        description: "Cutting-edge technology education and research",
      },
      {
        "@type": "EducationalOrganization",
        name: "School of Engineering",
        description: "Engineering excellence for infrastructure development",
      },
      {
        "@type": "EducationalOrganization",
        name: "School of Health Sciences",
        description: "Training healthcare professionals for community health",
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Accredited Higher Education Institution",
      credentialCategory: "University Accreditation",
    },
    numberOfStudents: 2800,
    faculty: 95,
    alumni: [
      {
        "@type": "Person",
        name: "Notable Alumni Network",
        description:
          "Graduates leading in business, government, and civil society across Somaliland and the Horn of Africa",
      },
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://tuu.university/somaliland/#website",
    url: "https://tuu.university/somaliland",
    name: "The Unity University Somaliland",
    description: "Official website of The Unity University Somaliland - Premier higher education institution in Hargeisa",
    publisher: {
      "@id": "https://tuu.university/somaliland/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://tuu.university/somaliland/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["en-US", "so-SO"],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://tuu.university/somaliland",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Academics",
        item: "https://tuu.university/somaliland/academics",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Admissions",
        item: "https://tuu.university/somaliland/admissions",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Research",
        item: "https://tuu.university/somaliland/research",
      },
    ],
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://tuu.university/somaliland/#localbusiness",
    name: "The Unity University Somaliland",
    image: "https://tuu.university/somaliland/campus-main.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "New Generation Campus",
      addressLocality: "Hargeisa",
      addressRegion: "Woqooyi Galbeed",
      addressCountry: "Somaliland",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.56,
      longitude: 44.065,
    },
    telephone: "+252-63-4210013",
    email: "somaliland@tuu.university",
    url: "https://tuu.university/somaliland",
    openingHours: ["Mo-Fr 08:00-17:00", "Sa 08:00-12:00"],
    priceRange: "$$",
    paymentAccepted: "Cash, Bank Transfer, Mobile Money",
    currenciesAccepted: "USD, SLS",
  }

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Business Administration Program",
    description: "Comprehensive 4-year undergraduate program in Business Administration at Unity University Somaliland",
    provider: {
      "@id": "https://tuu.university/somaliland/#organization",
    },
    educationalCredentialAwarded: "Bachelor of Business Administration",
    numberOfCredits: 120,
    timeRequired: "P4Y",
    courseMode: "full-time",
    availableLanguage: ["English", "Somali"],
    offers: {
      "@type": "Offer",
      price: "2500",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema),
        }}
      />
    </>
  )
}
