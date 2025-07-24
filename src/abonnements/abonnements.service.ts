import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Abonnement } from './entities/abonnement.entity';
import { CreateAbonnementDto } from './dto/create.abonnement.dto';
import { UpdateAbonnementDto } from './dto/update.abonnement.dto';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';
import { TypeAbonnement } from 'src/parametrage/entities/type-abonnement.entity';

@Injectable()
export class AbonnementService {
  constructor(
    @InjectRepository(Abonnement)
    private abonnementRepo: Repository<Abonnement>,

    @InjectRepository(Utilisateur)
    private utilisateurRepo: Repository<Utilisateur>,

    @InjectRepository(TypeAbonnement)
    private typeAbonnementRepo: Repository<TypeAbonnement>,
  ) {}

  async create(dto: CreateAbonnementDto): Promise<Abonnement> {
    const utilisateur = await this.utilisateurRepo.findOneBy({ id: dto.utilisateurId });
    if (!utilisateur) throw new NotFoundException('Utilisateur non trouvé');

    const typeAbonnement = await this.typeAbonnementRepo.findOneBy({ id: dto.typeAbonnementId });
    if (!typeAbonnement) throw new NotFoundException('Type d’abonnement non trouvé');

    const abonnement = this.abonnementRepo.create({
      ...dto,
      utilisateur,
      typeAbonnement,
    });

    return this.abonnementRepo.save(abonnement);
  }

  findAll(): Promise<Abonnement[]> {
    return this.abonnementRepo.find();
  }

  findOne(id: number): Promise<Abonnement> {
    return this.abonnementRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateAbonnementDto): Promise<Abonnement> {
    const abonnement = await this.abonnementRepo.findOneBy({ id });
    if (!abonnement) throw new NotFoundException('Abonnement non trouvé');

    if (dto.utilisateurId) {
      const utilisateur = await this.utilisateurRepo.findOneBy({ id: dto.utilisateurId });
      abonnement.utilisateur = utilisateur;
    }

    if (dto.typeAbonnementId) {
      const type = await this.typeAbonnementRepo.findOneBy({ id: dto.typeAbonnementId });
      abonnement.typeAbonnement = type;
    }

    Object.assign(abonnement, dto);
    return this.abonnementRepo.save(abonnement);
  }

  async remove(id: number): Promise<void> {
    const abonnement = await this.abonnementRepo.findOneBy({ id });
    if (!abonnement) throw new NotFoundException('Abonnement non trouvé');
    await this.abonnementRepo.remove(abonnement);
  }
}
