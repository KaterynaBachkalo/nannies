import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: "nannies-service-7f22d.firebaseapp.com",
  databaseURL:
    "https://nannies-service-7f22d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nannies-service-7f22d",
  storageBucket: "nannies-service-7f22d.appspot.com",
  messagingSenderId: "1020740392404",
  appId: "1:1020740392404:web:afc82dca640527a3c3b241",
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
