// import { Logout } from "@mui/icons-material";
import {
  Google,
  Logout,
  Message,
  PersonPinCircle,
  PersonSearch,
} from "@mui/icons-material";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import Home from "./Home";

export default function Login() {
  //   const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // console.log(user);
    });

    return unsubscribe;
  }, [user]);
  const provider = new GoogleAuthProvider();

  const signintithgoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result);
      })
      .catch((error) => console.log(error));
  };
  const logout = () => {
    signOut(auth);
  };

  return (
    <div className="p-1  ">
      {!user ? (
        <div classname="h-screen">
          <div className="h-[50px] rounded-xl overflow-hidden">
            <GoogleButton onClick={signintithgoogle} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex h-8 justify-between text-sm">
            <div className="flex gap-1 items-center">
              <img
                className="rounded-full h-10 p-1"
                src={user.photoURL}
                alt=""
              />
              <p>{user.displayName}</p>
            </div>

            {/* <p>{user.email}</p> */}
            <div className="h-8 gap-2 flex overflow-hidden">
              <div className="btn">
                <Link to={"/messenger"}>
                  <Message />
                </Link>
              </div>
              <div className="btn">
                <PersonSearch />
              </div>
              <button className="btn" onClick={logout}>
                <Logout />
              </button>
            </div>
          </div>
          <Home />
        </>
      )}
    </div>
  );
}
