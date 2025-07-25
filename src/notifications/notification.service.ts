import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/send-email.dto';

import Twilio from 'twilio';

@Injectable()
export class NotificationService {
  private transporter;
  private twilioClient;

  constructor(private configService: ConfigService) {
    // Config Nodemailer pour email
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });

    // Config Twilio pour SMS
    this.twilioClient = Twilio(
      this.configService.get<string>('TWILIO_ACCOUNT_SID'),
      this.configService.get<string>('TWILIO_AUTH_TOKEN'),
    );
  }

  async sendEmail({ to, subject, message }: SendEmailDto) {
    const mailOptions = {
      from: `"Gestion Abonnements" <${this.configService.get<string>('SMTP_USER')}>`,
      to,
      subject,
      html: `<p>${message}</p>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email envoyé :', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Erreur envoi email:', error);
      throw new InternalServerErrorException(
        `Impossible d'envoyer l'email : ${error.message}`,
      );
    }
  }

  async sendSms(to: string, message: string) {
    try {
      const from = this.configService.get<string>('TWILIO_PHONE_NUMBER');
      const sms = await this.twilioClient.messages.create({
        body: message,
        from,
        to,
      });
      console.log('SMS envoyé :', sms.sid);
      return { success: true, sid: sms.sid };
    } catch (error) {
      console.error('Erreur envoi SMS:', error);
      throw new InternalServerErrorException(
        `Impossible d'envoyer le SMS : ${error.message}`,
      );
    }
  }
}
