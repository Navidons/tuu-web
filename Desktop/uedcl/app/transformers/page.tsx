"use client"

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, SearchIcon, FilterIcon, DownloadIcon, AlertCircle, XIcon, CheckIcon } from "lucide-react"
import { TransformerViewDialog } from "@/components/transformer-view-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Transformer {
  id: number
  serial_number: string
  manufacturer: string
  capacity_kva: number
  manufacturing_date: string
  installation_date: string
  location: string
  gps_coordinates: string
  status: string
  last_maintenance_date: string
  created_at: string
}

export default function TransformersPage() {
  const [transformers, setTransformers] = useState<Transformer[]>([])
  const [filteredTransformers, setFilteredTransformers] = useState<Transformer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [manufacturerFilter, setManufacturerFilter] = useState<string | null>(null)
  const [minCapacity, setMinCapacity] = useState<string>("")
  const [maxCapacity, setMaxCapacity] = useState<string>("")
  const [isFiltering, setIsFiltering] = useState(false)
  
  // Available filter options derived from data
  const [manufacturers, setManufacturers] = useState<string[]>([])
  const [statusOptions] = useState(["Active", "Inactive", "Under Maintenance", "Decommissioned"])

  const [selectedTransformers, setSelectedTransformers] = useState<number[]>([])

  useEffect(() => {
    const fetchTransformers = async () => {
      try {
        const response = await fetch('/api/transformers')
        if (!response.ok) {
          throw new Error('Failed to fetch transformers')
        }
        const data = await response.json()
        setTransformers(data.transformers)
        setFilteredTransformers(data.transformers)
        
        // Extract unique manufacturers for filter
        if (data.transformers && data.transformers.length > 0) {
          const uniqueManufacturers = Array.from(
            new Set(data.transformers.map((t: Transformer) => t.manufacturer))
          ) as string[]
          setManufacturers(uniqueManufacturers)
        }
      } catch (err) {
        console.error('Error fetching transformers:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchTransformers()
  }, [])

  // Apply filters and search
  useEffect(() => {
    if (!transformers.length) return
    
    let filtered = [...transformers]
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        t => 
          t.serial_number.toLowerCase().includes(query) ||
          t.manufacturer.toLowerCase().includes(query) ||
          (t.location && t.location.toLowerCase().includes(query))
      )
    }
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(t => t.status === statusFilter)
    }
    
    // Apply manufacturer filter
    if (manufacturerFilter) {
      filtered = filtered.filter(t => t.manufacturer === manufacturerFilter)
    }
    
    // Apply capacity filters
    if (minCapacity) {
      filtered = filtered.filter(t => t.capacity_kva >= parseFloat(minCapacity))
    }
    
    if (maxCapacity) {
      filtered = filtered.filter(t => t.capacity_kva <= parseFloat(maxCapacity))
    }
    
    setFilteredTransformers(filtered)
    setIsFiltering(!!statusFilter || !!manufacturerFilter || !!minCapacity || !!maxCapacity)
  }, [transformers, searchQuery, statusFilter, manufacturerFilter, minCapacity, maxCapacity])

  const resetFilters = () => {
    setStatusFilter(null)
    setManufacturerFilter(null)
    setMinCapacity("")
    setMaxCapacity("")
  }

  const exportToCSV = (selectedOnly = false) => {
    // Generate CSV from filtered transformers
    const headers = [
      "ID", 
      "Serial Number", 
      "Manufacturer", 
      "Capacity (kVA)", 
      "Location", 
      "Status", 
      "Installation Date", 
      "Last Maintenance"
    ]
    
    const dataToExport = selectedOnly && selectedTransformers.length > 0
      ? filteredTransformers.filter(t => selectedTransformers.includes(t.id))
      : filteredTransformers
    
    const rows = dataToExport.map(t => [
      t.id,
      t.serial_number,
      t.manufacturer,
      t.capacity_kva,
      t.location || '',
      t.status,
      t.installation_date ? new Date(t.installation_date).toLocaleDateString() : 'N/A',
      t.last_maintenance_date ? new Date(t.last_maintenance_date).toLocaleDateString() : 'N/A'
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    const filename = selectedOnly 
      ? `transformers_selected_${new Date().toISOString().slice(0, 10)}.csv`
      : `transformers_export_${new Date().toISOString().slice(0, 10)}.csv`
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleSelectAll = () => {
    if (selectedTransformers.length === filteredTransformers.length) {
      setSelectedTransformers([])
    } else {
      setSelectedTransformers(filteredTransformers.map(t => t.id))
    }
  }

  const toggleTransformerSelection = (id: number) => {
    if (selectedTransformers.includes(id)) {
      setSelectedTransformers(selectedTransformers.filter(tId => tId !== id))
    } else {
      setSelectedTransformers([...selectedTransformers, id])
    }
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Transformer Inventory</h1>
          <Button asChild>
            <Link href="/transformers/add">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Transformer
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Transformer Database</CardTitle>
            <CardDescription>Manage and monitor all transformers in the network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-64">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search transformers..." 
                  className="w-full pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <FilterIcon className="mr-2 h-4 w-4" />
                      Filter {isFiltering && <Badge className="ml-1 px-1">!</Badge>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Filter Transformers</h4>
                        <p className="text-sm text-muted-foreground">
                          Narrow down the transformer list by applying filters
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={statusFilter || "_all"}
                            onValueChange={(value) => setStatusFilter(value === "_all" ? null : value)}
                          >
                            <SelectTrigger className="col-span-2">
                              <SelectValue placeholder="Any status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="_all">Any status</SelectItem>
                              {statusOptions.map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="manufacturer">Manufacturer</Label>
                          <Select
                            value={manufacturerFilter || "_all"}
                            onValueChange={(value) => setManufacturerFilter(value === "_all" ? null : value)}
                          >
                            <SelectTrigger className="col-span-2">
                              <SelectValue placeholder="Any manufacturer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="_all">Any manufacturer</SelectItem>
                              {manufacturers.map(mfr => (
                                <SelectItem key={mfr} value={mfr}>{mfr}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="minCapacity">Min Capacity</Label>
                          <Input
                            id="minCapacity"
                            type="number"
                            placeholder="Min kVA"
                            value={minCapacity}
                            onChange={(e) => setMinCapacity(e.target.value)}
                            className="col-span-2"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="maxCapacity">Max Capacity</Label>
                          <Input
                            id="maxCapacity"
                            type="number"
                            placeholder="Max kVA"
                            value={maxCapacity}
                            onChange={(e) => setMaxCapacity(e.target.value)}
                            className="col-span-2"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button size="sm" variant="outline" onClick={resetFilters}>
                          Reset
                </Button>
                        <Button size="sm">Apply Filters</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="sm" onClick={() => exportToCSV(false)}>
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                {selectedTransformers.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <CheckIcon className="mr-2 h-4 w-4" />
                        {selectedTransformers.length} Selected
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedTransformers([])}>
                        Clear Selection
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => exportToCSV(true)}>
                        Export Selected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
            
            {isFiltering && (
              <div className="bg-muted p-2 rounded-md mb-4 flex items-center justify-between">
                <div className="text-sm">
                  Filtered results: {filteredTransformers.length} of {transformers.length} transformers
                </div>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  <XIcon className="h-4 w-4 mr-1" />
                  Clear Filters
                </Button>
              </div>
            )}
            
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}. Please try refreshing the page.
                </AlertDescription>
              </Alert>
            ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                      <TableHead className="w-10">
                        <Checkbox 
                          checked={
                            filteredTransformers.length > 0 && 
                            selectedTransformers.length === filteredTransformers.length
                          }
                          onCheckedChange={toggleSelectAll}
                          aria-label="Select all"
                        />
                      </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead className="hidden md:table-cell">Serial Number</TableHead>
                      <TableHead className="hidden lg:table-cell">Manufacturer</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Maintenance</TableHead>
                      <TableHead>Installation Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredTransformers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8">
                          {searchQuery || isFiltering ? "No transformers found matching your filters" : "No transformers found"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransformers.map((transformer) => (
                        <TableRow key={transformer.id} className={selectedTransformers.includes(transformer.id) ? "bg-muted/50" : ""}>
                          <TableCell>
                            <Checkbox 
                              checked={selectedTransformers.includes(transformer.id)}
                              onCheckedChange={() => toggleTransformerSelection(transformer.id)}
                              aria-label={`Select transformer ${transformer.id}`}
                            />
                          </TableCell>
                      <TableCell className="font-medium">{transformer.id}</TableCell>
                          <TableCell>{transformer.capacity_kva} kVA</TableCell>
                          <TableCell className="hidden md:table-cell">{transformer.location || "N/A"}</TableCell>
                          <TableCell className="hidden md:table-cell">{transformer.serial_number}</TableCell>
                          <TableCell className="hidden lg:table-cell">{transformer.manufacturer}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                            {transformer.last_maintenance_date ? new Date(transformer.last_maintenance_date).toLocaleDateString() : "N/A"}
                      </TableCell>
                          <TableCell>{transformer.installation_date ? new Date(transformer.installation_date).toLocaleDateString() : "N/A"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                                transformer.status === "Active"
                                ? "default"
                                  : transformer.status === "Under Maintenance"
                                  ? "secondary"
                                    : transformer.status === "Inactive"
                                      ? "destructive"
                                      : "outline"
                          }
                        >
                          {transformer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                              <TransformerViewDialog transformerId={transformer.id.toString()} />
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/transformers/${transformer.id}`}>View</Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                      ))
                    )}
                </TableBody>
              </Table>
            </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

