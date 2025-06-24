"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Eye, MapPin, Camera } from "lucide-react"
import GalleryLightbox from "./gallery-lightbox"

const galleryItems = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Mountain gorilla family in Bwindi Forest",
    category: "gorillas",
    location: "Bwindi Forest",
    title: "Mountain Gorilla Family",
    description: "A peaceful moment with a gorilla family during our morning trek",
    photographer: "James Okello",
    date: "2024-03-15",
    likes: 234,
    views: 1250,
    aspectRatio: "4:3",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Murchison Falls waterfall",
    category: "landscapes",
    location: "Murchison Falls",
    title: "The Power of Murchison Falls",
    description: "The mighty Nile River cascading through the narrow gorge",
    photographer: "Sarah Namukasa",
    date: "2024-03-10",
    likes: 189,
    views: 980,
    aspectRatio: "3:4",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=900",
    alt: "Tree-climbing lions in Queen Elizabeth National Park",
    category: "wildlife",
    location: "Queen Elizabeth NP",
    title: "Tree-Climbing Lions",
    description: "Rare behavior captured - lions resting in fig trees",
    photographer: "Robert Tumusiime",
    date: "2024-03-08",
    likes: 312,
    views: 1580,
    aspectRatio: "3:2",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=700&width=700",
    alt: "Traditional Ugandan dancers",
    category: "cultural",
    location: "Multiple Regions",
    title: "Cultural Heritage Dance",
    description: "Traditional dancers showcasing Uganda's rich cultural heritage",
    photographer: "Mary Atuhaire",
    date: "2024-03-05",
    likes: 156,
    views: 720,
    aspectRatio: "1:1",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=500&width=800",
    alt: "Shoebill stork in Mabamba wetlands",
    category: "birds",
    location: "Mabamba Wetlands",
    title: "Majestic Shoebill Stork",
    description: "The prehistoric-looking shoebill in its natural habitat",
    photographer: "Grace Nakato",
    date: "2024-03-01",
    likes: 98,
    views: 450,
    aspectRatio: "8:5",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=800&width=600",
    alt: "White water rafting on the Nile",
    category: "adventure",
    location: "Jinja",
    title: "Nile River Rapids",
    description: "Adrenaline-pumping white water rafting adventure",
    photographer: "David Mukasa",
    date: "2024-02-28",
    likes: 267,
    views: 1100,
    aspectRatio: "3:4",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=600&width=1000",
    alt: "Sunset over Lake Mburo",
    category: "landscapes",
    location: "Lake Mburo",
    title: "Golden Hour at Lake Mburo",
    description: "Breathtaking sunset reflecting on the calm waters",
    photographer: "James Okello",
    date: "2024-02-25",
    likes: 445,
    views: 2100,
    aspectRatio: "5:3",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=700&width=800",
    alt: "Chimpanzees in Kibale Forest",
    category: "wildlife",
    location: "Kibale Forest",
    title: "Chimpanzee Family",
    description: "Playful chimpanzees swinging through the forest canopy",
    photographer: "Sarah Namukasa",
    date: "2024-02-20",
    likes: 178,
    views: 890,
    aspectRatio: "8:7",
  },
]

export default function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set())
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set([...prev, id]))
  }

  const toggleLike = (id: number) => {
    setLikedImages((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const getGridItemClass = (aspectRatio: string) => {
    switch (aspectRatio) {
      case "1:1":
        return "aspect-square"
      case "3:4":
        return "aspect-[3/4]"
      case "4:3":
        return "aspect-[4/3]"
      case "3:2":
        return "aspect-[3/2]"
      case "8:5":
        return "aspect-[8/5]"
      case "5:3":
        return "aspect-[5/3]"
      case "8:7":
        return "aspect-[8/7]"
      default:
        return "aspect-[4/3]"
    }
  }

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {galleryItems.map((item, index) => (
          <Card
            key={item.id}
            className="group break-inside-avoid overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <div className="relative overflow-hidden">
              <div className={`relative ${getGridItemClass(item.aspectRatio)} w-full`}>
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  fill
                  className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                    loadedImages.has(item.id) ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleImageLoad(item.id)}
                />

                {/* Loading skeleton */}
                {!loadedImages.has(item.id) && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-forest-600 text-white capitalize">{item.category.replace("-", " ")}</Badge>
                </div>

                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(item.id)
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 ${likedImages.has(item.id) ? "fill-red-500 text-red-500" : "text-earth-600"}`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Share2 className="h-4 w-4 text-earth-600" />
                  </Button>
                </div>

                {/* Bottom info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-200 mb-2 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Camera className="h-3 w-3" />
                        <span>{item.photographer}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <Button size="lg" variant="outline" className="px-8">
          Load More Photos
        </Button>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <GalleryLightbox
          images={galleryItems}
          currentIndex={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={() => setSelectedImage((selectedImage + 1) % galleryItems.length)}
          onPrev={() => setSelectedImage((selectedImage - 1 + galleryItems.length) % galleryItems.length)}
        />
      )}
    </>
  )
}
