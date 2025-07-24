import { Module, forwardRef } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';
import { FirebaseService } from './firebase.service'; // Chemin local
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';
import { Reflector } from '@nestjs/core';



const serviceAccountPath = path.resolve(
  __dirname,
  process.env.NODE_ENV === 'production'
    ? '../config/firebase-service-account.json'
    : '../../src/config/firebase-service-account.json',
);

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`Fichier de clé Firebase non trouvé à : ${serviceAccountPath}`);
}

const serviceAccount = require(serviceAccountPath);

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

@Module({
  imports: [forwardRef(() => UtilisateursModule)],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useValue: firebaseAdmin,
    },
    FirebaseService,
    FirebaseAuthGuard,
    Reflector,
  ],
  exports: ['FIREBASE_ADMIN', FirebaseService, FirebaseAuthGuard],
})
export class FirebaseModule {}
