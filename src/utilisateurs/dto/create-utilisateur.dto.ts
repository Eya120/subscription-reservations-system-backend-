import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUtilisateurDto {
  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  prenom: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

   @IsNotEmpty()
  firebaseUid: string;

  
}
