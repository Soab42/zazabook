import moment from "moment";
import React from "react";
import { auth } from "../../Firebase";

export default function Textmsg({ text, username, time, img }) {
  return (
    <div className="grid gap-2 p-2 ">
      <p
        className={`${
          username === auth.currentUser.displayName ? "sent" : "recive"
        } shadow-md relative`}
      >
        <p>{text}</p>
        <img src={img} alt="" />
        <p
          className={`${
            username === auth.currentUser.displayName
              ? "senttime"
              : "recivetime"
          } text-[10px] absolute bottom-[-16px] w-max`}
        >
          {moment(time).fromNow()}
        </p>
      </p>
    </div>
  );
}
