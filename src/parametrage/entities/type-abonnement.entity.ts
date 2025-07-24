// src/parametrage/entities/type-abonnement.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { RegleTarification } from './regle-tarification.entity';
import { Abonnement } from 'src/abonnements/entities/abonnement.entity';



@Entity()
export class TypeAbonnement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nom: string; // ex: "Mensuel", "Annuel", "Hebdomadaire"

  @Column('text', { nullable: true })
  description?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  prixBase: number; // prix de base de cet abonnement

  @Column({ default: true })
  actif: boolean;

  
@OneToMany(() => RegleTarification, (regle) => regle.typeAbonnement)
reglesTarification: RegleTarification[];

@OneToMany(() => Abonnement, abonnement => abonnement.typeAbonnement)
abonnements: Abonnement[];

}
