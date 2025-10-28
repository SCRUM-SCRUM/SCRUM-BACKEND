/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
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

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(String(password), String(user.password));
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: UserDocument) {
    if (!user || !user._id) throw new UnauthorizedException('User not found');

    const sub = user._id instanceof Types.ObjectId ? user._id.toHexString() : String(user._id);

    const payload: JwtPayload = { sub, email: user.email };
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

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
    });

    await newUser.save();
    return { message: 'User registered successfully' };
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new BadRequestException('No account found with this email');

    const token = await this.jwtService.signAsync(
      { sub: user._id, email: user.email },
      { expiresIn: '15m' },
    );

    // TODO: send email with token link
    return {
      message: 'Password reset link has been sent to your email',
      token, // remove later
    };
  }

  async resetPassword(token: string, newPassword: string) {
    let decoded;
    try {
      decoded = await this.jwtService.verifyAsync(token);
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }

    const user = await this.userModel.findById(decoded.sub).exec();
    if (!user) throw new BadRequestException('User not found');

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return { message: 'Password reset successfully' };
  }

  async verifyEmail(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      const user = await this.userModel.findById(decoded.sub).exec();

      if (!user) throw new BadRequestException('Invalid token or user does not exist');
      if (user.isEmailVerified) return { message: 'Email already verified' };

      user.isEmailVerified = true;
      await user.save();

      return { message: 'Email verified successfully' };
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
