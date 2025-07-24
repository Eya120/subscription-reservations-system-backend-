import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abonnement } from './entities/abonnement.entity';
import { AbonnementService } from './abonnements.service';
import { AbonnementController } from './abonnements.controller';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';
import { TypeAbonnement } from 'src/parametrage/entities/type-abonnement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Abonnement, Utilisateur, TypeAbonnement])],
  controllers: [AbonnementController],
  providers: [AbonnementService],
})
export class AbonnementModule {}
