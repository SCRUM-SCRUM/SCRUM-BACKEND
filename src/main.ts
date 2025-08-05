import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // Strip properties not in DTO
      forbidNonWhitelisted: false,
      transform: true // Automatically transform payloads to DTO instances
    }
  ));

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
