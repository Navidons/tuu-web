"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Clock, Eye, Calendar } from "lucide-react"

const videos = [
  {
    id: 1,
    title: "Gorilla Trekking Experience",
    description: "Follow our travelers on an incredible gorilla trekking adventure in Bwindi Forest",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "8:45",
    views: 12500,
    date: "2024-03-15",
    category: "Gorilla Trekking",
    location: "Bwindi Forest",
  },
  {
    id: 2,
    title: "Murchison Falls Safari Highlights",
    description: "Experience the best of Murchison Falls National Park in this stunning safari compilation",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "12:30",
    views: 8900,
    date: "2024-03-10",
    category: "Wildlife Safari",
    location: "Murchison Falls",
  },
  {
    id: 3,
    title: "Cultural Dance Performance",
    description: "Traditional Ugandan cultural performances showcasing the country's rich heritage",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "6:20",
    views: 5600,
    date: "2024-03-05",
    category: "Cultural",
    location: "Multiple Regions",
  },
  {
    id: 4,
    title: "White Water Rafting Adventure",
    description: "Adrenaline-pumping white water rafting on the source of the Nile River",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "10:15",
    views: 7800,
    date: "2024-02-28",
    category: "Adventure",
    location: "Jinja",
  },
]

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="heading-secondary">Video Gallery</h2>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            Experience Uganda through motion. Our video collection captures the sounds, movements, and emotions of real
            adventures with our travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm h-16 w-16 rounded-full p-0"
                    onClick={() => setSelectedVideo(video.id)}
                  >
                    <Play className="h-8 w-8 ml-1" />
                  </Button>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{video.duration}</span>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-forest-600 text-white">{video.category}</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-earth-900 mb-2 group-hover:text-forest-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-earth-700 mb-4 line-clamp-2">{video.description}</p>

                <div className="flex items-center justify-between text-sm text-earth-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{video.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(video.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Videos
          </Button>
        </div>
      </div>
    </section>
  )
}
