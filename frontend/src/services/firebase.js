import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase client config values are public identifiers — safe to commit.
// They are NOT secret keys. Security is enforced by Firebase Security Rules.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyDYlTn9s8YK2bsEmt2eo4DOJolcHsTbeho",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "aluminiconnect-9dada.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "aluminiconnect-9dada",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "aluminiconnect-9dada.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "1020447626431",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:1020447626431:web:41a6546f26346f851b220a",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-JQKMK3VGNZ"
};

// Prevent re-initializing on hot-reload in development
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
