// src/parametrage/parametrage.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periode } from './entities/periode.entity';
import { RegleTarification } from './entities/regle-tarification.entity';
import { TypeAbonnement } from './entities/type-abonnement.entity';
import { PeriodeService } from './services/periode.service';
import { RegleTarificationService } from './services/regle-tarification.service';
import { PeriodeController } from './controllers/periode.controller';
import { RegleTarificationController } from './controllers/regle-tarification.controller';
import { HoraireOuverture } from './entities/horaire-ouverture.entity';
import { HoraireOuvertureService } from './services/horaire-ouverture.service';
import { HoraireOuvertureController } from './controllers/horaire-ouverture.controller';
import { TypeAbonnementController } from './controllers/type-abonnement.controller';
import { TypeAbonnementService } from './services/type-abonnement.service';

@Module({
  imports: [TypeOrmModule.forFeature([Periode, RegleTarification, TypeAbonnement,HoraireOuverture])],
  controllers: [TypeAbonnementController,PeriodeController, RegleTarificationController,HoraireOuvertureController],
  providers: [PeriodeService, RegleTarificationService,HoraireOuvertureService, TypeAbonnementService],
})
export class ParametrageModule {}
