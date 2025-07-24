// src/parametrage/entities/regle-tarification.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TypeAbonnement } from './type-abonnement.entity';
import { Periode } from './periode.entity';

@Entity('regles_tarification')
export class RegleTarification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', nullable: false })
  tarif: number;

  @ManyToOne(() => TypeAbonnement, type => type.reglesTarification, { eager: true })
  typeAbonnement: TypeAbonnement;

  @ManyToOne(() => Periode, periode => periode.regles, { eager: true })
  periode: Periode;
}
