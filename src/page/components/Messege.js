import { onValue, query, ref } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../Firebase";
import Textmsg from "./Textmsg";

export default function Messege({ id }) {
  const [massege, setMassege] = useState([]);
  const scrollref = useRef(null);
  useEffect(() => {
    const dbref = ref(db, "chat/" + id + "/messege");
    const dbquery = query(dbref);
    onValue(dbquery, (snapshot) => {
      setMassege(snapshot.val());
    });
  }, [id]);
  useEffect(() => {
    scrollref.current.scrollIntoView({ behavior: "smooth" });
  }, [massege]);

  // console.log(Object.entries(massege));
  return (
    <div className="">
      {massege
        ? Object.entries(massege).map((x) => {
            console.log(x);
            let { text, time, username, img } = x[1];

            return (
              <Textmsg text={text} img={img} time={time} username={username} />
            );
          })
        : null}
      <div ref={scrollref}></div>
    </div>
  );
}
