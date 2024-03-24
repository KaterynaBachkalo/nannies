import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_API_KEY,
  apiKey: "AIzaSyB2o0qKN3nmKMYT5eHpAQVZEishLSn-GCY",
  authDomain: "nannies-service-7f22d.firebaseapp.com",
  databaseURL:
    "https://nannies-service-7f22d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nannies-service-7f22d",
  storageBucket: "nannies-service-7f22d.appspot.com",
  messagingSenderId: "1020740392404",
  appId: "1:1020740392404:web:afc82dca640527a3c3b241",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
// export const googleAuthProvider = new GoogleAuthProvider();
