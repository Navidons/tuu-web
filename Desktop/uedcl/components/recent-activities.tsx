import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle2Icon, AlertCircleIcon, ClockIcon } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "Routine Inspection",
    transformer: "TX-453721",
    location: "Impala Avenue, Kololo",
    technician: "Mark Paul",
    date: "2025-03-15",
    status: "completed",
  },
  {
    id: 2,
    type: "Oil Replacement",
    transformer: "TX-287654",
    location: "Kawempe North",
    technician: "Sarah Nambi",
    date: "2025-03-14",
    status: "completed",
  },
  {
    id: 3,
    type: "Thermal Imaging",
    transformer: "TX-198342",
    location: "Nakasero Road",
    technician: "John Mukasa",
    date: "2025-03-13",
    status: "issue-found",
  },
  {
    id: 4,
    type: "Bushing Inspection",
    transformer: "TX-765432",
    location: "Entebbe Road",
    technician: "David Okello",
    date: "2025-03-12",
    status: "in-progress",
  },
]

export function RecentActivities() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {activity.technician
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{activity.technician}</p>
              <span className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</span>
              {activity.status === "completed" && <CheckCircle2Icon className="h-4 w-4 text-green-500" />}
              {activity.status === "issue-found" && <AlertCircleIcon className="h-4 w-4 text-amber-500" />}
              {activity.status === "in-progress" && <ClockIcon className="h-4 w-4 text-blue-500" />}
            </div>
            <p className="text-sm text-muted-foreground">
              {activity.type} on {activity.transformer}
            </p>
            <p className="text-xs text-muted-foreground">{activity.location}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

