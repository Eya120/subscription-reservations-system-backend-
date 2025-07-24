import {
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsPositive,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAbonnementDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  utilisateurId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  typeAbonnementId: number;

  @IsNotEmpty()
  @IsDateString()
  dateDebut: string;

  @IsNotEmpty()
  @IsDateString()
  dateFin: string;

  @IsNotEmpty()
  @IsNumber()
  tarifApplique: number;

  @IsOptional()
  @IsString()
  etat?: string; // Exemple : "actif", "suspendu", "expiré"
}
