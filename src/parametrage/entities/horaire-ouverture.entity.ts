// src/parametrage/entities/horaire-ouverture.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HoraireOuverture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jour: string;

  @Column({ type: 'time', nullable: true })
  heureOuverture: string;

  @Column({ type: 'time', nullable: true })
  heureFermeture: string;

  @Column({ default: false })
  ferme: boolean;
}
