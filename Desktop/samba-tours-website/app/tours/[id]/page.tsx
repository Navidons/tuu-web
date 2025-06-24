import { Suspense } from "react"
import { notFound } from "next/navigation"
import TourHero from "@/components/tours/tour-hero"
import TourDetails from "@/components/tours/tour-details"
import TourItinerary from "@/components/tours/tour-itinerary"
import TourInclusions from "@/components/tours/tour-inclusions"
import TourGallery from "@/components/tours/tour-gallery"
import TourReviews from "@/components/tours/tour-reviews"
import TourBooking from "@/components/tours/tour-booking"
import RelatedTours from "@/components/tours/related-tours"
import LoadingSpinner from "@/components/ui/loading-spinner"

// Complete tours database
const getTour = async (id: string) => {
  const tours = {
    "1": {
      id: 1,
      title: "Gorilla Trekking Adventure",
      description:
        "Experience the thrill of meeting mountain gorillas in their natural habitat in Bwindi Impenetrable Forest. This once-in-a-lifetime adventure takes you deep into Uganda's pristine rainforest for an unforgettable encounter with these magnificent creatures.",
      image: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      duration: "3 Days",
      groupSize: "8 People",
      rating: 4.9,
      reviewCount: 127,
      price: 1200,
      originalPrice: 1400,
      location: "Bwindi Forest",
      category: "Gorilla Trekking",
      difficulty: "Moderate",
      highlights: ["Mountain Gorillas", "Forest Hiking", "Local Communities", "Conservation Experience"],
      itinerary: [
        {
          day: 1,
          title: "Arrival and Transfer to Bwindi",
          description:
            "Pick up from Kampala/Entebbe and scenic drive to Bwindi Impenetrable National Park. Stop at the Equator for photos and lunch in Mbarara. Evening arrival and briefing about gorilla trekking.",
          activities: ["Airport pickup", "Equator crossing", "Scenic drive", "Evening briefing"],
          accommodation: "Bwindi Lodge",
          meals: ["Lunch", "Dinner"],
        },
        {
          day: 2,
          title: "Gorilla Trekking Experience",
          description:
            "Early morning briefing at park headquarters followed by the gorilla trekking adventure. Spend one magical hour with a gorilla family in their natural habitat. Afternoon community visit to Batwa people.",
          activities: ["Gorilla trekking", "Photography", "Community visit", "Cultural experience"],
          accommodation: "Bwindi Lodge",
          meals: ["Breakfast", "Packed lunch", "Dinner"],
        },
        {
          day: 3,
          title: "Return to Kampala",
          description:
            "Morning nature walk around the lodge or optional second gorilla trek (additional cost). Depart for Kampala with lunch en route. Evening arrival in Kampala.",
          activities: ["Nature walk", "Return journey", "Shopping stop"],
          accommodation: "End of tour",
          meals: ["Breakfast", "Lunch"],
        },
      ],
      inclusions: {
        included: [
          "Gorilla trekking permits",
          "Professional guide",
          "Transportation in 4WD vehicle",
          "Accommodation (2 nights)",
          "All meals as specified",
          "Bottled water",
          "Park entrance fees",
          "Community visit",
        ],
        excluded: [
          "International flights",
          "Visa fees",
          "Travel insurance",
          "Personal expenses",
          "Tips and gratuities",
          "Alcoholic beverages",
          "Optional activities",
          "Second gorilla trek",
        ],
      },
      bestTime: "Year-round, but dry seasons (June-August, December-February) offer easier trekking conditions",
      physicalRequirements:
        "Moderate fitness level required. Trekking can involve 1-8 hours of hiking through dense forest terrain.",
      whatToBring: [
        "Waterproof hiking boots",
        "Long-sleeved shirts and pants",
        "Rain jacket",
        "Gardening gloves",
        "Camera with extra batteries",
        "Insect repellent",
        "Personal medications",
      ],
    },
    "2": {
      id: 2,
      title: "Murchison Falls Safari",
      description:
        "Witness the power of the Nile at Murchison Falls and spot the Big Five on thrilling game drives. This comprehensive safari experience combines wildlife viewing, boat cruises, and the spectacular Murchison Falls.",
      image: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      duration: "4 Days",
      groupSize: "12 People",
      rating: 4.8,
      reviewCount: 89,
      price: 800,
      originalPrice: 950,
      location: "Murchison Falls NP",
      category: "Wildlife Safari",
      difficulty: "Easy",
      highlights: ["Big Five", "Nile River", "Boat Safari", "Murchison Falls"],
      itinerary: [
        {
          day: 1,
          title: "Transfer to Murchison Falls",
          description:
            "Depart Kampala for Murchison Falls National Park. Stop at Ziwa Rhino Sanctuary for rhino tracking. Continue to the park with lunch en route. Evening game drive.",
          activities: ["Rhino tracking", "Game drive", "Park entry"],
          accommodation: "Paraa Safari Lodge",
          meals: ["Lunch", "Dinner"],
        },
        {
          day: 2,
          title: "Game Drive and Boat Safari",
          description:
            "Early morning game drive in the northern sector. Afternoon boat cruise to the base of Murchison Falls. Spot hippos, crocodiles, and various bird species along the Nile.",
          activities: ["Morning game drive", "Boat cruise", "Wildlife viewing", "Photography"],
          accommodation: "Paraa Safari Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 3,
          title: "Top of the Falls and Game Drive",
          description:
            "Visit the top of Murchison Falls for spectacular views. Afternoon game drive in different sectors of the park. Evening relaxation at the lodge.",
          activities: ["Falls viewing", "Game drive", "Bird watching"],
          accommodation: "Paraa Safari Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 4,
          title: "Return to Kampala",
          description:
            "Morning game drive en route to park exit. Stop for lunch and shopping in Masindi town. Arrive in Kampala in the evening.",
          activities: ["Final game drive", "Shopping", "Return journey"],
          accommodation: "End of tour",
          meals: ["Breakfast", "Lunch"],
        },
      ],
      inclusions: {
        included: [
          "Park entrance fees",
          "Game drives",
          "Boat cruise",
          "Professional guide",
          "Transportation",
          "Accommodation (3 nights)",
          "All meals as specified",
          "Rhino tracking",
        ],
        excluded: [
          "International flights",
          "Visa fees",
          "Travel insurance",
          "Personal expenses",
          "Tips and gratuities",
          "Alcoholic beverages",
          "Optional activities",
        ],
      },
      bestTime: "Dry seasons (December-February, June-September) for best wildlife viewing",
      physicalRequirements: "Easy - suitable for all fitness levels. Minimal walking required.",
      whatToBring: [
        "Comfortable safari clothing",
        "Sun hat and sunglasses",
        "Sunscreen",
        "Camera with zoom lens",
        "Binoculars",
        "Insect repellent",
        "Personal medications",
      ],
    },
    "3": {
      id: 3,
      title: "Queen Elizabeth Wildlife Tour",
      description:
        "Explore diverse ecosystems and spot tree-climbing lions in Uganda's most popular national park. This comprehensive tour showcases the incredible biodiversity of Queen Elizabeth National Park.",
      image: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      duration: "5 Days",
      groupSize: "10 People",
      rating: 4.7,
      reviewCount: 156,
      price: 950,
      originalPrice: 1100,
      location: "Queen Elizabeth NP",
      category: "Wildlife Safari",
      difficulty: "Easy",
      highlights: ["Tree-climbing Lions", "Kazinga Channel", "Crater Lakes", "Chimpanzee Tracking"],
      itinerary: [
        {
          day: 1,
          title: "Kampala to Queen Elizabeth",
          description:
            "Depart Kampala for Queen Elizabeth National Park. Stop at the Equator for photos and experiments. Lunch in Mbarara town. Afternoon arrival and evening game drive.",
          activities: ["Equator visit", "Scenic drive", "Evening game drive"],
          accommodation: "Mweya Safari Lodge",
          meals: ["Lunch", "Dinner"],
        },
        {
          day: 2,
          title: "Game Drive and Kazinga Channel",
          description:
            "Early morning game drive in Kasenyi sector searching for lions, elephants, and antelopes. Afternoon boat cruise on Kazinga Channel - excellent for hippos, crocodiles, and birds.",
          activities: ["Morning game drive", "Boat cruise", "Wildlife photography"],
          accommodation: "Mweya Safari Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 3,
          title: "Ishasha Sector - Tree Climbing Lions",
          description:
            "Transfer to Ishasha sector famous for tree-climbing lions. Game drives searching for these unique lions resting in fig trees. Explore the southern part of the park.",
          activities: ["Tree-climbing lions", "Game drives", "Photography"],
          accommodation: "Ishasha Wilderness Camp",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 4,
          title: "Kyambura Gorge Chimpanzee Tracking",
          description:
            "Morning chimpanzee tracking in Kyambura Gorge, known as the 'Valley of Apes'. Afternoon crater lakes tour with stunning scenery and bird watching opportunities.",
          activities: ["Chimpanzee tracking", "Crater lakes tour", "Bird watching"],
          accommodation: "Mweya Safari Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 5,
          title: "Return to Kampala",
          description:
            "Morning game drive en route to park exit. Stop for lunch and visit local craft markets. Arrive in Kampala in the evening with drop-off at your hotel or airport.",
          activities: ["Final game drive", "Craft shopping", "Return journey"],
          accommodation: "End of tour",
          meals: ["Breakfast", "Lunch"],
        },
      ],
      inclusions: {
        included: [
          "Park entrance fees",
          "Game drives",
          "Boat cruise on Kazinga Channel",
          "Chimpanzee tracking permit",
          "Professional guide",
          "Transportation in 4WD vehicle",
          "Accommodation (4 nights)",
          "All meals as specified",
          "Crater lakes tour",
        ],
        excluded: [
          "International flights",
          "Visa fees",
          "Travel insurance",
          "Personal expenses",
          "Tips and gratuities",
          "Alcoholic beverages",
          "Optional activities",
          "Souvenirs",
        ],
      },
      bestTime: "Year-round destination, but dry seasons offer better road conditions and wildlife viewing",
      physicalRequirements:
        "Easy to moderate. Chimpanzee tracking involves some hiking but is generally accessible to most fitness levels.",
      whatToBring: [
        "Comfortable safari clothing",
        "Sturdy walking shoes",
        "Sun protection",
        "Camera with telephoto lens",
        "Binoculars",
        "Insect repellent",
        "Rain jacket",
        "Personal medications",
      ],
    },
    "4": {
      id: 4,
      title: "Cultural Heritage Experience",
      description:
        "Immerse yourself in Uganda's rich cultural traditions with visits to local communities and cultural sites. Experience authentic Ugandan culture through dance, crafts, and community interactions.",
      image: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      duration: "6 Days",
      groupSize: "15 People",
      rating: 4.6,
      reviewCount: 73,
      price: 650,
      originalPrice: 750,
      location: "Multiple Regions",
      category: "Cultural Tours",
      difficulty: "Easy",
      highlights: ["Traditional Dances", "Local Crafts", "Community Visits", "Cultural Sites"],
      itinerary: [
        {
          day: 1,
          title: "Kampala Cultural Tour",
          description:
            "Explore Kampala's cultural sites including Kasubi Tombs (UNESCO World Heritage Site), Namugongo Martyrs Shrine, and local markets. Evening traditional dinner with cultural performances.",
          activities: ["Kasubi Tombs", "Namugongo Shrine", "Market visit", "Cultural dinner"],
          accommodation: "Kampala Hotel",
          meals: ["Lunch", "Dinner"],
        },
        {
          day: 2,
          title: "Buganda Kingdom Heritage",
          description:
            "Visit the Kabaka's Palace and Parliament. Learn about Buganda kingdom history and traditions. Afternoon visit to traditional craft makers and participate in pottery making.",
          activities: ["Palace visit", "Kingdom history", "Craft making", "Pottery workshop"],
          accommodation: "Kampala Hotel",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 3,
          title: "Transfer to Fort Portal",
          description:
            "Journey to Fort Portal with stops at tea plantations. Visit Tooro Kingdom palace and learn about the youngest king in the world. Evening cultural performances.",
          activities: ["Tea plantation", "Tooro Palace", "Cultural performances"],
          accommodation: "Fort Portal Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 4,
          title: "Batwa Cultural Experience",
          description:
            "Visit Batwa communities near Kibale Forest. Learn about their traditional forest lifestyle, hunting techniques, and medicinal plants. Participate in traditional dances and storytelling.",
          activities: ["Batwa community visit", "Traditional lifestyle", "Forest walk", "Storytelling"],
          accommodation: "Fort Portal Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 5,
          title: "Rwenzori Foothills Communities",
          description:
            "Visit communities at the foothills of Rwenzori Mountains. Learn about traditional farming, coffee processing, and local brewing. Participate in community activities.",
          activities: ["Mountain communities", "Coffee processing", "Traditional farming", "Local brewing"],
          accommodation: "Mountain Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 6,
          title: "Return to Kampala",
          description:
            "Morning visit to local school and community projects. Farewell lunch with community members. Return journey to Kampala with stops at craft centers.",
          activities: ["School visit", "Community projects", "Craft shopping", "Return journey"],
          accommodation: "End of tour",
          meals: ["Breakfast", "Lunch"],
        },
      ],
      inclusions: {
        included: [
          "Cultural site entrance fees",
          "Community visits",
          "Traditional performances",
          "Craft workshops",
          "Professional cultural guide",
          "Transportation",
          "Accommodation (5 nights)",
          "All meals as specified",
          "Cultural activities",
        ],
        excluded: [
          "International flights",
          "Visa fees",
          "Travel insurance",
          "Personal expenses",
          "Tips and gratuities",
          "Alcoholic beverages",
          "Personal craft purchases",
          "Optional donations",
        ],
      },
      bestTime: "Year-round, but dry seasons offer better road conditions for community visits",
      physicalRequirements: "Easy - suitable for all ages and fitness levels. Minimal walking required.",
      whatToBring: [
        "Comfortable casual clothing",
        "Respectful attire for cultural sites",
        "Camera",
        "Notebook for cultural insights",
        "Small gifts for communities",
        "Sunscreen",
        "Personal medications",
      ],
    },
    "5": {
      id: 5,
      title: "Mount Elgon Adventure",
      description:
        "Challenge yourself with a trek to the summit of Mount Elgon and explore its unique ecosystem. This adventure combines mountain climbing, cave exploration, and stunning waterfalls.",
      image: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      duration: "7 Days",
      groupSize: "8 People",
      rating: 4.5,
      reviewCount: 42,
      price: 1100,
      originalPrice: 1250,
      location: "Mount Elgon NP",
      category: "Adventure Tours",
      difficulty: "Challenging",
      highlights: ["Mountain Climbing", "Sipi Falls", "Cave Exploration", "Summit Views"],
      itinerary: [
        {
          day: 1,
          title: "Kampala to Sipi Falls",
          description:
            "Depart Kampala for Sipi Falls area. Stop at Jinja for lunch and optional Nile source visit. Afternoon arrival at Sipi Falls with evening nature walk and waterfall viewing.",
          activities: ["Nile source visit", "Sipi Falls viewing", "Nature walk"],
          accommodation: "Sipi River Lodge",
          meals: ["Lunch", "Dinner"],
        },
        {
          day: 2,
          title: "Sipi Falls Exploration",
          description:
            "Full day exploring the three-tier Sipi Falls. Hiking to different viewpoints, coffee plantation tour, and abseiling (optional). Learn about local coffee farming.",
          activities: ["Waterfall hiking", "Coffee tour", "Abseiling", "Photography"],
          accommodation: "Sipi River Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 3,
          title: "Start Mount Elgon Trek",
          description:
            "Begin the Mount Elgon trek from Budadiri gate. Hike through montane forest to Sasa River Camp. First day of acclimatization and forest wildlife viewing.",
          activities: ["Trek start", "Forest hiking", "Wildlife viewing", "Camp setup"],
          accommodation: "Sasa River Camp",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 4,
          title: "Sasa River to Mude Cave Camp",
          description:
            "Continue trekking through bamboo forest and moorland. Reach Mude Cave Camp with spectacular views. Explore the famous elephant caves used by elephants for salt mining.",
          activities: ["Bamboo forest trek", "Moorland hiking", "Cave exploration", "Elephant caves"],
          accommodation: "Mude Cave Camp",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 5,
          title: "Summit Day - Wagagai Peak",
          description:
            "Early morning summit attempt to Wagagai Peak (4,321m), Uganda's second highest peak. Enjoy panoramic views of the caldera and surrounding landscape. Return to Mude Cave Camp.",
          activities: ["Summit climb", "Peak photography", "Caldera views", "Descent"],
          accommodation: "Mude Cave Camp",
          meals: ["Breakfast", "Packed lunch", "Dinner"],
        },
        {
          day: 6,
          title: "Descent to Budadiri",
          description:
            "Descend through different vegetation zones back to Budadiri gate. Celebrate completion of the trek. Transfer to nearby accommodation for rest and recovery.",
          activities: ["Descent trek", "Vegetation zones", "Trek completion", "Rest"],
          accommodation: "Mountain Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 7,
          title: "Return to Kampala",
          description:
            "Morning relaxation and optional cultural visit to local communities. Depart for Kampala with lunch en route. Evening arrival in Kampala.",
          activities: ["Cultural visit", "Return journey", "Reflection"],
          accommodation: "End of tour",
          meals: ["Breakfast", "Lunch"],
        },
      ],
      inclusions: {
        included: [
          "Mount Elgon trekking permits",
          "Professional mountain guide",
          "Porters for camping equipment",
          "Camping equipment",
          "All meals during trek",
          "Park entrance fees",
          "Transportation",
          "Accommodation (6 nights)",
          "Sipi Falls activities",
        ],
        excluded: [
          "International flights",
          "Visa fees",
          "Travel insurance",
          "Personal trekking gear",
          "Tips for guides and porters",
          "Personal expenses",
          "Optional activities",
          "Alcoholic beverages",
        ],
      },
      bestTime: "Dry seasons (December-February, June-September) for best trekking conditions",
      physicalRequirements:
        "Challenging - requires good physical fitness and previous hiking experience. Altitude reaches 4,321m.",
      whatToBring: [
        "Trekking boots",
        "Warm clothing for altitude",
        "Rain gear",
        "Sleeping bag",
        "Headlamp",
        "Trekking poles",
        "Personal first aid kit",
        "High-energy snacks",
      ],
    },
    "6": {
      id: 6,
      title: "Birding Paradise Tour",
      description:
        "Discover Uganda's incredible bird diversity with expert guides in prime birding locations. With over 1,000 species, Uganda offers some of the world's best birding experiences.",
      image: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      duration: "8 Days",
      groupSize: "12 People",
      rating: 4.8,
      reviewCount: 34,
      price: 1350,
      originalPrice: 1500,
      location: "Multiple Parks",
      category: "Bird Watching",
      difficulty: "Easy",
      highlights: ["Shoebill Stork", "Endemic Species", "Forest Birds", "Wetland Species"],
      itinerary: [
        {
          day: 1,
          title: "Arrival and Mabamba Swamp",
          description:
            "Airport pickup and transfer to Mabamba Swamp for the iconic Shoebill Stork. Boat ride through papyrus swamps with excellent birding opportunities. Evening in Entebbe.",
          activities: ["Shoebill tracking", "Swamp birding", "Boat ride", "Species identification"],
          accommodation: "Entebbe Hotel",
          meals: ["Lunch", "Dinner"],
        },
        {
          day: 2,
          title: "Entebbe to Murchison Falls",
          description:
            "Morning birding at Entebbe Botanical Gardens. Transfer to Murchison Falls with birding stops en route. Evening arrival and night sounds identification.",
          activities: ["Botanical gardens", "En route birding", "Night sounds"],
          accommodation: "Paraa Safari Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 3,
          title: "Murchison Falls Birding",
          description:
            "Early morning birding drive in northern sector. Afternoon boat cruise focusing on water birds along the Nile. Over 450 species recorded in this park.",
          activities: ["Morning birding drive", "Nile boat birding", "Species recording"],
          accommodation: "Paraa Safari Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 4,
          title: "Transfer to Kibale Forest",
          description:
            "Transfer to Kibale Forest with birding stops in different habitats. Afternoon forest birding walk focusing on forest specialists and Albertine endemics.",
          activities: ["Habitat birding", "Forest walk", "Endemic species"],
          accommodation: "Kibale Forest Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 5,
          title: "Kibale Forest Birding",
          description:
            "Full day birding in Kibale Forest, home to over 370 species. Morning and afternoon birding walks with expert local guides. Focus on forest canopy species.",
          activities: ["Forest birding", "Canopy species", "Photography", "Species listing"],
          accommodation: "Kibale Forest Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 6,
          title: "Queen Elizabeth National Park",
          description:
            "Transfer to Queen Elizabeth NP with birding en route. Afternoon birding around Mweya Peninsula. Evening boat cruise on Kazinga Channel for water birds.",
          activities: ["Transfer birding", "Peninsula birding", "Channel boat cruise"],
          accommodation: "Mweya Safari Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 7,
          title: "Maramagambo Forest",
          description:
            "Morning birding in Maramagambo Forest for forest specialists. Afternoon birding in different park sectors. Focus on raptors and savanna species.",
          activities: ["Forest birding", "Raptor watching", "Savanna species", "Photography"],
          accommodation: "Mweya Safari Lodge",
          meals: ["Breakfast", "Lunch", "Dinner"],
        },
        {
          day: 8,
          title: "Return to Kampala",
          description:
            "Morning birding en route to Kampala. Stop at various habitats for final species additions. Afternoon arrival in Kampala with species list compilation.",
          activities: ["En route birding", "Species compilation", "Final count"],
          accommodation: "End of tour",
          meals: ["Breakfast", "Lunch"],
        },
      ],
      inclusions: {
        included: [
          "Expert birding guide",
          "Park entrance fees",
          "Boat cruises",
          "Transportation in birding vehicle",
          "Accommodation (7 nights)",
          "All meals as specified",
          "Birding equipment (binoculars available)",
          "Species checklists",
          "Field guides",
        ],
        excluded: [
          "International flights",
          "Visa fees",
          "Travel insurance",
          "Personal birding equipment",
          "Tips and gratuities",
          "Personal expenses",
          "Alcoholic beverages",
          "Optional activities",
        ],
      },
      bestTime: "November to April for migratory species, but year-round birding is excellent",
      physicalRequirements: "Easy to moderate - involves walking on forest trails and boat rides",
      whatToBring: [
        "Binoculars (8x42 recommended)",
        "Field notebook",
        "Camera with telephoto lens",
        "Comfortable walking shoes",
        "Hat and sunscreen",
        "Insect repellent",
        "Rain jacket",
        "Field guide (provided)",
      ],
    },
  }

  return tours[id as keyof typeof tours] || null
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const tour = await getTour(params.id)

  if (!tour) {
    return {
      title: "Tour Not Found",
    }
  }

  return {
    title: `${tour.title} | Samba Tours & Travel`,
    description: tour.description,
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: [tour.image],
    },
  }
}

export default async function TourDetailPage({ params }: { params: { id: string } }) {
  const tour = await getTour(params.id)

  if (!tour) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-cream-50">
      <TourHero tour={tour} />

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <TourDetails tour={tour} />

              <Suspense fallback={<LoadingSpinner />}>
                <TourItinerary itinerary={tour.itinerary} />
              </Suspense>

              <TourInclusions inclusions={tour.inclusions} />

              <Suspense fallback={<LoadingSpinner />}>
                <TourGallery gallery={tour.gallery} title={tour.title} />
              </Suspense>

              <Suspense fallback={<LoadingSpinner />}>
                <TourReviews tourId={tour.id} rating={tour.rating} reviewCount={tour.reviewCount} />
              </Suspense>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <TourBooking tour={tour} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<LoadingSpinner />}>
        <RelatedTours currentTour={tour} />
      </Suspense>
    </main>
  )
}
