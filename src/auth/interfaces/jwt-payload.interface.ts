export interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
  isManager?: boolean;
}