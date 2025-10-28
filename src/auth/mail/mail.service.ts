/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  sendVerificationEmail(to: string, token: string) {
    // const verifyUrl = `http://localhost:4000/api/auth/verify?token=${token}`;
    const verifyUrl = `http://localhost:5173/verify-email?token=${token}`;
    
    // Instead of sending email, just log the token
    console.log(`\n🟢 MOCK EMAIL SENT TO: ${to}`);
    console.log(`🔗 Verification link: ${verifyUrl}\n`);
    console.log(`📝 Token (for manual testing): ${token}`);
    console.log(`💡 User will be directed to frontend, which will call your POST endpoint\n`);
  }
}

