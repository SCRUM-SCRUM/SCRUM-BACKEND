import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      console.log('Found user:', !!user);
      
      if (!user) {
        return null;
      }
      
      const passwordMatch = await bcrypt.compare(pass, user.password);
      console.log('Password match:', passwordMatch);
      
      if (passwordMatch) {
        console.log('Login successful');
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  async login(user: any) {
    try {
      console.log('Login user object:', user);
      
      if (!user) {
        throw new Error('User object is null or undefined');
      }
      
      if (!user.id) {
        throw new Error('User ID is missing');
      }
      
      if (!user.email) {
        throw new Error('User email is missing');
      }
      
      if (!user.role) {
        throw new Error('User role is missing');
      }
      
      return {
        id: user.id,
        email: user.email,
        name: user.name || 'Unknown',
        role: user.role
      };
    } catch (error) {
      throw error;
    }
  }

  async register(name: string, email: string, password: string, role: any) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      return this.usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }
}