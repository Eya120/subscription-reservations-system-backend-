import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SendSmsDto {
  @IsPhoneNumber(null) // ou préciser le pays : 'TN' pour Tunisie
  to: string;

  @IsNotEmpty()
  message: string;
}
