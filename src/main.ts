import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // Tu peux adapter selon ton besoin
  });



  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Reservation API')
    .setDescription('API de gestion des réservations et utilisateurs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);



  // Préfixe global
  app.setGlobalPrefix('api');

  // Validation des DTO
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // supprime les champs non attendus
      forbidNonWhitelisted: true, // refuse les champs inconnus
    }),
  );

  app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
}));
  // ⚠️ SUPPRIMÉ : app.useGlobalFilters(); (inutile ici si pas de filtre global défini)

  // Lancer le serveur
  await app.listen(3000);
}

bootstrap();
