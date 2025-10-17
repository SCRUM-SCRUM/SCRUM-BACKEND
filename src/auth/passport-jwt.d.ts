/* eslint-disable prettier/prettier */
// passport-jwt.d.ts
import { Request } from 'express';

declare module 'passport-jwt' {
  export interface ExtractJwt {
    fromAuthHeaderAsBearerToken(): (req: Request) => string | null;
  }
}