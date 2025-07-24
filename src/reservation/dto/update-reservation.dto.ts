import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { StatutReservation } from '../reservation-status.enum';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsOptional()
  @IsEnum(StatutReservation)
  statut?: StatutReservation;
}
