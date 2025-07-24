// src/parametrage/services/horaire-ouverture.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoraireOuverture } from '../entities/horaire-ouverture.entity';
import { CreateHoraireOuvertureDto } from '../dto/create-horaire-ouverture.dto';
import { UpdateHoraireOuvertureDto } from '../dto/update-horaire-ouverture.dto';

@Injectable()
export class HoraireOuvertureService {
  constructor(
    @InjectRepository(HoraireOuverture)
    private readonly horaireRepo: Repository<HoraireOuverture>,
  ) {}

  async create(dto: CreateHoraireOuvertureDto) {
    const horaire = this.horaireRepo.create(dto);
    return this.horaireRepo.save(horaire);
  }

  findAll() {
    return this.horaireRepo.find();
  }

  async findOne(id: number) {
    const horaire = await this.horaireRepo.findOneBy({ id });
    if (!horaire) throw new NotFoundException('Horaire non trouvé');
    return horaire;
  }

  async update(id: number, dto: UpdateHoraireOuvertureDto) {
    const horaire = await this.findOne(id);
    Object.assign(horaire, dto);
    return this.horaireRepo.save(horaire);
  }

  async remove(id: number) {
    const horaire = await this.findOne(id);
    return this.horaireRepo.remove(horaire);
  }
}
