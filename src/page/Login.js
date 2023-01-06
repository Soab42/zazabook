// import { Logout } from "@mui/icons-material";
import { Logout, Message, PersonSearch } from "@mui/icons-material";

import React from "react";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

import Home from "./Home";

export default function Login() {
  const { user, google, logout } = useAuth();
  // console.log(user);
  return (
    <div className="p-1  ">
      {!user ? (
        <div classname="h-screen">
          <div className="h-[50px] rounded-xl overflow-hidden">
            <GoogleButton onClick={google} />
          </div>
          <p>{user}</p>
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
              <Link to={`profile/${user.uid}`} className="btn">
                <PersonSearch />
              </Link>
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
