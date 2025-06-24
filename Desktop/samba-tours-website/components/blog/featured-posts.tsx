import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Clock, TrendingUp } from "lucide-react"

const featuredPosts = [
  {
    id: 2,
    title: "Best Time to Visit Uganda: A Month-by-Month Guide",
    excerpt:
      "Plan your perfect Uganda adventure with our comprehensive guide to weather, wildlife, and seasonal highlights.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Travel Planning",
    author: "Sarah Namukasa",
    date: "2024-03-18",
    readTime: "8 min read",
    views: 2450,
    trending: true,
  },
  {
    id: 3,
    title: "Photography Tips for Your Uganda Safari",
    excerpt: "Capture stunning wildlife photos with expert tips from our professional safari guides and photographers.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Photography",
    author: "Robert Tumusiime",
    date: "2024-03-15",
    readTime: "10 min read",
    views: 1890,
    trending: false,
  },
  {
    id: 4,
    title: "Cultural Etiquette: Respectful Travel in Uganda",
    excerpt: "Learn about Ugandan customs, traditions, and how to be a respectful visitor to local communities.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Culture",
    author: "Mary Atuhaire",
    date: "2024-03-12",
    readTime: "6 min read",
    views: 1650,
    trending: true,
  },
]

export default function FeaturedPosts() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="heading-secondary">Featured Stories</h2>
            <p className="text-lg text-earth-600">
              Hand-picked articles from our travel experts and experienced guides
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-sm text-earth-600">
            <TrendingUp className="h-4 w-4" />
            <span>Trending Now</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <Badge className="bg-forest-600 text-white">{post.category}</Badge>
                  {post.trending && (
                    <Badge variant="destructive" className="bg-red-500 text-white">
                      Trending
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-earth-900 mb-3 group-hover:text-forest-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>

                <p className="text-earth-700 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-earth-600 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-earth-500">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <span className="text-sm text-earth-500">{post.views.toLocaleString()} views</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
