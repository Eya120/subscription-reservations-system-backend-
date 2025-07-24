import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservation.service';
import { ReservationsController } from './reservation.controller';
import { Reservation } from './entities/reservations.entity';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';
import { Abonnement } from 'src/abonnements/entities/abonnement.entity';
import { Service } from 'src/services/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Utilisateur, Abonnement,Service,])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
