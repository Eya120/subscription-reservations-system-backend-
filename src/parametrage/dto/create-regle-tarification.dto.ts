import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRegleTarificationDto {
  @IsNumber()
  @IsNotEmpty()
  typeAbonnementId: number;

  @IsString()
  @IsNotEmpty()
  jour: string;

  @IsString()
  @IsNotEmpty()
  heureDebut: string;

  @IsString()
  @IsNotEmpty()
  heureFin: string;

  @IsNumber()
  @IsNotEmpty()
  tarif: number;
}
