// src/modules/prisma/prisma.service.ts

import { Injectable, OnModuleDestroy } from '@nestjs/common';  // OnModuleDestroy permet de gérer la déconnexion à la destruction du module
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super(); // Initialisation de PrismaClient
  }

  // Méthode de déconnexion de Prisma lorsque le module est détruit
  async onModuleDestroy() {
    await this.$disconnect();  // Déconnexion propre de Prisma
  }
}
