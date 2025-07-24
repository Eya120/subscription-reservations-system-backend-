// src/parametrage/dto/update-horaire-ouverture.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateHoraireOuvertureDto } from './create-horaire-ouverture.dto';

export class UpdateHoraireOuvertureDto extends PartialType(CreateHoraireOuvertureDto) {}
