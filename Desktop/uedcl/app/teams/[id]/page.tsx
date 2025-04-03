import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeftIcon, 
  UserPlusIcon, 
  PencilIcon, 
  TrashIcon, 
  UsersIcon,
  XCircleIcon
} from "lucide-react"
import { EditTeamDialog } from "@/components/edit-team-dialog"
import { DeleteTeamDialog } from "@/components/delete-team-dialog"
import { AddTeamMemberDialog } from "@/components/add-team-member-dialog"

function TeamDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start gap-4 border-b pb-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

async function TeamDetail({ teamId }: { teamId: string }) {
  try {
    // Fetch team details
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/teams/${teamId}`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      return (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <XCircleIcon className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error Loading Team</h2>
          <p className="text-muted-foreground mb-4">
            Unable to load team details. The team may not exist or has been deleted.
          </p>
          <Button asChild>
            <Link href="/teams">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Teams
            </Link>
          </Button>
        </div>
      )
    }
    
    const data = await res.json()
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch team')
    }
    
    const team = data.team

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold">{team.name}</h2>
            <p className="text-muted-foreground">{team.specialization || team.region || "No specialization"}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/teams">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <EditTeamDialog team={team} />
            <DeleteTeamDialog team={team} />
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Team Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Team ID:</span>
                  <span>{team.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Team Lead:</span>
                  <span>{team.supervisor_name || "Not assigned"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Region:</span>
                  <span>{team.region || "Not specified"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Specialization:</span>
                  <span>{team.specialization || "Not specified"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Created:</span>
                  <span>{new Date(team.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Members:</span>
                  <span>{team.members?.length || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Team Members</CardTitle>
              <AddTeamMemberDialog teamId={team.id} />
            </CardHeader>
            <CardContent>
              {team.members && team.members.length > 0 ? (
                <div className="space-y-4">
                  {team.members.map((member: any) => (
                    <div key={member.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                      <Avatar>
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{member.name}</h4>
                          <Badge 
                            variant={member.role === "Supervisor" ? "default" : "outline"}
                            className="text-xs">
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Joined: {new Date(member.joined_date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/teams/technicians/${member.id}`}>
                          <PencilIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <UsersIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No team members</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add technicians to this team using the "Add Member" button.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching team:", error);
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <XCircleIcon className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error Loading Team</h2>
        <p className="text-muted-foreground mb-4">
          Unable to load team details. The team may not exist or has been deleted.
        </p>
        <Button asChild>
          <Link href="/teams">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Teams
          </Link>
        </Button>
      </div>
    );
  }
}

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-6">
      <Suspense fallback={<TeamDetailSkeleton />}>
        <TeamDetail teamId={params.id} />
      </Suspense>
    </div>
  )
} 