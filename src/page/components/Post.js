/* eslint-disable no-unused-expressions */
import { Button } from "@mui/material";

import {
  getDatabase,
  ref,
  onValue,
  orderByKey,
  orderByChild,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { app, auth } from "../../Firebase";

import moment from "moment/moment";
import {
  ChatBubbleOutline,
  LinearScale,
  Lock,
  Reply,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Post() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const publicref = ref(db, "public", orderByChild("time"));
    onValue(publicref, (snaphot) => {
      setData(Object.values(snaphot.val()));
    });
  }, []);
  var final = [];

  for (let element of data) {
    final.push(...Object.values(element));
  }
  // console.log(data);
  // console.log(Object.entries(data));

  // console.log(data2);
  // for (let element of data) {
  //   setfinalData(Object.values(element));
  // }
  // console.log(...final.filter((a) => a.name === auth.currentUser.displayName));
  return (
    <div>
      {final.sort((a, b) => a.time - b.time) &&
        final
          // .filter((a) => a.name === auth.currentUser.displayName)
          .map((x) => {
            const { img, name, post, time, uid } = x;

            return x ? (
              <div className="p-2 my-4">
                <div className="flex justify-between gap-2 capitalize">
                  <div className="flex justify-between gap-2 capitalize">
                    <img className="img" src={img} alt="" />
                    <div className="relative">
                      <Link to={`profile/${uid}`}>
                        <p>{name}</p>
                      </Link>
                      <p className="absolute bottom-0 text-xs scale-75 -left-3  min-w-max flex gap-2">
                        {moment(time).fromNow()}
                        <Lock fontSize="small" />
                      </p>
                    </div>
                  </div>
                  <div className="justify-self-center">
                    <LinearScale />
                  </div>
                </div>
                <p className="text-justify py-3 pb-2 min-h-full ">{post}</p>
                <div className="flex justify-between px-4 bg-slate-100 text-xs py-1">
                  <p>{} likes</p>
                  <p>{} share</p>
                </div>

                <div className="flex justify-between px-4 py-2  border-t border-black text-[5px]">
                  <ThumbUpAltOutlined fontSize="small" />
                  <ChatBubbleOutline fontSize="small" />
                  <p className="-scale-x-100">
                    <Reply fontSize="small" />
                  </p>
                </div>
              </div>
            ) : (
              "null"
            );
          })

          .reverse()}
    </div>
  );
}
