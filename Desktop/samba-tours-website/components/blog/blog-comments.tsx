"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MessageCircle, Heart, Reply, Flag } from "lucide-react"

const comments = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "2024-03-21",
    content:
      "This guide is incredibly helpful! We're planning our gorilla trekking trip for next month and this answered all our questions. Thank you for the detailed preparation tips.",
    likes: 12,
    replies: [
      {
        id: 2,
        author: "James Okello",
        avatar: "/placeholder.svg?height=100&width=100",
        date: "2024-03-21",
        content:
          "Thank you Sarah! Feel free to reach out if you have any other questions. We're here to help make your gorilla trekking experience unforgettable.",
        likes: 5,
        isAuthor: true,
      },
    ],
  },
  {
    id: 3,
    author: "Michael Chen",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "2024-03-20",
    content:
      "Just returned from our gorilla trek with Samba Tours. Everything mentioned in this article is spot on. The experience was absolutely magical!",
    likes: 8,
    replies: [],
  },
]

interface BlogCommentsProps {
  postId: number
}

export default function BlogComments({ postId }: BlogCommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle comment submission
    console.log("New comment:", { name, email, comment: newComment, postId })
    setNewComment("")
    setName("")
    setEmail("")
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-forest-600" />
          <span>Comments ({comments.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-earth-900 mb-4">Leave a Comment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Textarea
            placeholder="Share your thoughts, questions, or experiences..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="mb-4"
            required
          />
          <Button type="submit" className="btn-primary">
            Post Comment
          </Button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h5 className="font-semibold text-earth-900">{comment.author}</h5>
                    <span className="text-sm text-earth-500">{new Date(comment.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-earth-700 mb-3">{comment.content}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <Button variant="ghost" size="sm" className="text-earth-600 hover:text-forest-600">
                      <Heart className="h-4 w-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-earth-600 hover:text-forest-600">
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="text-earth-600 hover:text-red-600">
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-4 ml-6 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start space-x-3">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={reply.avatar || "/placeholder.svg"}
                              alt={reply.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h6 className="font-semibold text-earth-900 text-sm">{reply.author}</h6>
                              {reply.isAuthor && (
                                <span className="text-xs bg-forest-100 text-forest-800 px-2 py-1 rounded">Author</span>
                              )}
                              <span className="text-xs text-earth-500">
                                {new Date(reply.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-earth-700 text-sm mb-2">{reply.content}</p>
                            <div className="flex items-center space-x-3 text-xs">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-earth-600 hover:text-forest-600 h-6 px-2"
                              >
                                <Heart className="h-3 w-3 mr-1" />
                                {reply.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-earth-600 hover:text-forest-600 h-6 px-2"
                              >
                                <Reply className="h-3 w-3 mr-1" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
