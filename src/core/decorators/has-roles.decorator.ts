import { SetMetadata } from '@nestjs/common';

/**
 * Roles Decorator.
 * Used to set roles for a route.
 */
export const HasRoles = (...roles: Array<'ADMIN' | 'CASHIER'>) =>
  SetMetadata('roles', roles);
