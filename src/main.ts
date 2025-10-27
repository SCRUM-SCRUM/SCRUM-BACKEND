/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// import dotenv from 'dotenv'

// dotenv.config()

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

   const config = new DocumentBuilder()
    .setTitle('Polaris Scrum API')
    .setDescription('API documentation for Polaris Scrum backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api/docs', app, document);

    // Start the application (use the env PORT if present)
  const port = process.env.PORT || 4000; // default 4000
  await app.listen(port, '0.0.0.0');

  // Log success message
  console.log(`Server running at http://localhost:${port}/api`);

}

// Bootstrap safely (handles rejections)
bootstrap().catch((err: unknown) => {
  console.error(' Error during bootstrap:', err);
  process.exit(1);
});
