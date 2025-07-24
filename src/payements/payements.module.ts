import { Module } from '@nestjs/common';
import { PaiementsService } from './payements.service';
import { PaymentsController } from './payements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paiement } from './entities/paiement.entity';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';
import { Abonnement } from '../abonnements/entities/abonnement.entity';
import { StripeService } from './stripe.service'

@Module({
  imports: [TypeOrmModule.forFeature([Paiement, Utilisateur, Abonnement])],
  controllers: [PaymentsController],
  providers: [PaiementsService,StripeService],
})
export class PayementsModule {}
