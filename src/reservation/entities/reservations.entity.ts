import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,} from 'typeorm';
import { Utilisateur } from '../../utilisateurs/entities/utilisateur.entity';
import { Abonnement } from 'src/abonnements/entities/abonnement.entity';
import { Service } from 'src/services/entities/service.entity';
import { StatutReservation } from '../reservation-status.enum'; // adapte le chemin si nécessaire


@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

 @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateReservation: Date;

  @Column({
    type: 'enum',
    enum: StatutReservation,
  })
  statut: StatutReservation;

  @Column({ type: 'timestamp', nullable: true }) // <== temporaire
heureDebut: Date;

@Column({ type: 'timestamp', nullable: true }) // <== temporaire
heureFin: Date;


   @ManyToOne(() => Utilisateur)
  utilisateur: Utilisateur;

  @ManyToOne(() => Abonnement)
@JoinColumn({ name: 'abonnementId' })
abonnement: Abonnement;


  @ManyToOne(() => Service, service => service.reservations)
service: Service;
}
