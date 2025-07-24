import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paiement } from './entities/paiement.entity';
import { CreatePaiementDto } from './dto/create-payement.dto';
import { UpdatePaiementDto } from './dto/update-payement.dto';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';
import { Abonnement } from '../abonnements/entities/abonnement.entity';
import { StatutPaiement } from './entities/paiement.entity';


@Injectable()
export class PaiementsService {
  constructor(
    @InjectRepository(Paiement)
    private paiementRepository: Repository<Paiement>,

    @InjectRepository(Utilisateur)
    private utilisateurRepo: Repository<Utilisateur>,

    @InjectRepository(Abonnement)
    private abonnementRepo: Repository<Abonnement>,
  ) {}

  async create(createDto: CreatePaiementDto) {
    const utilisateur = await this.utilisateurRepo.findOneBy({ id: createDto.utilisateurId });
    const abonnement = await this.abonnementRepo.findOneBy({ id: createDto.abonnementId });

    if (!utilisateur || !abonnement) throw new NotFoundException('Utilisateur ou abonnement non trouvé.');

    const paiement = this.paiementRepository.create({
      montant: createDto.montant,
      moyen: createDto.moyen,
      transactionId: createDto.transactionId,
      statut: createDto.statut || StatutPaiement.EN_ATTENTE,
      utilisateur,
      abonnement,
    });

    return this.paiementRepository.save(paiement);
  }

  findAll() {
    return this.paiementRepository.find();
  }

  async findOne(id: number) {
    const paiement = await this.paiementRepository.findOne({ where: { id } });
    if (!paiement) throw new NotFoundException(`Paiement #${id} non trouvé`);
    return paiement;
  }

  async update(id: number, updateDto: UpdatePaiementDto) {
    const paiement = await this.findOne(id);
    Object.assign(paiement, updateDto);
    return this.paiementRepository.save(paiement);
  }

  async remove(id: number) {
    const paiement = await this.findOne(id);
    return this.paiementRepository.remove(paiement);
  }
}
