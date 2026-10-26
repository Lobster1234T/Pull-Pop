export type Role = 'admin' | 'user' | 'moderator' | 'guest';
export type Permission = 
  | 'view_products'
  | 'create_order'
  | 'view_orders'
  | 'create_review'
  | 'manage_products'
  | 'manage_users'
  | 'manage_orders'
  | 'view_analytics'
  | 'manage_payments';

// Определение ролей и их привилегий
const rolePermissions: { [key in Role]: Permission[] } = {
  admin: [
    'view_products',
    'create_order',
    'view_orders',
    'create_review',
    'manage_products',
    'manage_users',
    'manage_orders',
    'view_analytics',
    'manage_payments',
  ],
  moderator: [
    'view_products',
    'create_order',
    'view_orders',
    'create_review',
    'manage_orders',
    'view_analytics',
  ],
  user: [
    'view_products',
    'create_order',
    'view_orders',
    'create_review',
  ],
  guest: [
    'view_products',
  ],
};

// Проверить, имеет ли роль определённое разрешение
export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) || false;
}

// Проверить, имеет ли роль хотя бы одно из разрешений
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

// Проверить, имеет ли роль все разрешения
export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

// Получить все разрешения для роли
export function getPermissions(role: Role): Permission[] {
  return rolePermissions[role] || [];
}

// Получить роли с определённым разрешением
export function getRolesWithPermission(permission: Permission): Role[] {
  return Object.entries(rolePermissions)
    .filter(([_, permissions]) => permissions.includes(permission))
    .map(([role]) => role as Role);
}

// Middleware для проверки разрешений
export function checkPermission(userRole: Role, requiredPermission: Permission): boolean {
  return hasPermission(userRole, requiredPermission);
}
