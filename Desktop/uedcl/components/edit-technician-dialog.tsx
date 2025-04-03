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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PencilIcon } from "lucide-react"
import { toast } from "sonner"

interface Team {
  id: number
  name: string
}

interface Technician {
  id: number
  name: string
  email: string
  team?: Team | null
}

interface EditTechnicianDialogProps {
  technician: Technician
}

export function EditTechnicianDialog({ technician }: EditTechnicianDialogProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [teams, setTeams] = useState<Team[]>([])
  const [formData, setFormData] = useState({
    name: technician.name,
    email: technician.email,
    team_id: technician.team?.id?.toString() || "none",
  })

  useEffect(() => {
    // Update form data when technician changes
    setFormData({
      name: technician.name,
      email: technician.email,
      team_id: technician.team?.id?.toString() || "none",
    })
  }, [technician])

  useEffect(() => {
    // Fetch teams when dialog opens
    if (isOpen) {
      fetchTeams()
    }
  }, [isOpen])

  const fetchTeams = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/teams`)
      const data = await response.json()
      
      if (data.success) {
        setTeams(data.teams || [])
      } else {
        console.error("Failed to fetch teams:", data.error)
      }
    } catch (error) {
      console.error("Error fetching teams:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTeamChange = (value: string) => {
    setFormData((prev) => ({ ...prev, team_id: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Name and email are required")
      return
    }
    
    setIsLoading(true)
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/technicians/${technician.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          team_id: formData.team_id === "none" ? null : (formData.team_id ? parseInt(formData.team_id) : null),
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success("Technician updated successfully")
        setIsOpen(false)
        router.refresh()
      } else {
        toast.error(data.error || "Failed to update technician")
      }
    } catch (error) {
      toast.error("An error occurred while updating the technician")
      console.error("Error updating technician:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Technician</DialogTitle>
            <DialogDescription>
              Make changes to the technician information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name*
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email*
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="col-span-3"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team" className="text-right">
                Team
              </Label>
              <div className="col-span-3">
                <Select value={formData.team_id} onValueChange={handleTeamChange}>
                  <SelectTrigger id="team">
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id.toString()}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 