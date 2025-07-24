// admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { FirebaseModule } from '../firebase/firebase.module';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';

@Module({
  imports: [UtilisateursModule, FirebaseModule],
  controllers: [AdminController],
  providers: [FirebaseAuthGuard],
})
export class AdminModule {}
