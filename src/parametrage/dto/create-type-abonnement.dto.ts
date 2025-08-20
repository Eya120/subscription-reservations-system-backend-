import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateTypeAbonnementDto {
  @IsString()
  nom: string;

  @IsString()
  description: string;

  @IsNumber()
  prixBase: number;

  @IsBoolean()
  actif: boolean;

  @IsString()
  @IsOptional()
  periode?: string; // "JOUR", "SEMAINE", "MOIS", "ANNEE"

  @IsNumber()
  @IsOptional()
  duree?: number;

  @IsOptional()
  options?: string[];
}
