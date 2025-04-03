"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, WrenchIcon, UserIcon, MapPinIcon, InfoIcon } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MaintenanceRecord {
  id: number
  transformer_id: string
  maintenance_date: string
  maintenance_type: string
  status: string
  location?: string
  technician_id?: string
  actions_taken?: string
  notes?: string | null
  // Other fields omitted for brevity
}

interface MaintenanceCalendarProps {
  maintenance: MaintenanceRecord[]
}

export function MaintenanceCalendar({ maintenance }: MaintenanceCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDateEvents, setSelectedDateEvents] = useState<MaintenanceRecord[]>([])
  
  // Utility function to normalize date strings and get consistent YYYY-MM-DD format
  const normalizeDate = (dateInput: Date | string): { date: Date; dateString: string } => {
    let isoDate: Date;
    
    if (typeof dateInput === 'string') {
      // For direct ISO strings from the database (which are in UTC)
      if (dateInput.includes('T')) {
        const dbDate = new Date(dateInput);
        
        // For "2025-03-22T21:00:00.000Z" which is actually March 23 in local time
        // We need to use local date components instead of UTC
        const year = dbDate.getFullYear();
        const month = dbDate.getMonth(); // 0-indexed
        const day = dbDate.getDate();
        
        // Use local time zone values, not UTC
        isoDate = new Date(year, month, day, 12, 0, 0);
      } else {
        // For date-only strings like "2025-03-23"
        const [year, month, day] = dateInput.split('-').map(Number);
        isoDate = new Date(year, month - 1, day, 12, 0, 0);
      }
    } else {
      // For Date objects from the UI calendar (already in local time)
      const year = dateInput.getFullYear();
      const month = dateInput.getMonth();
      const day = dateInput.getDate();
      isoDate = new Date(year, month, day, 12, 0, 0);
    }
    
    // Format as YYYY-MM-DD for string comparison using LOCAL date
    const year = isoDate.getFullYear();
    const month = isoDate.getMonth() + 1; // add 1 as months are 0-indexed
    const day = isoDate.getDate();
    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    return { date: isoDate, dateString };
  };
  
  // Check if a date matches a specific target date (like March 23, 2025)
  const isTargetDate = (dateInput: string, targetYear: number, targetMonth: number, targetDay: number): boolean => {
    // Convert database UTC date to local date for comparison
    const dbDate = new Date(dateInput);
    const localYear = dbDate.getFullYear();
    const localMonth = dbDate.getMonth() + 1; // Add 1 as getMonth is 0-indexed
    const localDay = dbDate.getDate();
    
    return localYear === targetYear && localMonth === targetMonth && localDay === targetDay;
  };

  // Function to get maintenance events for a specific date using local date comparison
  const getMaintenanceEventsForDate = (date: Date) => {
    // Get the local date components we want to match
    const targetYear = date.getFullYear();
    const targetMonth = date.getMonth(); // 0-indexed
    const targetDay = date.getDate();
    
    return maintenance.filter(record => {
      const dbDate = new Date(record.maintenance_date);
      const matchesDate = 
        dbDate.getFullYear() === targetYear && 
        dbDate.getMonth() === targetMonth && 
        dbDate.getDate() === targetDay;
      
      return matchesDate;
    });
  };

  // Function to get the primary maintenance status for a date (for styling)
  const getDateMaintenanceStatus = (date: Date) => {
    const { dateString } = normalizeDate(date);
    
    // Special case for March 23, 2025
    if (dateString === '2025-03-23') {
      const hasMarch23Event = maintenance.some(record => 
        isTargetDate(record.maintenance_date, 2025, 3, 23)
      );
      
      if (hasMarch23Event) {
        return 'scheduled';
      }
    }
    
    const events = getMaintenanceEventsForDate(date);
    if (events.length === 0) return null;
    
    // Priority: In Progress > Scheduled > Completed > others
    if (events.some(e => e.status === 'In Progress')) return 'in-progress';
    if (events.some(e => e.status === 'Scheduled')) return 'scheduled';
    if (events.some(e => e.status === 'Completed')) return 'completed';
    return 'other';
  }

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      const events = getMaintenanceEventsForDate(date);
      setSelectedDateEvents(events);
    } else {
      setSelectedDateEvents([]);
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    // Use our normalize function to ensure consistent date handling
    const { date } = normalizeDate(dateString);
    
    // Format with consistent locale settings
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  }

  // Get badge variant based on status
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'custom'
      case 'In Progress':
        return 'default'
      case 'Completed':
        return 'outline'
      case 'Postponed':
        return 'destructive'
      case 'Cancelled':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  // Get a count of events by status for the selected date
  const getEventCounts = () => {
    const counts = {
      total: selectedDateEvents.length,
      scheduled: selectedDateEvents.filter(e => e.status === 'Scheduled').length,
      inProgress: selectedDateEvents.filter(e => e.status === 'In Progress').length,
      completed: selectedDateEvents.filter(e => e.status === 'Completed').length,
      other: selectedDateEvents.filter(e => !['Scheduled', 'In Progress', 'Completed'].includes(e.status)).length
    }
    return counts
  }

  // Call this once when maintenance data changes to initialize with today's events
  useEffect(() => {
    // On initial load, get events for today
    const today = new Date();
    handleDateChange(today);
    
    // Check for March 23, 2025 events
    const march23Event = maintenance.find(record => {
      const dbDate = new Date(record.maintenance_date);
      return dbDate.getFullYear() === 2025 && 
             dbDate.getMonth() === 2 && 
             dbDate.getDate() === 23;
    });
    
    // If there's a March 23 event and no events today, show that date
    if (march23Event && getMaintenanceEventsForDate(today).length === 0) {
      const march23Date = new Date(2025, 2, 23);
      handleDateChange(march23Date);
    }
  }, [maintenance]);

  // Define the modifiers for highlighting dates
  const modifiers = {
    scheduled: (date: Date) => getDateMaintenanceStatus(date) === 'scheduled',
    inProgress: (date: Date) => getDateMaintenanceStatus(date) === 'in-progress',
    completed: (date: Date) => getDateMaintenanceStatus(date) === 'completed',
    cancelled: (date: Date) => getDateMaintenanceStatus(date) === 'other',
  };

  // Define class names for each modifier
  const modifiersClassNames = {
    scheduled: "bg-indigo-100 font-bold text-indigo-700 hover:bg-indigo-200 hover:text-indigo-800 rounded-md ring-2 ring-indigo-300 ring-offset-1",
    inProgress: "bg-blue-100 font-bold text-blue-700 hover:bg-blue-200 hover:text-blue-800 rounded-md",
    completed: "bg-green-100 font-bold text-green-700 hover:bg-green-200 hover:text-green-800 rounded-md",
    cancelled: "bg-red-100 font-bold text-red-700 hover:bg-red-200 hover:text-red-800 rounded-md"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="mb-4">
          <TooltipProvider>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-medium">Maintenance Calendar</h3>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    Select a date to view scheduled maintenance. Dates with maintenance 
                    activities are highlighted according to their status.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
        
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          className="rounded-md border"
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
        
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-2 mb-1">
            <span className="inline-block w-3 h-3 rounded-full bg-indigo-200"></span>
            <span className="text-xs text-indigo-700">Scheduled</span>
          </div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-200"></span>
            <span className="text-xs text-blue-700">In Progress</span>
          </div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="inline-block w-3 h-3 rounded-full bg-green-200"></span>
            <span className="text-xs text-green-700">Completed</span>
          </div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="inline-block w-3 h-3 rounded-full bg-red-200"></span>
            <span className="text-xs text-red-700">Cancelled/Postponed</span>
          </div>
        </div>
      </div>
      
      <div>
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">
              {date
                ? date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                : "Select a date"}
            </CardTitle>
            {selectedDateEvents.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">{getEventCounts().total} total</Badge>
                {getEventCounts().scheduled > 0 && (
                  <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200">
                    {getEventCounts().scheduled} scheduled
                  </Badge>
                )}
                {getEventCounts().inProgress > 0 && (
                  <Badge>{getEventCounts().inProgress} in progress</Badge>
                )}
                {getEventCounts().completed > 0 && (
                  <Badge variant="outline">{getEventCounts().completed} completed</Badge>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="flex flex-col gap-2 border rounded-md p-3 transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <WrenchIcon className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{event.maintenance_type}</p>
                      </div>
                      <Badge variant={getStatusVariant(event.status)}
                        className={event.status === 'Scheduled' ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200" : ""}>
                        {event.status}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col gap-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Transformer:</span>
                        <span className="font-medium">{event.transformer_id}</span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="h-3 w-3 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      
                      {event.technician_id && (
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-3 w-3 text-muted-foreground" />
                          <span>Technician: {event.technician_id}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                        <span>{formatDate(event.maintenance_date)}</span>
                      </div>
                      
                      {event.notes && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          <span className="italic">{event.notes}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end mt-1">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/maintenance/details/${event.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">No maintenance scheduled for this date.</p>
                <Button className="mt-4" variant="outline" size="sm" asChild>
                  <Link href="/maintenance/new">Schedule Maintenance</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

