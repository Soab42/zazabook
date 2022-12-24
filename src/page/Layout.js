import { IcecreamOutlined, Search } from "@mui/icons-material";
import { onValue, query, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import moment from "moment";

import { Link } from "react-router-dom";
import Massenger from "./Massenger";
import Seach from "./components/Seach";
export default function Layout() {
  const [chatlist, setChatlist] = useState([]);
  const [name, setName] = useState("");
  const [image, setimage] = useState("");
  const [combinedid, setCombindid] = useState("");
  useEffect(() => {
    const dbref = ref(db, "userchat/" + auth.currentUser.uid);
    onValue(query(dbref), (snapshot) => {
      snapshot.exists() && setChatlist(snapshot.val());
    });
  }, []);
  return (
    <div className="flex ">
      <div className="md:w-[30vw] w-16 bg-blue-400 ">
        <div className="h-[7vh] flex justify-center items-center uppercase font-bold tracking-[5px] shadow-xl">
          <IcecreamOutlined color="warning" />
          <Link to={"/"} className="hidden md:inline">
            Zazabook
          </Link>
        </div>
        <div className="w-full p-2 flex gap-2 h-12 bg-[rgba(250,250,250,.2)] shadow-sm justify-center">
          <div className="hidden md:flex">
            <Seach />
          </div>
          <div className="md:hidden">
            <Search />
          </div>
        </div>
        <div className="z-0">
          <div className="grid gap-0.5">
            {Object.entries(chatlist).map((x) => {
              // console.log(x);
              return (
                <div
                  className="flex p-2 bg-[rgb(250,250,250,.4)] backdrop-blur-lg items-center justify-between gap-1 z-0 cursor-pointer"
                  key={x[0]}
                  onClick={(e) => {
                    setName(x[1].userinfo.name);
                    setimage(x[1].userinfo.image);
                    setCombindid(x[0]);
                  }}
                >
                  <img
                    className="h-10 w-10 bg-green-400 rounded-full flex justify-center items-center z-0"
                    src={x[1].userinfo.image}
                    alt=""
                  />

                  <div className="w-[65%] capitalize z-0 md:inline hidden">
                    <div>{x[1].userinfo.name}</div>
                    <div className="text-[8px] lowercase ">
                      {x[1].userinfo?.text}
                    </div>
                  </div>

                  <div className="z-0 text-xs md:inline hidden">
                    {moment(x[1].date).format("l")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>user options</div>
      </div>
      <div className="w-full">
        <Massenger name={name} image={image} combinedID={combinedid} />
      </div>
    </div>
  );
}
