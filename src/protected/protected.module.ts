import { Module } from '@nestjs/common';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';
import { ProtectedController } from './protected.controller';


@Module({
  imports: [
    UtilisateursModule, // IMPORT TRÈS IMPORTANT
   
  ],
  controllers: [ProtectedController],
  providers: [],
})
export class ProtectedModule {}
