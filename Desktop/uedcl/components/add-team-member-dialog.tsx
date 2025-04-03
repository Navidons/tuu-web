"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"
import { toast } from "sonner"

interface User {
  id: number
  name: string
  role: string
}

interface AddTeamMemberDialogProps {
  teamId: number
}

export function AddTeamMemberDialog({ teamId }: AddTeamMemberDialogProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [availableUsers, setAvailableUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState("")
  
  // Fetch available users when dialog opens
  useEffect(() => {
    if (isOpen) {
      fetchAvailableUsers()
    }
  }, [isOpen])
  
  // Reset selected user when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedUserId("")
    }
  }, [isOpen])
  
  // Fetch users who are not already in the team
  const fetchAvailableUsers = async () => {
    try {
      // Get all technicians
      const response = await fetch("/api/technicians")
      const data = await response.json()
      
      if (data.success) {
        // Filter out technicians who are already in this team
        const availableTechnicians = data.technicians.filter(
          (tech: any) => tech.team_id !== teamId
        )
        setAvailableUsers(availableTechnicians)
      } else {
        console.error("Failed to fetch technicians:", data.error)
      }
    } catch (error) {
      console.error("Error fetching technicians:", error)
    }
  }
  
  const handleAddMember = async () => {
    if (!selectedUserId) {
      toast.error("Please select a technician to add")
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/teams/${teamId}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: parseInt(selectedUserId)
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success("Team member added successfully")
        setIsOpen(false)
        router.refresh()
      } else {
        toast.error(data.error || "Failed to add team member")
      }
    } catch (error) {
      toast.error("An error occurred while adding the team member")
      console.error("Error adding team member:", error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Add a technician to this team.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="technician" className="text-right">
              Technician
            </Label>
            <div className="col-span-3">
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger id="technician">
                  <SelectValue placeholder="Select a technician" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.length > 0 ? (
                    availableUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name} ({user.role})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No available technicians
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            type="button"
            onClick={handleAddMember}
            disabled={isLoading || !selectedUserId}
          >
            {isLoading ? "Adding..." : "Add to Team"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 