/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  BadRequestException,

} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { MailService } from './mail/mail.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

type ResendVerificationUser = Omit<UserDocument, '_id'> & {
  _id: Types.ObjectId;
  email: string;
  isEmailVerified: boolean;
};

interface LocalAuthenticatedRequest extends Request {
  user: UserDocument;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly mailService: MailService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: LocalAuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('verify-email')
  async verifyEmail(@Body('token') bodytoken: string) {
    const token = bodytoken
    if (!token) {
      throw new BadRequestException('Token is required');
    }
    return this.authService.verifyEmail(token);
  }

  @Post('resend-verification')
  async resendVerification(@Body() body: ResendVerificationDto) {
    const user = (await this.userModel.findOne({ email: body.email }).exec()) as ResendVerificationUser | null;

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified');
    }

    const token = this.jwtService.sign(
      { sub: user._id.toString(), purpose: 'email_verification' },
      { expiresIn: '1d' },
    );

    this.mailService.sendVerificationEmail(user.email, token);

    return { message: 'New verification email sent' };
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request a password reset email' })
  @ApiBody({ type: ForgotPasswordDto })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return await this.authService.resetPassword(dto.token, dto.newPassword);
  }
}
 