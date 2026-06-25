import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyADuYg9ee_XivWAbpEcDJxPu-L4MgkgPt4",
  authDomain: "car-detailing-mgr.firebaseapp.com",
  projectId: "car-detailing-mgr",
  storageBucket: "car-detailing-mgr.firebasestorage.app",
  messagingSenderId: "807906459694",
  appId: "1:807906459694:web:cb59a7e47819cb38ee1fbf",
  measurementId: "G-390LMXH2FF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
