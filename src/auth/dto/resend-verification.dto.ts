/* eslint-disable prettier/prettier */
import { IsEmail } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class ResendVerificationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}