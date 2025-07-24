import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../config/firebase-service-account.json';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app: admin.app.App;

  onModuleInit() {
    // Vérifie si une instance existe déjà
    if (!admin.apps.length) {
      this.app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    } else {
      // Utilise l'instance existante
      this.app = admin.app();
    }
  }

  async verifyToken(token: string) {
  try {
    const decodedToken = await this.app.auth().verifyIdToken(token);
    console.log('Token décodé :', decodedToken);
    return decodedToken;
  } catch (error) {
    console.error('Erreur vérification token Firebase :', error);
    throw new Error('Token invalide');
  }
}
}