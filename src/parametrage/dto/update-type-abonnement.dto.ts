import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeAbonnementDto } from './create-type-abonnement.dto';

export class UpdateTypeAbonnementDto extends PartialType(CreateTypeAbonnementDto) {}
