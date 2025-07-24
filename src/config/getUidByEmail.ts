const admin = require('firebase-admin');

const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const userEmail = 'bouzideya0@gmail.com'; 
const roleToAssign = 'admin';        

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
