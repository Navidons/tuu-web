"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Plus } from "lucide-react"
import { format } from "date-fns"

interface Comment {
  id: string
  comment: string
  is_internal: boolean
  created_at: string
  user_id: string
}

interface ApplicationCommentsProps {
  applicationId: string
}

export function ApplicationComments({ applicationId }: ApplicationCommentsProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isInternal, setIsInternal] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showAddComment, setShowAddComment] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [applicationId])

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("application_comments")
        .select("*")
        .eq("application_id", applicationId)
        .order("created_at", { ascending: false })

      if (error) throw error
      setComments(data || [])
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const addComment = async () => {
    if (!newComment.trim() || !user) return

    setLoading(true)
    try {
      const { error } = await supabase.from("application_comments").insert({
        application_id: applicationId,
        comment: newComment.trim(),
        is_internal: isInternal,
        user_id: user.id,
      })

      if (error) throw error

      setNewComment("")
      setShowAddComment(false)
      fetchComments()
    } catch (error) {
      console.error("Error adding comment:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Comments</span>
            <Badge variant="secondary">{comments.length}</Badge>
          </div>
          <Button size="sm" onClick={() => setShowAddComment(!showAddComment)}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddComment && (
          <div className="space-y-3 p-3 border rounded-lg bg-gray-50">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="internal"
                  checked={isInternal}
                  onChange={(e) => setIsInternal(e.target.checked)}
                />
                <label htmlFor="internal" className="text-sm text-gray-600">
                  Internal comment (staff only)
                </label>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => setShowAddComment(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={addComment} disabled={loading || !newComment.trim()}>
                  {loading ? "Adding..." : "Add Comment"}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Staff Member</span>
                    {comment.is_internal && (
                      <Badge variant="secondary" className="text-xs">
                        Internal
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{format(new Date(comment.created_at), "PPp")}</span>
                </div>
                <p className="text-sm text-gray-700">{comment.comment}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
