import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { MailService } from './mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      console.log('Found user:', !!user);

      if (!user) return null;

      const passwordMatch = await bcrypt.compare(pass, user.password);
      console.log('Password match:', passwordMatch);

      if (passwordMatch) {

        if (!user.isEmailVerified) {
          throw new BadRequestException('Please verify your email before logging in.');
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }

      return null;
    } catch (error) {
      console.error('validateUser error:', error);
      return null;
    }
  }

  async login(user: any) {
    try {
      console.log('Login user object:', user);

      if (!user?.id || !user?.email) {
        throw new Error('User is missing required properties');
      }

      const payload = { sub: user.id, email: user.email, name: user.name };
      const token = this.jwtService.sign(payload);

      return {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name || 'Unknown',
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(regDetails: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(regDetails.password, 10);

      const user = this.usersRepository.create({
        name: regDetails.name,
        email: regDetails.email,
        password: hashedPassword,
        isEmailVerified: false,
      });

      const savedUser = await this.usersRepository.save(user);

      const token = this.jwtService.sign(
        { sub: savedUser.id, 
          email: savedUser.email,
          purpose: 'email_verification'
        }, 
        { expiresIn: '1d' }
      );

      await this.mailService.sendVerificationEmail(savedUser.email, token);

      return { message: 'User registered. Please verify your email.'};

    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  async verifyEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token);

      const user = await this.usersRepository.findOne({
        where: { id: decoded.sub}
      });
      if (!user) {
        throw new BadRequestException('Invalid token or user does not exist');
      }
      if (user.isEmailVerified) {
        return {message: 'Email already verified.'};
      }

      user.isEmailVerified = true;
      await this.usersRepository.save(user);

      return { message: 'Email verified successfully.'};
    }
    catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
