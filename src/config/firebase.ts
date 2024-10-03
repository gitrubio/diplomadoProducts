import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración obtenida desde tu proyecto en Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDzRWrq425p6MRqZSXguF8fgrtec1_CpPY",
    authDomain: "diplomado-9e769.firebaseapp.com",
    projectId: "diplomado-9e769",
    storageBucket: "diplomado-9e769.appspot.com",
    messagingSenderId: "718575453985",
    appId: "1:718575453985:web:91c8e89404c78189a26060"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la autenticación para usar en tus funciones
export const auth = getAuth(app);
export const db = getFirestore(app);
