import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateRegleTarificationDto {
  @IsOptional()
  @IsString()
  period?: string;

  @IsOptional()
  @IsNumber()
  tarif?: number;
}
