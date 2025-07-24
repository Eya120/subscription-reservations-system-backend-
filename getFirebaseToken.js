// getFirebaseToken.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA7bPqQNzzjxbW6ONRhnV7ddiEwTDkRiaA",
  authDomain: "gestion-abonnement-reservation.firebaseapp.com",
  projectId: "gestion-abonnement-reservation",
  storageBucket: "gestion-abonnement-reservation.firebasestorage.app",
  messagingSenderId: "617294859757",
  appId: "1:617294859757:web:5a6eaba3b1156faeb26be4",
  measurementId: "G-FSXNNE8WPQ"
};
async function main() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  try {
    // Remplace ici avec un utilisateur existant dans ton projet Firebase
    const userCredential = await signInWithEmailAndPassword(auth, 'email@example.com', 'tonMotDePasse');
    const user = userCredential.user;

    const token = await user.getIdToken();
    console.log('Token Firebase ID :', token);
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
  }
}

main();
