/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Request } from 'express';

interface AuthenticatedUser {
  id: string;
  roles: string[];
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!required || required.length === 0) return true;

    // ✅ Strongly type the request
    const req = context.switchToHttp().getRequest<Request & { user?: AuthenticatedUser }>();

    const user = req.user;
    if (!user || !Array.isArray(user.roles)) return false;

    return required.some((role) => user.roles.includes(role));
  }
}
