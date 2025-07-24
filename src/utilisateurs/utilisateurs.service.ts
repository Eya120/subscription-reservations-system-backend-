import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Utilisateur } from './entities/utilisateur.entity';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Role } from '../auth/roles/role.enum';

@Injectable()
export class UtilisateursService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async create(createDto: CreateUtilisateurDto): Promise<Utilisateur> {
    const existing = await this.utilisateurRepository.findOne({ where: { email: createDto.email } });
    if (existing) {
      throw new ConflictException('Cet email est déjà utilisé.');
    }

    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    const utilisateur = this.utilisateurRepository.create({
      nom: createDto.nom,
      prenom: createDto.prenom,
      email: createDto.email,
      password: hashedPassword,
      firebaseUid: createDto.firebaseUid,
    });

    return this.utilisateurRepository.save(utilisateur);
  }

  findAll(): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find();
  }

  async findOne(id: number): Promise<Utilisateur> {
    const user = await this.utilisateurRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur #${id} introuvable`);
    }
    return user;
  }

  async update(id: number, updateDto: UpdateUtilisateurDto): Promise<Utilisateur> {
    if (updateDto.password) {
      updateDto.password = await bcrypt.hash(updateDto.password, 10);
    }

    const result = await this.utilisateurRepository.update(id, updateDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Utilisateur #${id} introuvable`);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.utilisateurRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Utilisateur #${id} introuvable`);
    }
  }

  async findByEmail(email: string): Promise<Utilisateur | undefined> {
    return this.utilisateurRepository.findOne({ where: { email } });
  }

  async findByFirebaseUid(uid: string): Promise<Utilisateur | null> {
  return this.utilisateurRepository.findOne({
    where: { firebaseUid: uid }, // ⬅️ c'est ici l'erreur d'origine
  });
  }

  // ======== Ajout de createIfNotExist =========
  async createIfNotExist(firebaseUid: string, email: string, displayName?: string): Promise<Utilisateur> {
    let user = await this.findByFirebaseUid(firebaseUid);
    if (!user) {
      user = this.utilisateurRepository.create({
        firebaseUid,
        email,
        nom: displayName || null,  // Ajuste selon ta logique de mapping
        // Pas de mot de passe ici, Firebase gère l'authentification
      });
      await this.utilisateurRepository.save(user);
    }
    return user;
  }

  async updateRole(id: number, role: Role) {
    const utilisateur = await this.utilisateurRepository.findOneBy({ id });
    if (!utilisateur) throw new NotFoundException('Utilisateur non trouvé');
    utilisateur.role = role;
    return this.utilisateurRepository.save(utilisateur);
  }
}
