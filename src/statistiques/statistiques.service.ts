import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';
import { Abonnement } from '../abonnements/entities/abonnement.entity';
import { Reservation } from '../reservation/entities/reservations.entity';
import { Paiement } from '../payements/entities/paiement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatistiquesService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepo: Repository<Utilisateur>,

    @InjectRepository(Abonnement)
    private readonly abonnementRepo: Repository<Abonnement>,

    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,

    @InjectRepository(Paiement)
    private readonly paiementRepo: Repository<Paiement>,
  ) {}

  // Statistiques générales
  async getGeneralStats() {
    const totalUtilisateurs = await this.utilisateurRepo.count();
    const totalAbonnements = await this.abonnementRepo.count();
    const totalReservations = await this.reservationRepo.count();

    return { totalUtilisateurs, totalAbonnements, totalReservations };
  }

  // Revenu total sur une période (semaine, mois, année)
  async getRevenus(periode: string = 'mois') {
  const now = new Date();
  let dateDebut: Date;

  switch (periode) {
    case 'semaine':
      dateDebut = new Date(now);
      dateDebut.setDate(now.getDate() - 7);
      break;
    case 'mois':
      dateDebut = new Date(now);
      dateDebut.setMonth(now.getMonth() - 1);
      break;
    case 'annee':
      dateDebut = new Date(now);
      dateDebut.setFullYear(now.getFullYear() - 1);
      break;
    default:
      dateDebut = new Date(0); // depuis toujours
  }

  const paiements = await this.paiementRepo
    .createQueryBuilder('paiement')
    .where('paiement.datePaiement >= :dateDebut', { dateDebut })
    .andWhere('paiement.statut = :statut', { statut: 'SUCCES' }) // ✅ filtre
    .getMany();

  const total = paiements.reduce((sum, p) => sum + Number(p.montant), 0); // sécurité avec Number

  return { total, periode };
}

  // Évolution des abonnements par mois
  async getEvolutionAbonnements() {
    const results = await this.abonnementRepo.query(`
      SELECT 
        TO_CHAR("dateCreation", 'YYYY-MM') as mois,
        COUNT(*) as total
      FROM abonnement
      GROUP BY mois
      ORDER BY mois;
    `);

    return results;
  }

  // Évolution des réservations par mois
  async getEvolutionReservations() {
    const results = await this.reservationRepo.query(`
      SELECT 
        TO_CHAR("dateReservation", 'YYYY-MM') as mois,
        COUNT(*) as total
      FROM reservation
      GROUP BY mois
      ORDER BY mois;
    `);

    return results;
  }
}
