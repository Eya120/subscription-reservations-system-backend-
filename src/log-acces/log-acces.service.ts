// src/log-acces/log-acces.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogAcces, ResultatAcces } from './entities/log-acces.entity';
import { CreateLogAccesDto } from './dto/create-log-acces.dto';
import { UpdateLogAccesDto } from './dto/update-log-acces.dto';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';
import { Acces } from '../acces/entities/acces.entity';

@Injectable()
export class LogAccesService {
  constructor(
    @InjectRepository(LogAcces)
    private logAccesRepository: Repository<LogAcces>,

    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,

    @InjectRepository(Acces)
    private accesRepository: Repository<Acces>,
  ) {}

  async create(createLogAccesDto: CreateLogAccesDto): Promise<LogAcces> {
    let utilisateur = null;
    if (createLogAccesDto.utilisateurId) {
      utilisateur = await this.utilisateurRepository.findOne({
        where: { id: createLogAccesDto.utilisateurId },
      });
      if (!utilisateur) {
        throw new NotFoundException('Utilisateur non trouvé');
      }
    }

    const acces = await this.accesRepository.findOne({
      where: { id: createLogAccesDto.accesId },
    });
    if (!acces) {
      throw new NotFoundException('Accès non trouvé');
    }

    const logAcces = this.logAccesRepository.create({
      utilisateur,
      acces,
      typeAcces: createLogAccesDto.typeAcces,
      resultat: createLogAccesDto.resultat,
      raisonEchec: createLogAccesDto.raisonEchec,
      dateTentative: createLogAccesDto.dateTentative ? new Date(createLogAccesDto.dateTentative) : undefined,
    });

    return this.logAccesRepository.save(logAcces);
  }

  findAll(): Promise<LogAcces[]> {
    return this.logAccesRepository.find({ relations: ['utilisateur', 'acces'] });
  }

  async findOne(id: number): Promise<LogAcces> {
    const log = await this.logAccesRepository.findOne({
      where: { id },
      relations: ['utilisateur', 'acces'],
    });
    if (!log) throw new NotFoundException('Log d’accès non trouvé');
    return log;
  }

  async update(id: number, updateLogAccesDto: UpdateLogAccesDto): Promise<LogAcces> {
    await this.logAccesRepository.update(id, updateLogAccesDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.logAccesRepository.delete(id);
  }
}
