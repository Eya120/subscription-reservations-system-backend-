// admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';

@Module({
  imports: [UtilisateursModule],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}
