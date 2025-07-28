import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Redirect unauthenticated access to dashboard
  app.use('/dashboard', (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.redirect('/auth/login?redirect=/dashboard');
    }
    next();
  });

  await app.listen(3000);
}
bootstrap();
