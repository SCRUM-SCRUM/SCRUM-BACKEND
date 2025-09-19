import { 
  Controller, 
  Post, 
  Body, 
  Request, 
  UseGuards, 
  Get, 
  Query, 
  BadRequestException,
  Inject 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { MailService } from './mail/mail.service'; 
import { MeetingResponseDto } from '@/dashboard/dto/meeting-response.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService, 
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, 
    private readonly mailService: MailService 
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    if (!token) {
      throw new BadRequestException('Token is required');
    }
    return this.authService.verifyEmail(token);
  }

  @Post('resend-verification')
  async resendVerification(@Body() body: ResendVerificationDto) {
    const user = await this.usersRepository.findOne({ 
      where: { email: body.email } 
    });

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified');
    }

    const token = this.jwtService.sign(
      { sub: user.id, purpose: 'email_verification' },
      { expiresIn: '1d' }
    );

    await this.mailService.sendVerificationEmail(user.email, token);
    
    return { message: 'New verification email sent' };
  }
}