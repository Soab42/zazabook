import React, { useEffect, useState } from "react";
import { db } from "../Firebase";

// import { ref } from "firebase/storage";
import { onValue, query, ref } from "firebase/database";
import { useParams } from "react-router-dom";
import Postprofile from "./components/Postprofile";
import Profileinput from "./components/Profileinput";

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
      <div className="h-[50vh] bg-fuchsia-500">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/zazabook-95669.appspot.com/o/saif.jpg?alt=media&token=d0382ee3-5326-4eb3-89f3-5d8bae2a9cb2"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

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
      <div className="grid grid-flow-col grid-cols-6">
        <div className="col-span-2">
          <div>About</div>
          <div>Friend list</div>
        </div>
        <div className="col-span-4 bg-red-100">
          <div className="max-h-full mb-4">
            <Profileinput id={id} />
          </div>
          <div>
            <Postprofile id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
