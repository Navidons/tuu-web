"use client"

import { type Tables } from "@/types/supabase";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Search, Filter, SortAsc, SortDesc, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "./ui/badge";

type ArchivedApplication = Tables<'archived_applications'> & {
  archived_by_user?: {
    email: string;
  } | null;
};

export function ArchivedApplicationsTable() {
  const [archivedApplications, setArchivedApplications] = useState<ArchivedApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reasonFilter, setReasonFilter] = useState("all");
  const [sortBy, setSortBy] = useState("archived_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchArchivedApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (reasonFilter !== "all") params.append("reason", reasonFilter);
      params.append("sortBy", sortBy);
      params.append("sortOrder", sortOrder);

      const response = await axios.get(`/api/applications/archived?${params.toString()}`);
      setArchivedApplications(response.data);
    } catch (err) {
      console.error("Error fetching archived applications:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedApplications();
  }, [searchQuery, statusFilter, reasonFilter, sortBy, sortOrder]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setReasonFilter("all");
    setSortBy("archived_at");
    setSortOrder("desc");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "deferred":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <Card className="mb-6 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Filter & Sort Archived Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Search className="text-gray-500" size={20} />
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow border-gray-300 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-500" size={20} />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="flex-grow">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="deferred">Deferred</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-500" size={20} />
              <Select value={reasonFilter} onValueChange={setReasonFilter}>
                <SelectTrigger className="flex-grow">
                  <SelectValue placeholder="Filter by reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reasons</SelectItem>
                  <SelectItem value="duplicate">Duplicate</SelectItem>
                  <SelectItem value="incomplete">Incomplete</SelectItem>
                  <SelectItem value="irrelevant">Irrelevant</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <SortAsc className="text-gray-500" size={20} />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-grow">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="archived_at">Archived Date</SelectItem>
                  <SelectItem value="full_name">Full Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="ml-2"
              >
                {sortOrder === "asc" ? <SortAsc /> : <SortDesc />}
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleResetFilters} variant="outline" className="text-gray-600 hover:text-gray-900">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Archived Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8 text-gray-500">Loading archived applications...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-8">Error: {error}</p>
          ) : archivedApplications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No archived applications found.</p>
              <p className="text-sm text-gray-400 mt-2">Start by archiving an application from the main list.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Original ID</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Archived At</TableHead>
                    <TableHead>Archived By</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archivedApplications.map((app) => (
                    <TableRow key={app.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium">{app.original_application_id}</TableCell>
                      <TableCell>{app.full_name}</TableCell>
                      <TableCell>{app.email}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(app.status || "")}>
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {app.archived_at
                          ? format(new Date(app.archived_at), "PPPpp")
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {app.archived_by_user?.email || "System"}
                      </TableCell>
                      <TableCell>{app.archived_reason || "No reason provided"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <Separator className="my-4" />
        </CardContent>
      </Card>
    </div>
  );
} 