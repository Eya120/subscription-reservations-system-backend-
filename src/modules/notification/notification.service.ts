import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateNotificationDto } from './notificationDto/createNotification.dto';
import { Notification } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prismaService: PrismaService) {}

  async createNotification(
    notificationDto: CreateNotificationDto,
  ): Promise<Notification | null> {
    try {
      const createdNotification = await this.prismaService.notification.create({
        data: notificationDto,
      });

      // 👉 Si besoin d'envoyer la notification plus tard via un autre système, on peut l'ajouter ici.
      // Exemple : enregistrer en base pour envoi via cron/job ou service externe.

      return createdNotification;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
