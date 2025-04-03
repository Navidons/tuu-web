import React, { Suspense } from "react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Calendar,
  Mail,
  Users,
  XCircleIcon,
  ArrowLeftIcon
} from "lucide-react"
import { EditTechnicianDialog } from "@/components/edit-technician-dialog"
import { DeleteTechnicianDialog } from "@/components/delete-technician-dialog"

function TechnicianDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[180px]" />
        <Skeleton className="h-[180px]" />
      </div>
      <Skeleton className="h-[200px]" />
    </div>
  )
}

async function TechnicianDetail({ technicianId }: { technicianId: number }) {
  try {
    // Fetch technician data
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/technicians/${technicianId}`, { 
      cache: 'no-store' 
    });
    
    // Handle 404 or other errors
    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch technician: ${res.statusText}`);
    }
    
    const data = await res.json();
    const technician = data.technician;
    
    // Mock recent assignments (replace with actual data)
    const recentAssignments = [
      { id: 1, title: "HVAC System Maintenance", date: "2023-12-10", status: "Completed" },
      { id: 2, title: "Electrical Panel Inspection", date: "2024-01-05", status: "In Progress" },
      { id: 3, title: "Plumbing System Check", date: "2024-01-15", status: "Scheduled" }
    ];
    
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
    };
    
    const getStatusColor = (status: string) => {
      switch (status) {
        case "Completed": 
          return "bg-green-100 text-green-800";
        case "In Progress": 
          return "bg-blue-100 text-blue-800";
        case "Scheduled": 
          return "bg-indigo-100 text-indigo-800";
        default: 
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <div className="space-y-6">
        {/* Back button */}
        <Link href="/teams/technicians" passHref>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Technicians
          </Button>
        </Link>
        
        {/* Header with technician info */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border border-muted">
              <AvatarFallback className="text-lg">{getInitials(technician.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{technician.name}</h1>
              <div className="flex items-center text-muted-foreground mt-1">
                <Badge variant="outline" className="mr-2">{technician.role || "Technician"}</Badge>
                {technician.team && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <Link href={`/teams/${technician.team.id}`} className="text-sm hover:underline">
                      {technician.team.name}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <EditTechnicianDialog technician={technician} />
            <DeleteTechnicianDialog technician={technician} />
          </div>
        </div>
        
        {/* Contact information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{technician.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent assignments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Assignments</CardTitle>
              <CardDescription>Recent maintenance tasks assigned to this technician</CardDescription>
            </div>
            <Link href={`/maintenance?technician=${technicianId}`} passHref>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentAssignments.length > 0 ? (
              <div className="space-y-4">
                {recentAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <Link href={`/maintenance/details/${assignment.id}`} className="font-medium hover:underline">
                        {assignment.title}
                      </Link>
                      <div className="text-sm text-muted-foreground">
                        {new Date(assignment.date).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No assignments found for this technician
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/maintenance/schedule" passHref>
              <Button variant="outline" className="w-full">
                Assign New Maintenance Task
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <XCircleIcon className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error Loading Technician</h2>
        <p className="text-muted-foreground mb-4">
          Unable to load technician details. The technician may not exist or has been deleted.
        </p>
        <Button asChild>
          <Link href="/teams/technicians">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Technicians
          </Link>
        </Button>
      </div>
    )
  }
}

export default function TechnicianDetailPage({ params }: { params: { id: string } }) {
  const technicianId = parseInt(params.id, 10)

  try {
    return (
      <main className="container max-w-4xl mx-auto py-6 px-4">
        <Suspense fallback={<TechnicianDetailSkeleton />}>
          <TechnicianDetail technicianId={technicianId} />
        </Suspense>
      </main>
    )
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <XCircleIcon className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error Loading Technician</h2>
        <p className="text-muted-foreground mb-4">
          Unable to load technician details. The technician may not exist or has been deleted.
        </p>
        <Button asChild>
          <Link href="/teams/technicians">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Technicians
          </Link>
        </Button>
      </div>
    )
  }
} 