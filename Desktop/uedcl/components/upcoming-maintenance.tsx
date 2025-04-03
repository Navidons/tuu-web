import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react"

const upcomingTasks = [
  {
    id: 1,
    type: "Routine Inspection",
    transformer: "TX-675432",
    location: "Ntinda Industrial Area",
    technician: "Mark Paul",
    date: "2025-03-22",
    priority: "high",
  },
  {
    id: 2,
    type: "Preventive Maintenance",
    transformer: "TX-123456",
    location: "Kampala Central",
    technician: "Sarah Nambi",
    date: "2025-03-23",
    priority: "medium",
  },
  {
    id: 3,
    type: "Oil Testing",
    transformer: "TX-789012",
    location: "Jinja Road",
    technician: "John Mukasa",
    date: "2025-03-24",
    priority: "low",
  },
  {
    id: 4,
    type: "Thermal Imaging",
    transformer: "TX-345678",
    location: "Namirembe Road",
    technician: "David Okello",
    date: "2025-03-25",
    priority: "high",
  },
]

export function UpcomingMaintenance() {
  return (
    <div className="space-y-4">
      {upcomingTasks.map((task) => (
        <div key={task.id} className="flex flex-col gap-2 rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{task.type}</h4>
            <Badge
              variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}
            >
              {task.priority}
            </Badge>
          </div>
          <p className="text-sm">{task.transformer}</p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              <span>{new Date(task.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon className="h-3 w-3" />
              <span>{task.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <UserIcon className="h-3 w-3" />
              <span>{task.technician}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

