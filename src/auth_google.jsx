import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getAuth, signInWithPopup } from "firebase/auth";
import { app, googleAuthProvider } from "./firebase";
import Loader from "./components/Loader/Loader";
import { toast } from "react-toastify";

export const AuthProvider = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);
  const [error, setError] = useState(null); // Додано стейт для помилки

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userCredential = await auth.currentUser;
        if (userCredential) {
          // Користувач вже авторизований, оновлюємо стан користувача
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

    checkUser(); // Перевіряємо стан користувача під час завантаження компонента
  }, []); // Порожній масив, щоб запустити ефект тільки під час монтування компонента

  // useEffect(() => {
  //   const unsub = auth.onAuthStateChanged((maybeUser) => {
  //     if (maybeUser) {
  //       toast.success(
  //         `${maybeUser.displayName}, you have successfully logged in!`
  //       );
  //       return setUser(maybeUser);
  //     } else {
  //       const signIn = async () => {
  //         try {
  //           const credentials = await signInWithPopup(auth, googleAuthProvider);
  //           console.log(credentials);
  //           toast.success(`Success registration`);
  //           setUser(credentials.user);
  //           setError(null); // Збір помилки, якщо вона була попередньо встановлена
  //         } catch (error) {
  //           console.error("Failed to sign in:", error);
  //           setError("Something went wrong...");
  //         }
  //       };

  //       signIn();
  //     }
  //   });

  //   return unsub;
  // }, [auth]);

  // useEffect(() => {
  //   const unsub = auth.onAuthStateChanged((maybeUser) => {
  //     if (maybeUser) {
  //       return setUser(maybeUser);
  //     }
  //     signInWithPopup(auth, googleAuthProvider).then((credentials) =>
  //       setUser(credentials.user).catch((e) => console.error(e))
  //     );
  //   });
  //   return unsub;
  // }, [auth]);

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
