export const PERMISSIONS = {
  // Application permissions
  VIEW_APPLICATIONS: "view_applications",
  CREATE_APPLICATIONS: "create_applications",
  EDIT_APPLICATIONS: "edit_applications",
  DELETE_APPLICATIONS: "delete_applications",
  APPROVE_APPLICATIONS: "approve_applications",
  ASSIGN_APPLICATIONS: "assign_applications",

  // Student permissions
  VIEW_STUDENTS: "view_students",
  MANAGE_STUDENTS: "manage_students",
  EXPORT_STUDENTS: "export_students",

  // User management permissions
  VIEW_USERS: "view_users",
  MANAGE_USERS: "manage_users",
  ASSIGN_ROLES: "assign_roles",

  // System permissions
  VIEW_REPORTS: "view_reports",
  MANAGE_SETTINGS: "manage_settings",
  VIEW_AUDIT_LOGS: "view_audit_logs",
  MANAGE_TEMPLATES: "manage_templates",

  // Bulk operations
  BULK_OPERATIONS: "bulk_operations",
  BULK_EMAIL: "bulk_email",
  BULK_EXPORT: "bulk_export",
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: Object.values(PERMISSIONS),
  principal: [
    PERMISSIONS.VIEW_APPLICATIONS,
    PERMISSIONS.EDIT_APPLICATIONS,
    PERMISSIONS.APPROVE_APPLICATIONS,
    PERMISSIONS.ASSIGN_APPLICATIONS,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.MANAGE_STUDENTS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.BULK_OPERATIONS,
    PERMISSIONS.BULK_EMAIL,
    PERMISSIONS.EXPORT_STUDENTS,
  ],
  clerk: [
    PERMISSIONS.VIEW_APPLICATIONS,
    PERMISSIONS.CREATE_APPLICATIONS,
    PERMISSIONS.EDIT_APPLICATIONS,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.EXPORT_STUDENTS,
  ],
  viewer: [PERMISSIONS.VIEW_APPLICATIONS, PERMISSIONS.VIEW_STUDENTS, PERMISSIONS.VIEW_REPORTS],
}

export function hasPermission(userRole: string, permission: Permission): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || []
  return rolePermissions.includes(permission)
}

export function requirePermission(userRole: string, permission: Permission): void {
  if (!hasPermission(userRole, permission)) {
    throw new Error(`Access denied. Required permission: ${permission}`)
  }
}
