/* eslint-disable prettier/prettier */
// src/users/dto/create-user.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The user email address (must be unique)',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPass123!',
    description: 'The user password (min 8 chars, must be strong)',
  })
  @IsString()
  @MinLength(8)
  password: string;
}

export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}