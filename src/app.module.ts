import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'eyaeya', // 👉 celui que tu mets pour te connecter à PostgreSQL
      database: 'gestionsystem',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 👈 crée les tables automatiquement
    }),
    UtilisateursModule,
  ],
})
export class AppModule {}
