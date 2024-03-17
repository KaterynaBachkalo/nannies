import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "./firebase";

export const AuthProvider = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);

  //   useEffect(() => {
  //     const unsub = auth.onAuthStateChanged((maybeUser) => {
  //       if (maybeUser) {
  //         return setUser(maybeUser);
  //       }
  //       signInWithPopup(auth, googleAuthProvider).then((credentials) =>
  //         setUser(credentials.user).catch((er) => console.error(er))
  //       );
  //     });
  //     return unsub;
  //   }, [auth]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (maybeUser) => {
      if (maybeUser) {
        return setUser(maybeUser);
      }
      signIn();
      // signInWithPopup(auth, googleAuthProvider).then((credentials) =>
      //         setUser(credentials.user).catch((er) => console.error(er))
      //       );
    });
    return unsub;
  });

  function signIn() {
    const email = "EMAIL_ID";
    const password = "PASSWORD";
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.error(error);
    });
  }

  return user ? <div>{user.name}</div> : <>loading...</>;
};

export default AuthProvider;
