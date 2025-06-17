import { PermissionGuard } from "@/components/permission-guard"
import { AuditLogViewer } from "@/components/audit-log-viewer"
import { PERMISSIONS } from "@/lib/permissions"

export default function AuditPage() {
  return (
    <PermissionGuard permission={PERMISSIONS.VIEW_AUDIT_LOGS}>
      <AuditLogViewer />
    </PermissionGuard>
  )
}
