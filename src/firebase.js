import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWbeokXEj916rZ2-LrTKdrCblE5Cj9neg",
  authDomain: "unitecampus-519d9.firebaseapp.com",
  projectId: "unitecampus-519d9",
  storageBucket: "unitecampus-519d9.firebasestorage.app",
  messagingSenderId: "109736053037",
  appId: "1:109736053037:web:86939c0885febe76106ba4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
