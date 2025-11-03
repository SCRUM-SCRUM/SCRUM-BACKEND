/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The user email address (must be unique)',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'StrongPass123!',
    description: 'The user password (min 8 chars, must be strong)',
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

// Remove RegisterDto to avoid confusion