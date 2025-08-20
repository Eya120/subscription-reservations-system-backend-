// src/parametrage/entities/periode.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RegleTarification } from './regle-tarification.entity';

@Entity('periodes')
export class Periode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string; // ex : "Heures creuses", "Week-end"

  @Column()
  heureDebut: string; // Format HH:mm

  @Column()
  heureFin: string; // Format HH:mm

  
}
