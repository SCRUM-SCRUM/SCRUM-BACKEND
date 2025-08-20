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

  app.enableCors({
    origin: 'http://localhost:5173', 
    credentials: true,
  });

  app.use('/dashboard', (req, res, next) => {
    // if (!req.isAuthenticated || !req.isAuthenticated()) {
    //   return res.redirect('/auth/login?redirect=/dashboard');
    // }
    next();
  });
//  app.use('/dashboard', (req, res, next) => {
//     if (!req.isAuthenticated || !req.isAuthenticated()) {
//       return res.redirect('/dashboard');
//     }
//     next();
//   });
  await app.listen(3000);
}
bootstrap();
