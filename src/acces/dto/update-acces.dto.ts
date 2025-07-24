// src/acces/dto/update-acces.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAccesDto } from './create-acces.dto';
import { IsOptional, IsDateString, IsEnum } from 'class-validator';

export enum TypeAcces {
  QR_CODE = 'QR_CODE',
  MOT_DE_PASSE = 'MOT_DE_PASSE',
  BADGE_NUMERIQUE = 'BADGE_NUMERIQUE',
}
export class UpdateAccesDto extends PartialType(CreateAccesDto) {
  @IsOptional()
  @IsDateString()
  dateExpiration?: string;

  @IsOptional()
  @IsEnum(['QR_CODE', 'MOT_DE_PASSE', 'BADGE_NUMERIQUE'])
  typeAcces?: 'QR_CODE' | 'MOT_DE_PASSE' | 'BADGE_NUMERIQUE';
}
