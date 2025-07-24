import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeAbonnement } from '../entities/type-abonnement.entity';
import { CreateTypeAbonnementDto } from '../dto/create-type-abonnement.dto';
import { UpdateTypeAbonnementDto } from '../dto/update-type-abonnement.dto';

@Injectable()
export class TypeAbonnementService {
  constructor(
    @InjectRepository(TypeAbonnement)
    private readonly repo: Repository<TypeAbonnement>,
  ) {}

  create(dto: CreateTypeAbonnementDto) {
    const abonnement = this.repo.create(dto);
    return this.repo.save(abonnement);
  }

  findAll() {
    return this.repo.find({ relations: ['reglesTarification'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['reglesTarification'] });
  }

  async update(id: number, dto: UpdateTypeAbonnementDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
