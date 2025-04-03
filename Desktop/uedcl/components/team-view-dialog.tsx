"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { UserIcon, Search } from "lucide-react"
import Link from "next/link"

interface TeamViewDialogProps {
  teamId: number
  teamName: string
}

export function TeamViewDialog({ teamId, teamName }: TeamViewDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [teamData, setTeamData] = useState<any>(null)
  const [error, setError] = useState("")
  
  // Fetch team data when dialog opens
  useEffect(() => {
    if (isOpen && !teamData) {
      fetchTeamData()
    }
  }, [isOpen, teamData])
  
  const fetchTeamData = async () => {
    setIsLoading(true)
    setError("")
    
    try {
      const response = await fetch(`/api/teams/${teamId}`)
      const data = await response.json()
      
      if (data.success) {
        setTeamData(data.team)
      } else {
        setError(data.error || "Failed to fetch team details")
      }
    } catch (error) {
      console.error("Error fetching team details:", error)
      setError("An error occurred while fetching team details")
    } finally {
      setIsLoading(false)
    }
  }
  
  // Reset data when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setTeamData(null)
    }
  }, [isOpen])
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-1/2">
          <Search className="mr-2 h-4 w-4" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{teamName} - Team Details</DialogTitle>
          <DialogDescription>
            View team members and details
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">
            {error}
          </div>
        ) : teamData ? (
          <div className="mt-4 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Team Information</h3>
                <div className="text-sm text-muted-foreground mt-1">
                  {teamData.specialization || teamData.region || "No specialization defined"}
                </div>
              </div>
              <Badge variant="outline">
                {teamData.members?.length || 0} Members
              </Badge>
            </div>
            
            {teamData.supervisor_name && (
              <div>
                <h4 className="font-medium mb-1">Team Lead</h4>
                <div className="text-sm">{teamData.supervisor_name}</div>
              </div>
            )}
            
            <div>
              <h4 className="font-medium mb-2">Team Members</h4>
              {teamData.members && teamData.members.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {teamData.members.map((member: any) => (
                    <div key={member.id} className="flex items-center gap-3 bg-muted/50 p-2 rounded-md">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {member.email}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {member.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground bg-muted/30 rounded-md">
                  <UserIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">No team members found</div>
                </div>
              )}
            </div>
            
            <div className="flex justify-center pt-2">
              <Button variant="outline" asChild>
                <Link href={`/teams/${teamId}`}>
                  Manage Team
                </Link>
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

