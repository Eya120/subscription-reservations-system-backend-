// src/parametrage/entities/regle-tarification.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn } from 'typeorm';
import { TypeAbonnement } from './type-abonnement.entity';
import { Periode } from './periode.entity';

@Entity()
export class RegleTarification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jour: string;

  @Column({ name: 'heure_debut' })
  heureDebut: string;

  @Column({ name: 'heure_fin' })
  heureFin: string;

  @Column()
  tarif: number;

   @ManyToOne(() => TypeAbonnement, { eager: true }) // <- important: eager load pour auto charger
  @JoinColumn({ name: 'typeAbonnementId' })
  typeAbonnement: TypeAbonnement;
}

