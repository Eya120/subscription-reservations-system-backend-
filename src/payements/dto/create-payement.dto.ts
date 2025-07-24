import { IsNumber, IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { StatutPaiement } from '../entities/paiement.entity';

export class CreatePaiementDto {
  @IsNumber()
  montant: number;

  @IsNotEmpty()
  @IsString()
  moyen: string;

  @IsOptional()
  @IsEnum(StatutPaiement)
  statut?: StatutPaiement;

  @IsOptional()
  transactionId?: string;

  @IsNumber()
  utilisateurId: number;

  @IsNumber()
  abonnementId: number;
}
