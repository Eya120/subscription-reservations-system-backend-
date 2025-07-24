// src/paiements/entities/paiement.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Utilisateur } from '../../utilisateurs/entities/utilisateur.entity';
import { Abonnement } from '../../abonnements/entities/abonnement.entity';

export enum StatutPaiement {
  EN_ATTENTE = 'EN_ATTENTE',
  SUCCES = 'SUCCES',
  ECHEC = 'ECHEC',
}

@Entity()
export class Paiement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  montant: number;

  @CreateDateColumn()
  datePaiement: Date;

  @Column()
  moyen: string; // exemple : 'stripe', 'paypal', 'simulateur'

  @Column({ type: 'enum', enum: StatutPaiement, default: StatutPaiement.EN_ATTENTE })
  statut: StatutPaiement;

  @Column({ nullable: true })
  transactionId: string;

  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.payements, { eager: true })
  utilisateur: Utilisateur;

  @ManyToOne(() => Abonnement, abonnement => abonnement.paiements, { eager: true })
  abonnement: Abonnement;
}
