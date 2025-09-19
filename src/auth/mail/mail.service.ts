import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendVerificationEmail(to: string, token: string) {
<<<<<<< HEAD
    const verifyUrl = `http://localhost:3000/auth/verify?token=${token}`;
=======
    const verifyUrl = `http://localhost:3000/api/auth/verify?token=${token}`;
>>>>>>> master
    
    // Instead of sending email, just log the token
    console.log(`\n🟢 MOCK EMAIL SENT TO: ${to}`);
    console.log(`🔗 Verification link: ${verifyUrl}\n`);
  }
}
