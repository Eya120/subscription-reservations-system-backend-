import {
  IsInt,
  IsNotEmpty,
  IsDateString
} from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  @IsNotEmpty()
  abonnementId: number;

  @IsInt()
  @IsNotEmpty()
  serviceId: number;

  @IsInt()
  @IsNotEmpty()
  utilisateurId: number;

  @IsDateString()
  @IsNotEmpty()
  dateReservation: string;

  @IsDateString()
  @IsNotEmpty()
  heureDebut: string;

  @IsDateString()
  @IsNotEmpty()
  heureFin: string;
}
