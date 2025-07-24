// src/log-acces/dto/create-log-acces.dto.ts
import { IsNotEmpty, IsEnum, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { ResultatAcces } from '../entities/log-acces.entity';

export enum TypeAcces {
  ENTREE = 'ENTREE',
  SORTIE = 'SORTIE',
}

export class CreateLogAccesDto {
  @IsOptional()
  @IsNumber()
  utilisateurId?: number;

  @IsNotEmpty()
  @IsNumber()
  accesId: number;

  @IsEnum(TypeAcces)
  typeAcces: TypeAcces;

  @IsEnum(ResultatAcces)
  resultat: ResultatAcces;

  @IsOptional()
  raisonEchec?: string;

  @IsOptional()
  @IsDateString()
  dateTentative?: string;
}
