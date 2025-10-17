/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // ✅ Strongly type the request
    const request = context.switchToHttp().getRequest<Request>();

    // ✅ Explicitly type header as string | undefined
    const apiKey = request.headers['x-api-key'] as string | undefined;
    const validApiKey = this.configService.get<string>('API_KEY');

    // ✅ Return boolean comparison
    return apiKey === validApiKey;
  }
}
