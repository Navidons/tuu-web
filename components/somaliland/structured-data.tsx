export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://unity.edu.so/#organization",
    name: "Unity University Somaliland",
    alternateName: ["Unity University", "Jaamacadda Unity Somaliland"],
    url: "https://unity.edu.so",
    logo: {
      "@type": "ImageObject",
      url: "https://unity.edu.so/logo.png",
      width: 200,
      height: 200,
    },
    image: [
      "https://unity.edu.so/campus-main.jpg",
      "https://unity.edu.so/campus-aerial.jpg",
      "https://unity.edu.so/students-graduation.jpg",
    ],
    description:
      "Unity University Somaliland is the premier higher education institution in Hargeisa, offering world-class undergraduate, graduate, and professional programs in Business, IT, Engineering, Health Sciences, and Education.",
    foundingDate: "2009",
    founder: {
      "@type": "Person",
      name: "Unity University Founders",
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
      "https://www.facebook.com/UnityUniversitySomaliland",
      "https://www.twitter.com/UnityUniSomaliland",
      "https://www.linkedin.com/school/unity-university-somaliland",
      "https://www.instagram.com/unityuniversitysomaliland",
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
    "@id": "https://unity.edu.so/#website",
    url: "https://unity.edu.so",
    name: "Unity University Somaliland",
    description: "Official website of Unity University Somaliland - Premier higher education institution in Hargeisa",
    publisher: {
      "@id": "https://unity.edu.so/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://unity.edu.so/search?q={search_term_string}",
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
        item: "https://unity.edu.so",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Academics",
        item: "https://unity.edu.so/academics",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Admissions",
        item: "https://unity.edu.so/admissions",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Research",
        item: "https://unity.edu.so/research",
      },
    ],
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://unity.edu.so/#localbusiness",
    name: "Unity University Somaliland",
    image: "https://unity.edu.so/campus-main.jpg",
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
    url: "https://unity.edu.so",
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
      "@id": "https://unity.edu.so/#organization",
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
