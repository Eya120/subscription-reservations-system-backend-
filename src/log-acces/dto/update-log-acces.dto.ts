// src/log-acces/dto/update-log-acces.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateLogAccesDto } from './create-log-acces.dto';

export class UpdateLogAccesDto extends PartialType(CreateLogAccesDto) {}
