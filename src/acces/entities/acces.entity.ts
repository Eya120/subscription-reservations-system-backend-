import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Utilisateur } from '../../utilisateurs/entities/utilisateur.entity';
import { Abonnement } from '../../abonnements/entities/abonnement.entity';
import { LogAcces } from '../../log-acces/entities/log-acces.entity';
import { TypeAcces } from '../dto/create-acces.dto'; // ou fichier enum dédié

@Entity()
export class Acces {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  codeAcces: string;  // Par exemple QR code ou mot de passe

  @Column({ type: 'enum', enum: ['QR_CODE', 'MOT_DE_PASSE', 'BADGE_NUMERIQUE'] })
  typeAcces: 'QR_CODE' | 'MOT_DE_PASSE' | 'BADGE_NUMERIQUE';

  @Column({ default: true })
  actif: boolean;

  @CreateDateColumn()
  dateCreation: Date;

  @Column({ nullable: true })
  dateExpiration: Date;



   @ManyToOne(() => Utilisateur, utilisateur => utilisateur.acces)
  utilisateur: Utilisateur;

  @ManyToOne(() => Abonnement, abonnement => abonnement.acces)
  abonnement: Abonnement;

  @OneToMany(() => LogAcces, log => log.acces)
logs: LogAcces[];
}
