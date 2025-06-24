import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Clock, Eye, Heart, Share2, BookOpen, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 5,
    title: "10 Essential Items to Pack for Your Uganda Safari",
    excerpt:
      "Don't leave home without these crucial items. Our comprehensive packing checklist ensures you're prepared for any adventure.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Travel Planning",
    author: "David Mukasa",
    date: "2024-03-10",
    readTime: "7 min read",
    views: 3200,
    likes: 89,
    featured: false,
    tags: ["Packing", "Safari", "Preparation"],
  },
  {
    id: 6,
    title: "The Secret Life of Mountain Gorillas: Behavioral Insights",
    excerpt:
      "Discover fascinating insights into gorilla behavior, social structures, and conservation efforts in Uganda's forests.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Wildlife",
    author: "Grace Nakato",
    date: "2024-03-08",
    readTime: "12 min read",
    views: 2890,
    likes: 156,
    featured: true,
    tags: ["Gorillas", "Wildlife", "Conservation"],
  },
  {
    id: 7,
    title: "Uganda's Hidden Gems: Off-the-Beaten-Path Destinations",
    excerpt:
      "Explore lesser-known but equally spectacular destinations that offer authentic experiences away from the crowds.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Destinations",
    author: "Robert Tumusiime",
    date: "2024-03-05",
    readTime: "15 min read",
    views: 1950,
    likes: 78,
    featured: false,
    tags: ["Hidden Gems", "Adventure", "Exploration"],
  },
  {
    id: 8,
    title: "Sustainable Tourism: How We're Protecting Uganda's Future",
    excerpt:
      "Learn about our commitment to sustainable tourism practices and how your visit contributes to conservation efforts.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Conservation",
    author: "Mary Atuhaire",
    date: "2024-03-03",
    readTime: "9 min read",
    views: 1650,
    likes: 92,
    featured: false,
    tags: ["Sustainability", "Conservation", "Community"],
  },
  {
    id: 9,
    title: "Birdwatcher's Paradise: Uganda's Avian Diversity",
    excerpt:
      "With over 1,000 bird species, Uganda is a birdwatcher's dream. Discover the best locations and species to spot.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Birdwatching",
    author: "James Okello",
    date: "2024-03-01",
    readTime: "11 min read",
    views: 1420,
    likes: 65,
    featured: false,
    tags: ["Birds", "Wildlife", "Photography"],
  },
  {
    id: 10,
    title: "Local Cuisine Guide: Taste the Flavors of Uganda",
    excerpt:
      "Embark on a culinary journey through Uganda's diverse food culture, from street food to traditional dishes.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Culture",
    author: "Sarah Namukasa",
    date: "2024-02-28",
    readTime: "8 min read",
    views: 2100,
    likes: 134,
    featured: false,
    tags: ["Food", "Culture", "Local Experience"],
  },
]

interface BlogGridProps {
  categoryFilter?: string
  tagFilter?: string
  authorFilter?: string
}

export default function BlogGrid({ categoryFilter, tagFilter, authorFilter }: BlogGridProps) {
  // Filter posts based on the provided filters
  let filteredPosts = blogPosts

  if (categoryFilter) {
    filteredPosts = blogPosts.filter(
      (post) => post.category.toLowerCase().replace(/\s+/g, "-").replace("&", "") === categoryFilter,
    )
  }

  if (tagFilter) {
    filteredPosts = blogPosts.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase().replace(/\s+/g, "-") === tagFilter),
    )
  }

  if (authorFilter) {
    filteredPosts = blogPosts.filter((post) => post.author.toLowerCase().replace(/\s+/g, "-") === authorFilter)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <p className="text-earth-600">Showing {filteredPosts.length} articles</p>
        <div className="flex items-center space-x-2 text-sm text-earth-600">
          <BookOpen className="h-4 w-4" />
          <span>Latest insights from our experts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <Badge className="bg-forest-600 text-white">{post.category}</Badge>
                {post.featured && <Badge className="bg-yellow-500 text-white">Featured</Badge>}
              </div>

              {/* Hover overlay with quick actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex space-x-3">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white" asChild>
                    <Link href={`/blog/${post.id}`}>
                      <BookOpen className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between text-sm text-earth-600 mb-3">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h3 className="font-bold text-xl text-earth-900 mb-3 group-hover:text-forest-600 transition-colors line-clamp-2">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </h3>

              <p className="text-earth-700 mb-4 line-clamp-3">{post.excerpt}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-earth-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                </div>

                <Button variant="ghost" size="sm" asChild className="text-forest-600 hover:text-forest-700">
                  <Link href={`/blog/${post.id}`} className="flex items-center space-x-1">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button size="lg" variant="outline" className="px-8">
          Load More Articles
        </Button>
      </div>
    </div>
  )
}
