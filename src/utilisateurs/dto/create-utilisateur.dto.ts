import { IsEmail, IsNotEmpty, MinLength,IsEnum } from 'class-validator';
import { Role } from '../../auth/roles/role.enum';  // adapte si besoin
import { ApiProperty } from '@nestjs/swagger';

export class CreateUtilisateurDto {
   @ApiProperty({ example: 'lina' })
  @IsNotEmpty({ message: 'Le nom est requis.' })
  nom: string;


  @ApiProperty({ example: 'bouzid' })
  @IsNotEmpty({ message: 'Le prénom est requis.' })
  prenom: string;

  @ApiProperty({ example: 'lina.bouzid@gmail.com' })
  @IsEmail({}, { message: 'Email invalide.' })
  email: string;

   @ApiProperty({ example: 'lina1234' })
  @IsNotEmpty({ message: 'Le mot de passe est requis.' })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
  password: string;

   
  @IsEnum(Role)
  role: Role;
  
}
