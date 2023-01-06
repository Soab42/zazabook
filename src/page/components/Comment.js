import { Send } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { onValue, push, query, ref, serverTimestamp } from "firebase/database";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Firebase";

export default function Comment() {
  const [data, setData] = useState([]);
  // console.log(data);
  useEffect(() => {
    const dataref = ref(
      db,
      "/public/ffUe6V9jv2Z49zhhbWT1iShhg3f1/1672764488463/comments"
    );
    onValue(query(dataref), (snapshot) => {
      setData(Object.values(snapshot.val()));
    });
    return () => {};
  }, [data]);

  const submit = (e) => {
    e.preventDefault();
    const dataref = ref(
      db,
      "/public/ffUe6V9jv2Z49zhhbWT1iShhg3f1/1672764488463/comments"
    );

    push(dataref, {
      name: auth.currentUser.displayName,
      img: auth.currentUser.photoURL,
      text: e.target[0].value,
      time: serverTimestamp(),
    });
    e.target[0].value = null;
  };
  return (
    <div className=" ">
      {/* comments section */}
      {data.map((x, k) => {
        return (
          <div className="mb-4" key={k}>
            <div className="flex gap-1">
              {/* user section */}
              <img src={x.img} alt="" className="w-8 h-8 img " />
              <section className="grid gap-0 bg-gray-100 capitalize text-sm px-2 oy-1 rounded-md">
                <p className="font-bold text-md">{x.name}</p>
                {/* comments section */}
                <p className="text-justify">{x.text}</p>
                {/* timestamp section */}
                <p className="text-[10px]">{moment(x.time).fromNow()}</p>
              </section>
            </div>
          </div>
        );
      })}

      {/* input function */}
      <form
        action=""
        className="grid justify-center  gap-1"
        onSubmit={submit}
        key={"saif"}
      >
        <TextField
          type="text"
          multiline
          className="ring-2 w-[90vw] rounded-xl
        "
        />
        <button type="submit" className="btn w-36 flex gap-2 justify-center">
          Submit
          <Send />
        </button>
      </form>
    </div>
  );
}
