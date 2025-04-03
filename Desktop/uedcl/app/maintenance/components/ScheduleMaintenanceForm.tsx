'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { useMaintenance } from '../context/MaintenanceContext'

interface ScheduleMaintenanceFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ScheduleMaintenanceForm({ isOpen, onClose }: ScheduleMaintenanceFormProps) {
  const { addMaintenanceRecord } = useMaintenance()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    transformer_id: '',
    maintenance_date: '',
    maintenance_type: '',
    technician_id: '',
    actions_taken: '',
    parts_replaced: '',
    oil_changed: false,
    oil_quantity_added: '',
    duration_hours: '',
    next_maintenance_date: '',
    status: 'Scheduled',
    notes: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to schedule maintenance')
      }

      addMaintenanceRecord(data.data)
      toast.success('Maintenance scheduled successfully')
      onClose()
    } catch (error) {
      console.error('Error scheduling maintenance:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to schedule maintenance')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSelectChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Maintenance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="transformer_id">Transformer</Label>
              <Select
                value={formData.transformer_id}
                onValueChange={(value) => handleSelectChange('transformer_id', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select transformer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TR001">TR001 - Location 1</SelectItem>
                  <SelectItem value="TR002">TR002 - Location 2</SelectItem>
                  <SelectItem value="TR003">TR003 - Location 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenance_date">Maintenance Date</Label>
              <Input
                id="maintenance_date"
                name="maintenance_date"
                type="datetime-local"
                value={formData.maintenance_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenance_type">Maintenance Type</Label>
              <Select
                value={formData.maintenance_type}
                onValueChange={(value) => {
                  console.log('Selected maintenance type:', value);
                  handleSelectChange('maintenance_type', value);
                }}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select maintenance type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Preventive">Preventive Maintenance</SelectItem>
                  <SelectItem value="Corrective">Corrective Maintenance</SelectItem>
                  <SelectItem value="Emergency">Emergency Maintenance</SelectItem>
                  <SelectItem value="Routine">Routine Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technician_id">Technician</Label>
              <Select
                value={formData.technician_id}
                onValueChange={(value) => handleSelectChange('technician_id', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">John Doe</SelectItem>
                  <SelectItem value="2">Jane Smith</SelectItem>
                  <SelectItem value="3">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="actions_taken">Actions Taken</Label>
              <Textarea
                id="actions_taken"
                name="actions_taken"
                value={formData.actions_taken}
                onChange={handleChange}
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parts_replaced">Parts Replaced</Label>
              <Input
                id="parts_replaced"
                name="parts_replaced"
                value={formData.parts_replaced}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="oil_quantity_added">Oil Quantity Added (L)</Label>
              <Input
                id="oil_quantity_added"
                name="oil_quantity_added"
                type="number"
                value={formData.oil_quantity_added}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration_hours">Duration (hours)</Label>
              <Input
                id="duration_hours"
                name="duration_hours"
                type="number"
                value={formData.duration_hours}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="next_maintenance_date">Next Maintenance Date</Label>
              <Input
                id="next_maintenance_date"
                name="next_maintenance_date"
                type="datetime-local"
                value={formData.next_maintenance_date}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="oil_changed"
                name="oil_changed"
                checked={formData.oil_changed}
                onCheckedChange={(checked) => handleSelectChange('oil_changed', checked)}
              />
              <Label htmlFor="oil_changed">Oil Changed</Label>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Scheduling...' : 'Schedule Maintenance'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 