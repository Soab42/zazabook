import { Button } from "@mui/material";

import {
  getDatabase,
  ref,
  onValue,
  limitToLast,
  orderByChild,
  orderByKey,
  orderByValue,
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
    const publicref = ref(db, "public");
    onValue(publicref, (snaphot) => {
      const data = Object.values(snaphot.val());
      setData(Object.values(data));
    });
  }, []);
  console.log(data[0]);
  return (
    <div>
      {data.map((x) => (
        <div className="p-2 my-16">
          <div className="flex gap-2 capitalize">
            <img className="img" src={x.img} alt="" />
            <div className="relative">
              <p>{x.name}</p>
              <p className="absolute bottom-0 text-xs scale-75 -left-3  min-w-max ">
                {moment(x.time).fromNow()}
              </p>
            </div>
          </div>
          <p className="text-justify p-10 pb-2 min-h-full ">{x.post}</p>
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
      ))}
    </div>
  );
}
