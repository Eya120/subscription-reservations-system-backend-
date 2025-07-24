// src/acces/dto/create-acces.dto.ts
import { IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';

export enum TypeAcces {
  QR_CODE = 'QR_CODE',
  MOT_DE_PASSE = 'MOT_DE_PASSE',
  BADGE_NUMERIQUE = 'BADGE_NUMERIQUE',
}
export class CreateAccesDto {
  @IsNotEmpty()
  utilisateurId: number;

  @IsNotEmpty()
  abonnementId: number;

  @IsEnum(['QR_CODE', 'MOT_DE_PASSE', 'BADGE_NUMERIQUE'])
  typeAcces: 'QR_CODE' | 'MOT_DE_PASSE' | 'BADGE_NUMERIQUE';

  @IsOptional()
  codeAcces?: string;

  @IsOptional()
  @IsDateString()
  dateExpiration?: string;
}
