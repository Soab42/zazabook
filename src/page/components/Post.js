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

export default function Post() {
  const [like, setlike] = useState(0);
  const [share, setShare] = useState(0);
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
            const { img, name, post, time } = x;

            return x ? (
              <div className="p-2 my-16">
                <div className="flex gap-2 capitalize">
                  <img className="img" src={img} alt="" />
                  <div className="relative">
                    <p>{name}</p>
                    <p className="absolute bottom-0 text-xs scale-75 -left-3  min-w-max ">
                      {moment(time).fromNow()}
                    </p>
                  </div>
                </div>
                <p className="text-justify p-10 pb-2 min-h-full ">{post}</p>
                <div className="flex justify-between px-4 bg-slate-100 text-xs">
                  <p>{like} likes</p>
                  <p>{share} share</p>
                </div>

                <div className="flex justify-between px-4 py-1 bg-slate-100">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => (like === 0 ? setlike(1) : setlike(0))}
                  >
                    {like === 0 ? "like" : "liked"}
                  </Button>

                  <Button variant="contained" color="primary" size="small">
                    Comment
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => (share === 0 ? setShare(1) : setShare(0))}
                  >
                    {share === 0 ? "share" : "shared"}
                  </Button>
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
