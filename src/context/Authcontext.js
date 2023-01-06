import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { serverTimestamp, set, ref } from "firebase/database";
// import { ref } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase";

const Authcontext = React.createContext();

export function useAuth() {
  return useContext(Authcontext);
}

export default function AuthProvider({ children }) {
  //   const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("hi");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // console.log(user);
    });

    return unsubscribe;
  }, [user]);

  const signin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      const users = user;
      setUser(users);
    });
  };

  const provider = new GoogleAuthProvider();

  const google = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result);
        set(ref(db, "user/" + auth.currentUser.uid), {
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          id: auth.currentUser.uid,
          time: serverTimestamp(),
          image: auth.currentUser.photoURL,
        });
        set(ref(db, "userchat/" + auth.currentUser.uid));
      })
      .catch((error) => console.log(error));
  };
  const logout = () => {
    signOut(auth);
  };

  const value = {
    user,
    logout,
    signin,
    google,
  };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
}
