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

  // Création d'une règle avec retour complet de la relation
  async create(dto: CreateRegleTarificationDto) {
    const typeAbonnement = await this.typeAbonnementRepo.findOneBy({ id: dto.typeAbonnementId });
    const regle = this.regleRepo.create({ ...dto, typeAbonnement });
    const saved = await this.regleRepo.save(regle);

    // Retourne la règle avec la relation pour affichage front
    return this.regleRepo.findOne({
      where: { id: saved.id },
      relations: ['typeAbonnement'],
    });
  }

  // Récupère toutes les règles avec les relations et formate pour le front
  async findAll() {
    const regles = await this.regleRepo.find({ relations: ['typeAbonnement'] });
    return regles.map(r => ({
      id: r.id,
      typeAbonnementId: r.typeAbonnement?.id || null,
      typeAbonnementNom: r.typeAbonnement?.nom || "—",
      jour: r.jour,
      heureDebut: r.heureDebut,
      heureFin: r.heureFin,
      tarif: r.tarif,
    }));
  }

  // Récupération d'une règle spécifique avec relation
  findOne(id: number) {
    return this.regleRepo.findOne({ where: { id }, relations: ['typeAbonnement'] });
  }

  // Mise à jour d'une règle
  async update(id: number, dto: UpdateRegleTarificationDto) {
    const regle = await this.regleRepo.preload({ id, ...dto });
    if (!regle) throw new Error('Règle non trouvée');

    if (dto.typeAbonnementId) {
      regle.typeAbonnement = await this.typeAbonnementRepo.findOneBy({ id: dto.typeAbonnementId });
    }

    const updated = await this.regleRepo.save(regle);

    // Retourne la règle mise à jour avec relation
    return this.regleRepo.findOne({
      where: { id: updated.id },
      relations: ['typeAbonnement'],
    });
  }

  // Suppression d'une règle
  remove(id: number) {
    return this.regleRepo.delete(id);
  }
}
