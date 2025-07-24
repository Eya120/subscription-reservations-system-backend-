import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Acces } from './entities/acces.entity';
import { CreateAccesDto } from './dto/create-acces.dto';
import { UpdateAccesDto } from './dto/update-acces.dto';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';
import { Abonnement } from '../abonnements/entities/abonnement.entity';
import { LogAccesService } from '../log-acces/log-acces.service';
import { ResultatAcces } from '../log-acces/entities/log-acces.entity';


@Injectable()
export class AccesService {
  constructor(
    @InjectRepository(Acces)
    private accesRepository: Repository<Acces>,
    

    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,

    @InjectRepository(Abonnement)
    private abonnementRepository: Repository<Abonnement>,
  ) {}

  async create(createAccesDto: CreateAccesDto): Promise<Acces> {
    const utilisateur = await this.utilisateurRepository.findOne({
      where: { id: createAccesDto.utilisateurId },
    });
    if (!utilisateur) throw new NotFoundException('Utilisateur non trouvé');

    const abonnement = await this.abonnementRepository.findOne({
      where: { id: createAccesDto.abonnementId },
    });
    if (!abonnement) throw new NotFoundException('Abonnement non trouvé');

    // Vérification simple que l'abonnement est actif (exemple)
    if (!abonnement.actif) {
      throw new BadRequestException('Abonnement inactif');
    }

    // Validation dateExpiration (si fournie)
    if (createAccesDto.dateExpiration) {
      const dateExp = new Date(createAccesDto.dateExpiration);
      if (dateExp.getTime() < Date.now()) {
        throw new BadRequestException('Date d\'expiration ne peut pas être dans le passé');
      }

    }

    const acces = this.accesRepository.create({
      utilisateur,
      abonnement,
      typeAcces: createAccesDto.typeAcces,
      codeAcces: createAccesDto.codeAcces || this.generateCodeAcces(),
      dateExpiration: createAccesDto.dateExpiration ? new Date(createAccesDto.dateExpiration) : null,
      actif: true,
    });

    const saved = await this.accesRepository.save(acces);
    console.log(`Accès créé : ID ${saved.id}, Code ${saved.codeAcces}`);
    return saved;
  }

  private generateCodeAcces(): string {
    return Math.random().toString(36).substr(2, 10).toUpperCase();
  }

  async findAll(): Promise<Acces[]> {
    return this.accesRepository.find({ relations: ['utilisateur', 'abonnement'] });
  }

  async findOne(id: number): Promise<Acces> {
    const acces = await this.accesRepository.findOne({
      where: { id },
      relations: ['utilisateur', 'abonnement'],
    });
    if (!acces) throw new NotFoundException('Accès non trouvé');
    return acces;
  }

  async update(id: number, updateAccesDto: UpdateAccesDto): Promise<Acces> {
    const acces = await this.accesRepository.findOne({ where: { id } });
    if (!acces) throw new NotFoundException('Accès non trouvé');

    // Validation dateExpiration si présente
    if (updateAccesDto.dateExpiration) {
      const dateExp = new Date(updateAccesDto.dateExpiration);
      if (dateExp.getTime() < Date.now()) {
        throw new BadRequestException('Date d\'expiration ne peut pas être dans le passé');
      }
      updateAccesDto.dateExpiration = dateExp.toISOString();
    }
    await this.accesRepository.update(id, updateAccesDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const acces = await this.accesRepository.findOne({ where: { id } });
    if (!acces) throw new NotFoundException('Accès non trouvé');

    await this.accesRepository.delete(id);
    console.log(`Accès supprimé : ID ${id}`);
  }

  // Nouvelle méthode pour activer ou désactiver un accès
  async setActif(id: number, actif: boolean): Promise<Acces> {
    const acces = await this.findOne(id);
    acces.actif = actif;
    return this.accesRepository.save(acces);
  }
}
