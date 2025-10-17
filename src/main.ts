/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap(): Promise<void> {
  // Create the Nest app
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Enable validation across all routes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not in DTO
      forbidNonWhitelisted: false, // Allow extra properties silently
      transform: true, // Automatically transform payloads to DTOs
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5173'], // Frontend origin
    credentials: true,
  });

  // Simple route middleware (placeholder)
  app.use('/dashboard', (req: unknown, res: any, next: () => void) => {
    // Uncomment when auth is added:
    // if (!req.isAuthenticated || !req.isAuthenticated()) {
    //   return res.redirect('/auth/login?redirect=/dashboard');
    // }
    next();
  });

 app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  });

   app.useWebSocketAdapter(new IoAdapter(app));

  // Start the application
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(4000, '0.0.0.0');

  // Log success message
  console.log(`Server running at http://localhost:${port}/api`);
}

// Bootstrap safely (handles rejections)
bootstrap().catch((err: unknown) => {
  console.error(' Error during bootstrap:', err);
  process.exit(1);
});
