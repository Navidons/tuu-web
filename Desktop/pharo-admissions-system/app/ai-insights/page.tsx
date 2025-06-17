import { PermissionGuard } from "@/components/permission-guard"
import { SmartAnalytics } from "@/components/smart-analytics"
import { PERMISSIONS } from "@/lib/permissions"

export default function AIInsightsPage() {
  return (
    <PermissionGuard permission={PERMISSIONS.VIEW_REPORTS}>
      <SmartAnalytics />
    </PermissionGuard>
  )
}
