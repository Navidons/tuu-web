import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Eye, Heart, Share2, ArrowLeft } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  author: {
    name: string
    role: string
    image: string
    bio: string
  }
  date: string
  readTime: string
  views: number
  likes: number
  tags: string[]
}

interface BlogPostHeaderProps {
  post: BlogPost
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="relative">
      {/* Back Navigation */}
      <div className="absolute top-6 left-6 z-20">
        <Button variant="secondary" size="sm" asChild className="bg-white/90 hover:bg-white">
          <Link href="/blog" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
        </Button>
      </div>

      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="container-max">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-4">
              <Badge className="bg-forest-600 text-white">{post.category}</Badge>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-playfair font-bold mb-6 leading-tight">{post.title}</h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={post.author.image || "/placeholder.svg"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <p className="text-sm text-gray-300">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {post.likes}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
