import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Search, Filter, Edit, Trash2, Eye, FolderPlus } from "lucide-react"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata = {
  title: "Gallery Management - Samba Tours Admin",
  description: "Manage photo galleries and media assets.",
}

const galleries = [
  {
    id: 1,
    name: "Gorilla Trekking",
    category: "Wildlife",
    images: 24,
    featured: true,
    lastUpdated: "2024-06-15",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Murchison Falls",
    category: "Safari",
    images: 18,
    featured: false,
    lastUpdated: "2024-06-12",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Cultural Experiences",
    category: "Cultural",
    images: 32,
    featured: true,
    lastUpdated: "2024-06-10",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Queen Elizabeth Park",
    category: "Wildlife",
    images: 15,
    featured: false,
    lastUpdated: "2024-06-08",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export default function GalleryManagement() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-earth-900 mb-2">Gallery Management</h1>
              <p className="text-earth-600">Manage photo galleries and media assets</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <FolderPlus className="h-4 w-4 mr-2" />
                New Gallery
              </Button>
              <Button className="bg-forest-600 hover:bg-forest-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Images
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-earth-900">1,247</div>
                <p className="text-sm text-earth-600">Total Images</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-forest-600">24</div>
                <p className="text-sm text-earth-600">Galleries</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-600">2.4 GB</div>
                <p className="text-sm text-earth-600">Storage Used</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <p className="text-sm text-earth-600">Featured Images</p>
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
                    <Input placeholder="Search galleries..." className="pl-10" />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="wildlife">Wildlife</SelectItem>
                    <SelectItem value="safari">Safari</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Galleries Grid */}
          <Suspense fallback={<LoadingSpinner />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery) => (
                <Card key={gallery.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={gallery.thumbnail || "/placeholder.svg"}
                      alt={gallery.name}
                      className="w-full h-full object-cover"
                    />
                    {gallery.featured && (
                      <Badge className="absolute top-3 right-3 bg-yellow-100 text-yellow-800">Featured</Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-earth-900 mb-2">{gallery.name}</h3>
                      <div className="flex items-center justify-between text-sm text-earth-600 mb-2">
                        <span>{gallery.category}</span>
                        <span>{gallery.images} images</span>
                      </div>
                      <p className="text-xs text-earth-500">Last updated: {gallery.lastUpdated}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </main>
  )
}
