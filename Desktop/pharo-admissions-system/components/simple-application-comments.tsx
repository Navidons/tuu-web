"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, User, Clock } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"

interface Comment {
  id: string
  comment: string
  is_internal: boolean
  created_at: string
  user_id: string
}

interface SimpleApplicationCommentsProps {
  applicationId: string
}

export function SimpleApplicationComments({ applicationId }: SimpleApplicationCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isInternal, setIsInternal] = useState(true)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

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

      if (error) {
        console.error("Error fetching comments:", error)
        return
      }
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
        user_id: user.id,
        comment: newComment.trim(),
        is_internal: isInternal,
      })

      if (error) {
        console.error("Error adding comment:", error)
        return
      }

      setNewComment("")
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
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments & Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new comment */}
        <div className="space-y-3">
          <Textarea
            placeholder="Add a comment or note..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="internal"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="internal" className="text-sm">
                Internal note (staff only)
              </label>
            </div>
            <Button onClick={addComment} disabled={loading || !newComment.trim()} size="sm">
              {loading ? "Adding..." : "Add Comment"}
            </Button>
          </div>
        </div>

        {/* Comments list */}
        <div className="space-y-3">
          {comments.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No comments yet. Add the first comment above.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Staff Member</span>
                    {comment.is_internal && (
                      <Badge variant="secondary" className="text-xs">
                        Internal
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(comment.created_at).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm">{comment.comment}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
