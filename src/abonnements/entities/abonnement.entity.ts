import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany} from 'typeorm';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';
import { TypeAbonnement } from 'src/parametrage/entities/type-abonnement.entity';
import { Paiement } from 'src/payements/entities/paiement.entity';
import { Acces } from '../../acces/entities/acces.entity'; 

@Entity()
export class Abonnement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true }) // ← temporairement
dateDebut: Date;

@Column({ type: 'date', nullable: true }) // ← idem
dateFin: Date;

@Column({ type: 'numeric', default: 0 }) // ou nullable: true
tarifApplique: number;


  @Column({ default: 'actif' }) // actif, expiré, suspendu
  etat: string;

  @CreateDateColumn()
  dateCreation: Date;

  @Column({ default: true })
actif: boolean;

  @OneToMany(() => Paiement, paiement => paiement.abonnement)
paiements: Paiement[];


  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.abonnements, { eager: true })
  utilisateur: Utilisateur;

  @ManyToOne(() => TypeAbonnement, type => type.abonnements, { eager: true })
  typeAbonnement: TypeAbonnement;

  @OneToMany(() => Acces, acces => acces.abonnement)
acces: Acces[];
}
