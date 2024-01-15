import { SetMetadata } from '@nestjs/common';
import { userRole } from '../../modules/auth/domain/user.entity';

/**
 * Roles Decorator.
 * Used to set roles for a route.
 */
export const HasRoles = (...roles: Array<userRole>) =>
  SetMetadata('roles', roles);
