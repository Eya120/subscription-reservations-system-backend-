const admin = require('firebase-admin');

// Remplace par le chemin de ton fichier JSON téléchargé
const serviceAccount = require('./firebase-service-account.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// 📧 Email de l’utilisateur à modifier
const userEmail = 'bouzideya0@gmail.com'; // ← remplace par un vrai email
const roleToAssign = 'admin'; // ← ou 'coach', etc.

async function assignRoleByEmail(email, role) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { role });
    console.log(`✅ Le rôle "${role}" a été attribué à ${email}`);
  } catch (error) {
    console.error('❌ Erreur :', error.message);
  }
}

assignRoleByEmail(userEmail, roleToAssign);
