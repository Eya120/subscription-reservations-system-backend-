import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/roles/role.enum'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const utilisateurService = app.get(UtilisateursService);

  const hashedPassword = await bcrypt.hash('eyaeya12345', 10);

  await utilisateurService.create({
    nom: 'bouzid',
    prenom: 'eyaeya',
    email: 'bouzid.eya20@gmail.com',
    password: 'eyaeya12345',
    role: Role.ADMIN
  });

  console.log('Admin créé avec succès.', Role.ADMIN);
  await app.close();
}
bootstrap();
