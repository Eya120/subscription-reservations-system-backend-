import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToMany} from 'typeorm';
import { Reservation } from '../../reservation/entities/reservations.entity';
import { Abonnement } from '../../abonnements/entities/abonnement.entity';
import { Paiement } from '../../payements/entities/paiement.entity'; // Assure-toi que le chemin est correct
import { Acces} from '../../acces/entities/acces.entity';
import { Role } from 'src/auth/roles/role.enum';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';


@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true }) // Nom peut être optionnel
  nom: string;

  @Column({ nullable: true }) // Prénom peut être optionnel
  prenom: string;

  @Column({ unique: true, nullable: true }) // Email optionnel TEMPORAIREMENT
  email: string;

 @Column({
  type: 'enum',
  enum: Role,
  default: Role.UTILISATEUR, // Valeur par défaut
})
role: Role;

  //@Column({ nullable: true })
  //motDePasse: string;

  @CreateDateColumn()
  dateInscription: Date;

  @UpdateDateColumn()
  dateDerniereConnexion: Date;

@Column({ nullable: true})
password: string;


@OneToMany(() => Abonnement, abonnement => abonnement.utilisateur)
abonnements: Abonnement[];


@OneToMany(() => Reservation, reservation => reservation.utilisateur)
reservations: Reservation[];



@OneToMany(() => Paiement, payement => payement.utilisateur)
payements: Paiement[];


@OneToMany(() => Acces, acces => acces.utilisateur)
acces: Acces[];

}
