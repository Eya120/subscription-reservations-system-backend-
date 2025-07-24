// src/parametrage/services/periode.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Periode } from '../entities/periode.entity';
import { CreatePeriodeDto } from '../dto/create-periode.dto';

@Injectable()
export class PeriodeService {
  constructor(
    @InjectRepository(Periode)
    private periodeRepo: Repository<Periode>,
  ) {}

  create(dto: CreatePeriodeDto) {
    return this.periodeRepo.save(dto);
  }

  findAll() {
    return this.periodeRepo.find();
  }

  findOne(id: number) {
    return this.periodeRepo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.periodeRepo.delete(id);
  }
}
