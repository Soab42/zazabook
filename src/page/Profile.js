import React from "react";
import { auth, dp, username } from "../Firebase";

export default function Profile() {
  return (
    <div>
      <div className="h-[50vh] bg-fuchsia-500">cover</div>

      <div className="flex relative">
        <img
          className="h-[30vh] absolute flex  bottom-[-20px] justify-center items-center text-3xl capitalize rounded-full bg-rose-400 left-[10%]"
          src={auth.currentUser.photoURL}
          alt=""
        />
        <div className="absolute bottom-[10px] sm:left-[25%] left-[45%]    text-3xl uppercase font-bold">
          {auth.currentUser.displayName}
        </div>
      </div>
      <div>About</div>
      <div>Friend list</div>
      <div>post input</div>
      <div>post</div>
    </div>
  );
}
