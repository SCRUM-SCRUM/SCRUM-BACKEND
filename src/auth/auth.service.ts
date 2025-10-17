/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/user.schema';
import { RegisterDto } from './dto/register.dto';

type JwtPayload = { sub: string; email?: string; purpose?: string };

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate user credentials for the local strategy.
   * Throws UnauthorizedException on invalid credentials.
   */
  async validateUser(email: string, password: string): Promise<UserDocument> {
    try {
      const user = (await this.userModel.findOne({ email }).exec()) as UserDocument | null;

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // bcrypt.compare returns Promise<boolean>
       
      const isPasswordValid = (await bcrypt.compare(
  String(password),
  String(user.password),
));

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return user;
    } catch (error: unknown) {
      console.error('password error', String(error));
      // Narrow and rethrow as Unauthorized to avoid leaking internal errors
      throw new UnauthorizedException('Invalid credentials String');
    }
  }

  /**
   * Login: sign a JWT and return token + minimal user info
   */
  async login(user: UserDocument) {
    if (!user || !user._id) {
      throw new UnauthorizedException('User not found');
    }

    // ensure we use a string id (avoid base-to-string warning)
    const sub = user._id instanceof Types.ObjectId ? user._id.toHexString() : String('[user._id ??]');

    const payload: JwtPayload = { sub, email: user.email };
    // use async variant - returns Promise<string>
    const access_token: string = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      access_token,
      user: {
        id: sub,
        email: user.email,
        name: user.name,
        isEmailVerified: !!user.isEmailVerified,
      },
    };
  }

  /**
   * Register a new user
   */
  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    const existingUser = (await this.userModel.findOne({ email }).exec()) as UserDocument | null;
    
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

     
    const hashedPassword = (await bcrypt.hash(password, 10))

    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
    });

    await newUser.save();

    return { message: 'User registered successfully' };
  }

  /**
   * Verify email using token (signed JWT)
   */
  async verifyEmail(token: string) {
    try {
      const decodedRaw = (await this.jwtService.verifyAsync(token)) as unknown;

      if (typeof decodedRaw !== 'object' || decodedRaw === null || !('sub' in decodedRaw)) {
        throw new BadRequestException('Invalid token');
      }

      // safe extraction + normalization
      const subRaw = (decodedRaw as { sub: unknown }).sub;
      const sub =
        typeof subRaw === 'string'
          ? subRaw
          : subRaw instanceof Types.ObjectId
          ? subRaw.toHexString()
          : String(subRaw);

      const user = (await this.userModel.findById(sub).exec()) as UserDocument | null;
      if (!user) {
        throw new BadRequestException('Invalid token or user does not exist');
      }

      if (user.isEmailVerified) {
        return { message: 'Email already verified.' };
      }

      user.isEmailVerified = true;
      await user.save();

      return {
        message: 'Email verified successfully.',
        user: {
          id: sub,
          email: user.email,
          name: user.name,
          isEmailVerified: true,
        },
      };
    } catch (error: unknown) {
      //log safely if you want (avoid unsafe-member-access)
      console.error('verifyEmail error', String(error));
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
