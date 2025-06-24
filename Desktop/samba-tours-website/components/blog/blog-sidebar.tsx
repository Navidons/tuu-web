import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrendingUp, Calendar, Mail, Tag, BookOpen, Star } from "lucide-react"

const popularPosts = [
  {
    id: 11,
    title: "First-Timer's Guide to Gorilla Trekking",
    image: "/placeholder.svg?height=200&width=300",
    views: 5600,
    date: "2024-03-15",
  },
  {
    id: 12,
    title: "Best Photography Spots in Uganda",
    image: "/placeholder.svg?height=200&width=300",
    views: 4200,
    date: "2024-03-12",
  },
  {
    id: 13,
    title: "Uganda Safari Packing Checklist",
    image: "/placeholder.svg?height=200&width=300",
    views: 3800,
    date: "2024-03-10",
  },
]

const categories = [
  { name: "Gorilla Trekking", count: 28, color: "bg-forest-100 text-forest-800" },
  { name: "Wildlife Safari", count: 45, color: "bg-yellow-100 text-yellow-800" },
  { name: "Travel Planning", count: 32, color: "bg-blue-100 text-blue-800" },
  { name: "Culture", count: 24, color: "bg-purple-100 text-purple-800" },
  { name: "Photography", count: 18, color: "bg-pink-100 text-pink-800" },
  { name: "Conservation", count: 12, color: "bg-green-100 text-green-800" },
]

const tags = [
  "Safari",
  "Gorillas",
  "Wildlife",
  "Photography",
  "Culture",
  "Adventure",
  "Conservation",
  "Travel Tips",
  "Uganda",
  "East Africa",
  "National Parks",
  "Birdwatching",
]

const teamAuthors = [
  {
    name: "James Okello",
    role: "Senior Safari Guide",
    image: "/placeholder.svg?height=100&width=100",
    posts: 23,
    expertise: "Wildlife & Photography",
  },
  {
    name: "Sarah Namukasa",
    role: "Travel Specialist",
    image: "/placeholder.svg?height=100&width=100",
    posts: 18,
    expertise: "Travel Planning",
  },
  {
    name: "Mary Atuhaire",
    role: "Cultural Guide",
    image: "/placeholder.svg?height=100&width=100",
    posts: 15,
    expertise: "Culture & Heritage",
  },
]

export default function BlogSidebar() {
  return (
    <div className="space-y-8">
      {/* Newsletter Signup */}
      <Card className="bg-forest-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Travel Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-forest-100 mb-4">
            Get expert travel tips and exclusive stories delivered to your inbox weekly.
          </p>
          <div className="space-y-3">
            <Input
              placeholder="Your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button className="w-full bg-white text-forest-600 hover:bg-gray-100">Subscribe Now</Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-forest-600" />
            <span>Popular Posts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popularPosts.map((post) => (
            <div key={post.id} className="flex space-x-3 group">
              <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-earth-900 group-hover:text-forest-600 transition-colors line-clamp-2 mb-1">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h4>
                <div className="flex items-center space-x-2 text-xs text-earth-500">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-forest-600" />
            <span>Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/blog/category/${category.name.toLowerCase().replace(" ", "-")}`}
                className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors group"
              >
                <span className="font-medium text-earth-900 group-hover:text-forest-600">{category.name}</span>
                <Badge className={category.color}>{category.count}</Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-forest-600" />
            <span>Popular Tags</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="text-sm px-3 py-1 bg-gray-100 hover:bg-forest-100 text-earth-700 hover:text-forest-700 rounded-full transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Authors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-forest-600" />
            <span>Our Expert Authors</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamAuthors.map((author, index) => (
            <div key={index} className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image src={author.image || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-earth-900 group-hover:text-forest-600 transition-colors">
                  <Link href={`/blog/author/${author.name.toLowerCase().replace(" ", "-")}`}>{author.name}</Link>
                </h4>
                <p className="text-xs text-earth-600">{author.role}</p>
                <p className="text-xs text-earth-500">
                  {author.posts} posts • {author.expertise}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
