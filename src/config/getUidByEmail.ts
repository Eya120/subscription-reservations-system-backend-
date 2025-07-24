const admin = require('firebase-admin');

// Chemin vers ta clé privée Firebase
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// 🔁 Remplace par l'email réel de l'utilisateur
const userEmail = 'bouzideya0@gmail.com'; // ← Ton email réel ici
const roleToAssign = 'admin';        // ← admin, coach, utilisateur...

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
