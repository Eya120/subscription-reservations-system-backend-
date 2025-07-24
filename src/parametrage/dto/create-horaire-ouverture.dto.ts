// src/parametrage/dto/create-horaire-ouverture.dto.ts
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateHoraireOuvertureDto {
  @IsString()
  jour: string;

  @IsOptional()
  @IsString()
  heureOuverture?: string;

  @IsOptional()
  @IsString()
  heureFermeture?: string;

  @IsBoolean()
  ferme: boolean;
}
