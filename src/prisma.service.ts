import { Injectable, OnModuleDestroy } from '@nestjs/common';  // Importation de OnModuleDestroy
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {  // Implémentation de OnModuleDestroy
  constructor() {
    super();
  }

  // Méthode qui sera appelée lorsque le module est détruit
  async onModuleDestroy() {
    await this.$disconnect();  // Déconnexion propre de Prisma
  }
}
