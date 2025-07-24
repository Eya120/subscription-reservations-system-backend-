// src/acces/dto/filtre-acces.dto.ts

import { IsOptional, IsDateString } from 'class-validator';

export class FiltreAccesDto {
  @IsOptional()
  @IsDateString()
  dateDebut?: string;

  @IsOptional()
  @IsDateString()
  dateFin?: string;
}
