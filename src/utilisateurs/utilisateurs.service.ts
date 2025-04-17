import { Injectable } from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Repository } from 'typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UtilisateursService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}

  create(createUtilisateurDto: CreateUtilisateurDto): Promise<Utilisateur> {
    const utilisateur = this.utilisateurRepository.create(createUtilisateurDto);
    return this.utilisateurRepository.save(utilisateur);
  }

  findAll(): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find();
  }
}