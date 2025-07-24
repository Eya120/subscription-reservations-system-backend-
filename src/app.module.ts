import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { AbonnementModule } from './abonnements/abonnements.module';
import { ReservationsModule } from './reservation/reservation.module';
import { PayementsModule } from './payements/payements.module';
import { AccesModule } from './acces/acces.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './admin/admin.controller';
import { FirebaseModule } from './firebase/firebase.module';
import { AdminModule } from './admin/admin.module';
import { ProtectedModule } from './protected/protected.module';
import { ParametrageModule } from './parametrage/parametrage.module';
import { ServicesModule } from './services/services.module';
import { LogAccesModule } from './log-acces/log-acces.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles/roles.guard';
import { StatistiquesModule } from './statistiques/statistiques.module';
import { TestAuthController } from './test-auth.controller';



@Module({
  imports: 
  [

  ConfigModule.forRoot({
  isGlobal: true, // pour éviter de devoir l'importer partout
  
}),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'eyaeya',
      database: 'gestionsystem',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,

 
      
    }),

    AuthModule,
    UtilisateursModule,
    AbonnementModule,
    ReservationsModule,
    PayementsModule,
    AccesModule,
    StatistiquesModule,
    FirebaseModule,
     AdminModule,
       ProtectedModule,
        ParametrageModule,
        ServicesModule,
         LogAccesModule,
         StatistiquesModule,
   
  ],
  controllers: [ AdminController,TestAuthController],
  providers: [PrismaService, {
     provide: APP_GUARD,
      useClass: RolesGuard,
    },],
  exports: [PrismaService],
  
})

export class AppModule {}
