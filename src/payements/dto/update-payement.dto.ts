import { PartialType } from '@nestjs/mapped-types';
import { CreatePaiementDto } from './create-payement.dto';

export class UpdatePaiementDto extends PartialType(CreatePaiementDto) {}
