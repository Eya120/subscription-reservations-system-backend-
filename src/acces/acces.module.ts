import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acces } from './entities/acces.entity';
import { AccesService } from './acces.service';
import { AccesController } from './acces.controller';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';
import { Abonnement } from '../abonnements/entities/abonnement.entity';
import { LogAccesModule } from '../log-acces/log-acces.module';

@Module({
  imports: [TypeOrmModule.forFeature([Acces, Utilisateur, Abonnement]),LogAccesModule],
  controllers: [AccesController],
  providers: [AccesService],
  exports: [AccesService],
})
export class AccesModule {}
