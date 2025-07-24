import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatistiquesService } from './statistiques.service';
import { StatistiquesController } from './statistiques.controller';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';
import { Abonnement } from '../abonnements/entities/abonnement.entity';
import { Reservation } from '../reservation/entities/reservations.entity';
import { Paiement } from '../payements/entities/paiement.entity';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { UtilisateursService } from 'src/utilisateurs/utilisateurs.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur, Abonnement, Reservation, Paiement]),FirebaseModule],
  controllers: [StatistiquesController],
  providers: [StatistiquesService,Reflector,UtilisateursService],
})
export class StatistiquesModule {}
