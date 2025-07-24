// src/log-acces/entities/log-acces.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Utilisateur } from '../../utilisateurs/entities/utilisateur.entity';
import { Acces } from '../../acces/entities/acces.entity'; // adapte le chemin selon ton projet

export enum ResultatAcces {
  SUCCES = 'SUCCES',
  ECHEC = 'ECHEC',
}

@Entity()
export class LogAcces {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Utilisateur, { nullable: true })
  utilisateur: Utilisateur | null;

  @Column({ type: 'varchar', length: 50 })
  typeAcces: string; // ENTREE, SORTIE

  @Column({ type: 'enum', enum: ResultatAcces })
  resultat: ResultatAcces;

  @Column({ nullable: true })
  raisonEchec?: string;

  @CreateDateColumn()
  dateTentative: Date;

  @ManyToOne(() => Acces, (acces) => acces.logs)
  acces: Acces;
}
