import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsNumber()
  @IsNotEmpty()
  prix: number;

  @IsString()
  description: string;

  @IsNumber()
  categorieId: number;
}
