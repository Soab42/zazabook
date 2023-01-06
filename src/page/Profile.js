import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { useAuth } from "../context/Authcontext";
// import { ref } from "firebase/storage";
import { onValue, query, ref } from "firebase/database";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [profileuser, setProfileuser] = useState([]);
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    const userprofile = () => {
      const profileref = ref(db, "user/" + id);
      onValue(query(profileref), (snapshot) => {
        setProfileuser(snapshot.val());
      });
    };
    return userprofile;
  }, [id]);
  // console.log(profileuser.image);
  return (
    <div>
      <div className="h-[50vh] bg-fuchsia-500">cover</div>

      <div className="flex relative">
        <img
          className="h-[30vh] absolute flex  bottom-[-20px] justify-center items-center text-3xl capitalize rounded-full bg-rose-400 left-[10%]"
          src={profileuser.image}
          alt=""
        />
        <div className="absolute bottom-[10px] sm:left-[25%] left-[45%]    text-3xl uppercase font-bold">
          {profileuser.name}
        </div>
      </div>
      <div>About</div>
      <div>Friend list</div>
      <div>post input</div>
      <div>post</div>
    </div>
  );
}
