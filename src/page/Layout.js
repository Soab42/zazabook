import {
  ChevronLeft,
  IcecreamOutlined,
  Search,
  Logout,
} from "@mui/icons-material";
import { onValue, query, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import moment from "moment";

import { Link, redirect, useNavigate } from "react-router-dom";
import Massenger from "./Massenger";
import Seach from "./components/Seach";
import { signOut } from "firebase/auth";
export default function Layout() {
  const [chatlist, setChatlist] = useState([]);
  const [name, setName] = useState("");
  const [userid, setUserid] = useState("");
  const [image, setimage] = useState("");
  const [combinedid, setCombindid] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const dbref = ref(db, "userchat/" + auth.currentUser.uid);
    onValue(query(dbref), (snapshot) => {
      snapshot.exists() && setChatlist(snapshot.val());
    });
  }, []);
  const logout = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="md:w-[30vw] w-16 bg-blue-400 ">
        <div className="h-[7vh] flex justify-center items-center uppercase font-bold tracking-[5px] shadow-xl">
          <Link to={"/"}>
            <IcecreamOutlined color="warning" />
          </Link>
          <Link to={"/"} className="hidden md:inline">
            Zazabook
          </Link>
        </div>
        <div className="w-full p-2 flex gap-2 h-[8vh] bg-[rgba(250,250,250,.2)] shadow-sm justify-center">
          <div className="hidden md:flex">
            <Seach />
          </div>
          <div className="md:hidden">
            <Search />
          </div>
        </div>
        <div className="z-0 h-[73vh] md:h-[77vh]">
          <div className="grid gap-0.5">
            {Object.entries(chatlist)
              .sort((a, b) => b[1].date - a[1].date)
              .map((x) => {
                // console.log(x);
                return (
                  <div
                    className="flex p-2 bg-[rgb(250,250,250,.4)] backdrop-blur-lg items-center justify-between gap-1 z-0 cursor-pointer"
                    key={x[0]}
                    onClick={(e) => {
                      setName(x[1].userinfo.name);
                      setimage(x[1].userinfo.image);
                      setUserid(x[1].userinfo.uid);
                      setCombindid(x[0]);
                    }}
                  >
                    <img
                      className="h-10 w-10 bg-green-400 rounded-full flex justify-center items-center z-0"
                      src={x[1].userinfo.image}
                      alt=""
                    />

                    <div className="w-[65%] capitalize z-0 md:inline hidden">
                      <div className="text-sm">{x[1].userinfo.name}</div>
                      <div className="text-[9px] lowercase ">
                        {x[1].userinfo?.text}
                      </div>
                    </div>

                    <div className="z-0 text-[7px] md:inline hidden">
                      {moment(new Date(x[1].date)).calendar()}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="h-5vh overflow-hidden">
          <div className="md:flex grid justify-between p-2 gap-1 ">
            <Link
              className="bg-cyan-900 text-white text-center rounded-sm md:p-1 px-2"
              to={"/"}
            >
              <ChevronLeft />
            </Link>

            <div
              className="bg-red-600  text-white text-center rounded-sm md:p-1"
              onClick={logout}
            >
              <Logout />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Massenger
          name={name}
          image={image}
          combinedID={combinedid}
          userid={userid}
        />
      </div>
    </div>
  );
}
