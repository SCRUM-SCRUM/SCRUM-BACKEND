/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // <-- Import Types from Mongoose
import { User, UserDocument } from '../users/user.schema';
import { MailService } from './mail/mail.service';

// 1. Define the MINIMUM required structure for the retrieved user document.
// This is the cleanest way to tell TypeScript: "I know this UserDocument has these fields."
// Note: We are using Omit<T, K> to remove the default, potentially conflicting _id
// and then adding the specific Mongoose ObjectId type for _id.
type ResendVerificationUser = Omit<UserDocument, '_id'> & {
  _id: Types.ObjectId; // Ensures .toString() is valid and safe
  email: string;
  isEmailVerified: boolean;
};

// Define an interface for the request object used in the login method
interface LocalAuthenticatedRequest extends Request {
  user: UserDocument;
}


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
    // 2. Cast the result to the new, safe type.
    const user = (await this.userModel.findOne({ email: body.email }).exec()) as ResendVerificationUser | null;

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    // Now, 'isEmailVerified' is safely accessible
    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified');
    }

    // Now, '_id.toString()' is safe because it's typed as Mongoose ObjectId
    const token = this.jwtService.sign(
      { sub: user._id.toString(), purpose: 'email_verification' },
      { expiresIn: '1d' },
    );

    // Now, 'email' is safely accessible
    //Option A: If mail service is async
    // await this.mailService.sendVerificationEmail(user.email, token);
    //Option B: If mail service is sync
    this.mailService.sendVerificationEmail(user.email, token);

    return { message: 'New verification email sent' };
  }
}