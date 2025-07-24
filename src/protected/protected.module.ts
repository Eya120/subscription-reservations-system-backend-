import { Module } from '@nestjs/common';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { ProtectedController } from './protected.controller';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Module({
  imports: [
    UtilisateursModule, // IMPORT TRÈS IMPORTANT
    FirebaseModule,
  ],
  controllers: [ProtectedController],
  providers: [FirebaseAuthGuard],
})
export class ProtectedModule {}
