/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  sendVerificationEmail(to: string, token: string) {
    const verifyUrl = `http://localhost:3000/api/auth/verify?token=${token}`;
    
    // Instead of sending email, just log the token
    console.log(`\n🟢 MOCK EMAIL SENT TO: ${to}`);
    console.log(`🔗 Verification link: ${verifyUrl}\n`);
  }
}

