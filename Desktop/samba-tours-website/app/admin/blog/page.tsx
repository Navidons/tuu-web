import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Edit, Trash2, Eye, Calendar } from "lucide-react"
import Link from "next/link"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata = {
  title: "Blog Management - Samba Tours Admin",
  description: "Manage blog posts and content.",
}

const posts = [
  {
    id: 1,
    title: "Ultimate Guide to Gorilla Trekking in Uganda",
    category: "Travel Tips",
    author: "John Doe",
    status: "published",
    publishDate: "2024-06-15",
    views: 1247,
    comments: 23,
    featured: true,
    thumbnail: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 2,
    title: "Best Time to Visit Murchison Falls National Park",
    category: "Destinations",
    author: "Jane Smith",
    status: "published",
    publishDate: "2024-06-12",
    views: 892,
    comments: 15,
    featured: false,
    thumbnail: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 3,
    title: "Cultural Experiences in Uganda: A Complete Guide",
    category: "Culture",
    author: "Mike Johnson",
    status: "draft",
    publishDate: null,
    views: 0,
    comments: 0,
    featured: false,
    thumbnail: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 4,
    title: "Wildlife Photography Tips for Safari Tours",
    category: "Photography",
    author: "Sarah Wilson",
    status: "scheduled",
    publishDate: "2024-06-25",
    views: 0,
    comments: 0,
    featured: true,
    thumbnail: "/placeholder.svg?height=100&width=150",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800"
    case "draft":
      return "bg-yellow-100 text-yellow-800"
    case "scheduled":
      return "bg-blue-100 text-blue-800"
    case "archived":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function BlogManagement() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-earth-900 mb-2">Blog Management</h1>
              <p className="text-earth-600">Manage blog posts and content</p>
            </div>
            <Button asChild className="bg-forest-600 hover:bg-forest-700">
              <Link href="/admin/blog/new">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-earth-900">47</div>
                <p className="text-sm text-earth-600">Total Posts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-green-600">32</div>
                <p className="text-sm text-earth-600">Published</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-yellow-600">8</div>
                <p className="text-sm text-earth-600">Drafts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-600">15,432</div>
                <p className="text-sm text-earth-600">Total Views</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search posts..." className="pl-10" />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <Suspense fallback={<LoadingSpinner />}>
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="w-full lg:w-32 h-20 lg:h-24">
                        <img
                          src={post.thumbnail || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-earth-900">{post.title}</h3>
                              {post.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                            </div>
                            <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-earth-600">
                          <div>
                            <p className="font-medium">Category</p>
                            <p>{post.category}</p>
                          </div>
                          <div>
                            <p className="font-medium">Author</p>
                            <p>{post.author}</p>
                          </div>
                          <div>
                            <p className="font-medium">Published</p>
                            <p className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {post.publishDate || "Not published"}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Engagement</p>
                            <p>
                              {post.views} views • {post.comments} comments
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Suspense>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-forest-600 text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
