import * as admin from 'firebase-admin';
import * as fs from 'fs';

// 👇 Remplace ce chemin par le chemin réel vers ton fichier serviceAccountKey.json
const serviceAccount = JSON.parse(
  fs.readFileSync('src/config/firebase-service-account.json', 'utf8')
);

// Initialisation de Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// 👇 Remplace ici par l'UID de ton utilisateur Firebase
const uid = 'IMFBDhqaygSqd2PTWKzcJWHqjy73';

admin
  .auth()
  .setCustomUserClaims(uid, { roles: ['admin'] })
  .then(() => {
    console.log(`✅ Rôle admin assigné à l'utilisateur ${uid}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erreur lors de l\'assignation du rôle :', error);
    process.exit(1);
  });
