import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * RolesGuard
 * Used to check if the user has the required roles to access a route.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * RolesGuard constructor.
   * @param reflector The reflector service.
   */
  constructor(private reflector: Reflector) {}

  /**
   * Set the roles for the route.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Array<'ADMIN' | 'CASHIER'>>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    console.log(roles);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log(user);

    return roles.findIndex((value) => value == user.role) > -1;
  }
}
