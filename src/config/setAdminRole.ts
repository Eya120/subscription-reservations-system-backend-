import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
const serviceAccount = require('./firebase-service-account.json');

initializeApp({
  credential: cert(serviceAccount as any),
});

async function setAdminRole() {
  const uid = 'mfZWlDgqkIMD4opORuuLH5r0yUN2'; // <-- Remplace par l’UID de l’utilisateur

  try {
    await getAuth().setCustomUserClaims(uid, { role: 'ADMIN' });
    console.log(`✅ Rôle ADMIN attribué à l'utilisateur avec UID : ${uid}`);
  } catch (error) {
    console.error('❌ Erreur :', error);
  }
}

setAdminRole();
