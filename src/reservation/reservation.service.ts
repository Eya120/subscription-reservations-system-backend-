import { Injectable, NotFoundException, BadRequestException, ConflictException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservations.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';
import { Abonnement } from '../abonnements/entities/abonnement.entity';
import { Service } from '../services/entities/service.entity';
import { StatutReservation } from '../reservation/reservation-status.enum';
import { MoreThan } from 'typeorm';


@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,

    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,

    @InjectRepository(Abonnement)
    private readonly abonnementRepository: Repository<Abonnement>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
  const { heureDebut, heureFin, utilisateurId, serviceId,abonnementId } = createReservationDto;

  const debut = new Date(heureDebut);
  const fin = new Date(heureFin);

  if (debut >= fin) {
    throw new BadRequestException('L\'heure de fin doit être après l\'heure de début');
  }

  const utilisateur = await this.utilisateurRepository.findOne({ where: { id: utilisateurId } });
  const service = await this.serviceRepository.findOne({ where: { id: serviceId } });

  if (!utilisateur || !service) {
    throw new NotFoundException('Utilisateur ou service non trouvé');
  }

  const abonnementActif = await this.abonnementRepository.findOne({
    where: {
      utilisateur: { id: utilisateurId },
      dateFin: MoreThan(new Date()),
    },
  });

  if (!abonnementActif) {
    throw new BadRequestException('L’utilisateur n’a pas d’abonnement actif');
  }

  // 🔎 Vérification des conflits (chevauchement)
  const conflit = await this.reservationRepository
    .createQueryBuilder('reservation')
    .where('reservation.serviceId = :serviceId', { serviceId })
    .andWhere('reservation.heureDebut < :fin', { fin })
    .andWhere('reservation.heureFin > :debut', { debut })
    .getOne();

  if (conflit) {
    throw new ConflictException('Ce créneau horaire est déjà réservé');
  }

  const reservation = this.reservationRepository.create({
  abonnement: { id: createReservationDto.abonnementId },
  service: { id: createReservationDto.serviceId },
  utilisateur: { id: createReservationDto.utilisateurId },
  dateReservation: createReservationDto.dateReservation,
  heureDebut: createReservationDto.heureDebut,
  heureFin: createReservationDto.heureFin,
  statut: StatutReservation.RESERVE
  });

  return this.reservationRepository.save(reservation);
}


  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      relations: ['utilisateur', 'abonnement', 'service'],
    });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['utilisateur', 'abonnement', 'service'],
    });
    if (!reservation) throw new NotFoundException('Réservation non trouvée');
    return reservation;
  }

  async update(id: number, dto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.findOne(id);

    if (dto.statut) {
      reservation.statut = dto.statut;
    }

    return this.reservationRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.findOne(id);
    await this.reservationRepository.remove(reservation);
  }
}
