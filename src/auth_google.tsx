import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getAuth, signInWithPopup } from "firebase/auth";
import { app, googleAuthProvider } from "./firebase";
import Loader from "./components/Loader/Loader";
import { toast } from "react-toastify";

export const AuthProvider = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userCredential = await auth.currentUser;
        if (userCredential) {
          setUser(userCredential);
        } else {
          // Немає авторизованого користувача, спробуємо авторизувати його
          const credentials = await signInWithPopup(auth, googleAuthProvider);
          toast.success(`Welcome, ${credentials.user.displayName}!`);
          setUser(credentials.user);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setError("Authentication failed. Please try again.");
      }
    };

    checkUser();
  }, [auth]);

  return (
    <>
      {user ? (
        <Navigate to="/nannies" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AuthProvider;
