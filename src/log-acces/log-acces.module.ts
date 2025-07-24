// src/log-acces/log-acces.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogAccesService } from './log-acces.service';
import { LogAccesController } from './log-acces.controller';
import { LogAcces } from './entities/log-acces.entity';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';
import { Acces } from '../acces/entities/acces.entity';  // <- importer l'entité Acces

@Module({
  imports: [TypeOrmModule.forFeature([LogAcces, Utilisateur,Acces])],
  controllers: [LogAccesController],
  providers: [LogAccesService],
  exports: [LogAccesService],
})
export class LogAccesModule {}
