/* eslint-disable no-unused-expressions */

import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  remove,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { app, db } from "../Firebase";

import moment from "moment/moment";
import {
  Delete,
  //   ChatBubbleOutline,
  LinearScale,
  Lock,
  //   Reply,
  //   ThumbUpAltOutlined,
} from "@mui/icons-material";
import Like from "./components/Like";
import Dplink from "./components/Dplink";

export default function Postdetails() {
  const [data, setData] = useState({});

  useEffect(() => {
    const db = getDatabase(app);
    const publicref = ref(
      db,
      "public/ffUe6V9jv2Z49zhhbWT1iShhg3f1/1672764488463",
      orderByChild("time")
    );
    onValue(publicref, (snaphot) => {
      setData(snaphot.val());
    });
  }, []);
  // console.log(data);

  return (
    <div>
      <div className="p-2 my-4">
        <div className="flex justify-between gap-2 capitalize">
          <div className="flex justify-between gap-2 capitalize">
            <img className="img" src={data.img} alt="" />
            <div className="relative">
              <Dplink name={data.name} id={data.uid} />
              <p className="absolute bottom-0 text-xs scale-75 -left-3  min-w-max flex gap-2">
                {moment(data.time).fromNow()}
                <Lock fontSize="small" />
              </p>
            </div>
          </div>
          <div className="justify-self-center">
            <LinearScale />
            <p
              onClick={() => {
                const rref = ref(
                  db,
                  "public/GkYCgetigiRZwR9qYUZ45eQaLJL2/1671818563031"
                );
                remove(rref);
              }}
            >
              <Delete />
            </p>
          </div>
        </div>
        <p className="text-justify py-3 pb-2 min-h-full ">{data.post}</p>
        <div>
          <Like like={`${data.likes}`} share={""} comments={data.comments} />
        </div>
      </div>
    </div>
  );
}
