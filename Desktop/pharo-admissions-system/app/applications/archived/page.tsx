import { ArchivedApplicationsTable } from "@/components/ArchivedApplicationsTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Activity } from "lucide-react";

export default async function ArchivedApplicationsPage() {
  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Activity className="mr-3 h-8 w-8 text-gray-700" />
          Archived Applications
        </h1>
      </div>

      <p className="text-lg text-gray-600 mb-8">Review and manage historical application records.</p>

      <ArchivedApplicationsTable />
    </div>
  );
} 