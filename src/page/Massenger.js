import { AttachFile, Send } from "@mui/icons-material";
import React, { useRef } from "react";
import Messege from "./components/Messege";
import { auth, db } from "../Firebase";
import { push, ref } from "firebase/database";

export default function Massenger({ combinedID, name, image }) {
  const textref = useRef(null);
  const dummy = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      username: auth.currentUser.displayName,
      time: Date.now(),
      text: textref.current.value,
      img: "",
    };
    const dbref = ref(db, "chat/" + combinedID + "/messege");
    push(dbref, data).then(() => (textref.current.value = null));
  };
  return (
    <div className="h-full overflow-hidden">
      <div className="h-[7vh] bg-blue-400 shadow-md md:w-[77vw] z-[10000] flex pl-4 gap-2 capitalize items-center ">
        <img
          className="h-8 w-8 rounded-full bg-pink-400 flex justify-center items-center text-white font-bold shadow-md ring-2  font-serif text-lg"
          src={image ? image : "icon.png"}
          alt={""}
        />
        <div>{name}</div>
      </div>
      <div className="h-[86vh] z-0 overflow-y-scroll">
        <div className="">
          <Messege id={combinedID} />
        </div>
      </div>
      <div ref={dummy}></div>
      <form
        className="h-[7vh] bg-blue-400 shadow-md  md:w-[77vw] flex items-center justify-between px-2 gap-2 bottom-0 z-[10000]"
        onSubmit={submit}
      >
        <input
          ref={textref}
          type={"text"}
          className="w-full h-[1.8rem] rounded-full text-sm ring-1 px-2"
          required
        />
        <input
          type={"file"}
          id="for-btn"
          className="filebtn"
          accept="image/*"
        />
        <label for={"for-btn"}>
          <AttachFile />
        </label>

        <button type="submit">
          <Send />
        </button>
      </form>
    </div>
  );
}
