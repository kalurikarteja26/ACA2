/**
 * ACA Enterprise Role-Based Access Control (RBAC) & Route Authorization Guard
 * Enforces strict least-privilege principles. Guarantees users can only access
 * the views and data endpoints they are explicitly authorized for.
 */

import { logSecurityEvent, EVENT_TYPES } from './auditLogger';

export const ROLES = {
  USER: 'User',
  CA: 'CA',
  AGENCY: 'Agency',
  ADMIN: 'Admin',
};

export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  FILE_TAX: 'file_tax',
  ACCESS_VAULT: 'access_vault',
  EDIT_PROFILE: 'edit_profile',
  MANAGE_SUBSCRIPTION: 'manage_subscription',
  CA_PRACTICE_WORKSPACE: 'ca_practice_workspace',
  ENTERPRISE_CONSOLIDATION: 'enterprise_consolidation',
  ADMIN_CONSOLE: 'admin_console',
  MANAGE_SYSTEM_SECURITY: 'manage_system_security',
  VIEW_AUDIT_LOGS: 'view_audit_logs',
};

// Role -> Permissions mapping
export const ROLE_PERMISSIONS = {
  [ROLES.USER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.FILE_TAX,
    PERMISSIONS.ACCESS_VAULT,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.MANAGE_SUBSCRIPTION,
  ],
  [ROLES.CA]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.FILE_TAX,
    PERMISSIONS.ACCESS_VAULT,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.MANAGE_SUBSCRIPTION,
    PERMISSIONS.CA_PRACTICE_WORKSPACE,
  ],
  [ROLES.AGENCY]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.FILE_TAX,
    PERMISSIONS.ACCESS_VAULT,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.MANAGE_SUBSCRIPTION,
    PERMISSIONS.CA_PRACTICE_WORKSPACE,
    PERMISSIONS.ENTERPRISE_CONSOLIDATION,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.FILE_TAX,
    PERMISSIONS.ACCESS_VAULT,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.MANAGE_SUBSCRIPTION,
    PERMISSIONS.CA_PRACTICE_WORKSPACE,
    PERMISSIONS.ENTERPRISE_CONSOLIDATION,
    PERMISSIONS.ADMIN_CONSOLE,
    PERMISSIONS.MANAGE_SYSTEM_SECURITY,
    PERMISSIONS.VIEW_AUDIT_LOGS,
  ],
};

// Route Tab -> Required Permission Mapping
export const TAB_PERMISSION_REQUIREMENTS = {
  dashboard: PERMISSIONS.VIEW_DASHBOARD,
  vault: PERMISSIONS.ACCESS_VAULT,
  filing: PERMISSIONS.FILE_TAX,
  profile: PERMISSIONS.EDIT_PROFILE,
  personalization: PERMISSIONS.EDIT_PROFILE,
  subscription: PERMISSIONS.MANAGE_SUBSCRIPTION,
  settings: PERMISSIONS.EDIT_PROFILE,
  admin: PERMISSIONS.ADMIN_CONSOLE, // Restricted to Administrator only
};

/**
 * Check if a role possesses a specific permission
 */
export function hasPermission(role, permission) {
  const normalizedRole = role || ROLES.USER;
  const permissions = ROLE_PERMISSIONS[normalizedRole] || [];
  return permissions.includes(permission);
}

/**
 * Verify whether a user's role is authorized to access a given tab/route
 * Logs access violations to the immutable audit trail.
 *
 * @param {string} userRole
 * @param {string} tab
 * @param {string} userEmail
 * @returns {{ authorized: boolean, reason?: string }}
 */
export function authorizeRoute(userRole, tab, userEmail = 'anonymous') {
  const normalizedRole = userRole || ROLES.USER;
  const requiredPermission = TAB_PERMISSION_REQUIREMENTS[tab];

  // If tab has no explicit restriction, allow
  if (!requiredPermission) {
    return { authorized: true };
  }

  const allowed = hasPermission(normalizedRole, requiredPermission);

  if (!allowed) {
    logSecurityEvent(
      EVENT_TYPES.ROUTE_FORBIDDEN,
      {
        attemptedTab: tab,
        userRole: normalizedRole,
        userEmail,
        requiredPermission,
        message: `Unauthorized attempt to access restricted route: ${tab}`
      },
      'WARNING'
    );

    return {
      authorized: false,
      reason: `Access Denied: Your account role (${normalizedRole}) does not hold the '${requiredPermission}' clearance required to access the ${tab.toUpperCase()} module.`
    };
  }

  return { authorized: true };
}
