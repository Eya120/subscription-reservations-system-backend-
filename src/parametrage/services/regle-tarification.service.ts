import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegleTarification } from '../entities/regle-tarification.entity';
import { CreateRegleTarificationDto } from '../dto/create-regle-tarification.dto';
import { UpdateRegleTarificationDto } from '../dto/update-regle-tarification.dto';
import { TypeAbonnement } from '../entities/type-abonnement.entity';

@Injectable()
export class RegleTarificationService {
  constructor(
    @InjectRepository(RegleTarification)
    private readonly regleRepo: Repository<RegleTarification>,
    @InjectRepository(TypeAbonnement)
    private readonly typeAbonnementRepo: Repository<TypeAbonnement>,
  ) {}

  async create(dto: CreateRegleTarificationDto) {
    const typeAbonnement = await this.typeAbonnementRepo.findOneBy({ id: dto.typeAbonnementId });
    const regle = this.regleRepo.create({ ...dto, typeAbonnement });
    return this.regleRepo.save(regle);
  }

  findAll() {
    return this.regleRepo.find({ relations: ['typeAbonnement'] });
  }

  findOne(id: number) {
    return this.regleRepo.findOne({ where: { id }, relations: ['typeAbonnement'] });
  }

  async update(id: number, dto: UpdateRegleTarificationDto) {
    const regle = await this.regleRepo.preload({ id, ...dto });
    return this.regleRepo.save(regle);
  }

  remove(id: number) {
    return this.regleRepo.delete(id);
  }
}
