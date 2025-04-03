"use client"

import { useState } from "react"
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
import { Trash } from "lucide-react"
import { toast } from "sonner"

interface Technician {
  id: number
  name: string
}

interface DeleteTechnicianDialogProps {
  technician: Technician
}

export function DeleteTechnicianDialog({ technician }: DeleteTechnicianDialogProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/technicians/${technician.id}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success("Technician deleted successfully")
        setIsOpen(false)
        // Navigate back to the technicians list
        router.push('/teams/technicians')
        router.refresh()
      } else {
        toast.error(data.error || "Failed to delete technician")
      }
    } catch (error) {
      toast.error("An error occurred while deleting the technician")
      console.error("Error deleting technician:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Technician</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {technician.name}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleDelete} 
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Technician"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 