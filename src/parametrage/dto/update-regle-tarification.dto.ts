import { PartialType } from '@nestjs/mapped-types';
import { CreateRegleTarificationDto } from './create-regle-tarification.dto';

export class UpdateRegleTarificationDto extends PartialType(CreateRegleTarificationDto) {
  // typeAbonnementId est optionnel pour la mise à jour
  typeAbonnementId?: number;
}
