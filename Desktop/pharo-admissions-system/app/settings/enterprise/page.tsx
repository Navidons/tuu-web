import { EnterpriseSettingsPanel } from "@/components/enterprise-settings-panel"
import { UserManagementPanel } from "@/components/user-management-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Users } from "lucide-react"

export default function EnterpriseSettingsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            User Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <EnterpriseSettingsPanel />
        </TabsContent>

        <TabsContent value="users">
          <UserManagementPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
