import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  PlusIcon, 
  UsersIcon, 
  UserIcon,
  UserPlusIcon, 
  RefreshCwIcon,
  LoaderIcon,
  XCircleIcon
} from "lucide-react"
import { TeamViewDialog } from "@/components/team-view-dialog"
import { CreateTeamDialog } from "@/components/create-team-dialog"
import { CreateTechnicianDialog } from "@/components/create-technician-dialog"

// Teams and technicians data fetcher component
function TeamsData({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-6">
      {children}
    </div>
  )
}

// Loading skeleton for teams
function TeamsLoadingSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-5/6 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-9 w-[47%]" />
                <Skeleton className="h-9 w-[47%]" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Loading skeleton for technicians
function TechniciansLoadingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start space-x-4 rounded-lg border p-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-8 w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Teams component
async function TeamsView() {
  try {
    // Fetch teams from API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/teams`, { 
      cache: 'no-store' 
    })
    const data = await res.json()
    const teams = data.success ? data.teams : []

    if (!teams.length) {
      return (
        <Card className="mt-6">
          <CardContent className="pt-6 text-center">
            <XCircleIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-3 text-lg font-medium">No Teams Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No teams have been created yet. Create your first team to get started.
            </p>
            <div className="mt-6">
              <CreateTeamDialog />
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="grid gap-6 md:grid-cols-3">
        {teams.map((team: any) => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                {team.name}
              </CardTitle>
              <CardDescription>{team.specialization || team.region || 'No specialization defined'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Team Lead:</span>
                  <span className="text-sm">{team.supervisor_name || 'Not assigned'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Members:</span>
                  <span className="text-sm">{team.members_count || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Region:</span>
                  <span className="text-sm">{team.region || 'Not specified'}</span>
                </div>
                {/* We could add task completion metrics in the future */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Team Utilization</span>
                    <span>
                      {team.members_count ? '100%' : '0%'}
                    </span>
                  </div>
                  <Progress value={team.members_count ? 100 : 0} />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" className="w-1/2" asChild>
                    <Link href={`/teams/${team.id}`}>Manage</Link>
                  </Button>
                  <TeamViewDialog teamId={team.id} teamName={team.name} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error fetching teams:", error);
    return (
      <Card className="mt-6">
        <CardContent className="pt-6 text-center">
          <XCircleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-3 text-lg font-medium">Error Loading Teams</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            There was an error loading the teams. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }
}

// Technicians component
async function TechniciansView() {
  try {
    // Fetch technicians from API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/technicians`, { 
      cache: 'no-store'
    })
    const data = await res.json()
    const technicians = data.success ? data.technicians : []

    if (!technicians.length) {
      return (
        <Card>
          <CardContent className="pt-6 text-center">
            <XCircleIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-3 text-lg font-medium">No Technicians Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No technicians have been added yet. Add your first technician to get started.
            </p>
            <div className="mt-6">
              <CreateTechnicianDialog />
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Technicians</CardTitle>
          <CardDescription>View and manage technician assignments and availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {technicians.map((technician: any) => (
              <div key={technician.id} className="flex items-start space-x-4 rounded-lg border p-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {technician.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium">{technician.name}</h4>
                    <p className="text-sm text-muted-foreground">{technician.role}</p>
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Team:</span>
                      <span>{technician.team_name || 'Not assigned'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span className="truncate">{technician.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Joined Team:</span>
                      <span>{technician.joined_date ? new Date(technician.joined_date).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge
                      variant={technician.team_id ? "default" : "outline"}
                    >
                      {technician.team_id ? 'Assigned' : 'Available'}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      asChild
                    >
                      <Link href={`/teams/technicians/${technician.id}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error("Error fetching technicians:", error);
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <XCircleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-3 text-lg font-medium">Error Loading Technicians</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            There was an error loading the technicians. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }
}

export default function TeamsPage() {
  return (
    <TeamsData>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Teams & Technicians</h1>
          <div className="flex gap-2">
            <CreateTechnicianDialog />
            <CreateTeamDialog />
          </div>
        </div>

        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="teams">
              <UsersIcon className="mr-2 h-4 w-4" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="technicians">
              <UserIcon className="mr-2 h-4 w-4" />
              Technicians
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="teams" className="pt-2">
            <Suspense fallback={<TeamsLoadingSkeleton />}>
              <TeamsView />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="technicians" className="pt-2">
            <Suspense fallback={<TechniciansLoadingSkeleton />}>
              <TechniciansView />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </TeamsData>
  )
}

