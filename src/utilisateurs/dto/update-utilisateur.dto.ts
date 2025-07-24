import { PartialType } from '@nestjs/swagger';
import { CreateUtilisateurDto } from './create-utilisateur.dto';

export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {
   nom?: string;
  prenom?: string;
  email?: string;
  password?: string;
    firebaseUid?: string;
}
