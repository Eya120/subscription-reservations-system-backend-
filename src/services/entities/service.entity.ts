import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from '../../reservation/entities/reservations.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

@Column({ nullable: true }) // temporairement
nom: string;


  @Column({ type: 'text', nullable: false, default: '' })
description: string;


  @Column({ type: 'float', nullable: false, default: 0 })
prix: number;

  @Column({ default: true })
  actif: boolean;

 @OneToMany(() => Reservation, reservation => reservation.service)
  reservations: Reservation[];
}
