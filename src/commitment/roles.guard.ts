/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Request } from 'express';

interface AuthenticatedUser {
  id: string;
  roles: string[];
}

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    this.logger.debug(`Required roles: ${JSON.stringify(required)}`);

    if (!required || required.length === 0) {
      this.logger.debug('No roles required, allowing access');
      return true;
    }

    const req = context.switchToHttp().getRequest<Request & { user?: AuthenticatedUser }>();
    const user = req.user;

    this.logger.debug(`User object: ${JSON.stringify(user)}`);
    this.logger.debug(`User roles: ${JSON.stringify(user?.roles)}`);

    if (!user) {
      this.logger.error('No user found in request');
      return false;
    }

    if (!Array.isArray(user.roles)) {
      this.logger.error(`User roles is not an array: ${typeof user.roles}`);
      return false;
    }

    const hasRole = required.some((role) => user.roles.includes(role));
    
    this.logger.debug(`User has required role: ${hasRole}`);
    
    return hasRole;
  }
}