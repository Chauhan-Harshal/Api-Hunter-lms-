// Import Firebase core and required services
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyALSo6k74mgG_75DQpypJnIyyhNtoA863w",
  authDomain: "lmsp1608.firebaseapp.com",
  projectId: "lmsp1608",
  storageBucket: "lmsp1608.firebasestorage.app",
  messagingSenderId: "934065699093",
  appId: "1:934065699093:web:2f84057a3868ebb955d11c",
  measurementId: "G-04J6WJ0VN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Google Provider
export const googleProvider = new GoogleAuthProvider();