import { IsEmail, IsNotEmpty, MinLength,IsEnum } from 'class-validator';
import { Role } from '../../auth/roles/role.enum';  // adapte si besoin


export class CreateUtilisateurDto {
  @IsNotEmpty({ message: 'Le nom est requis.' })
  nom: string;

  @IsNotEmpty({ message: 'Le prénom est requis.' })
  prenom: string;

  @IsEmail({}, { message: 'Email invalide.' })
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe est requis.' })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
  password: string;

  
  @IsEnum(Role)
  role: Role;
  
}
