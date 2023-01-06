import { AddAPhoto } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { onValue, push, query, ref, set } from "firebase/database";
import {
  getStorage,
  ref as sgref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { app, auth, db } from "../Firebase";

export default function Test() {
  const [file, setfile] = useState();
  const [text, setText] = useState();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const storage = getStorage(app);
  //   console.log(data);

  useEffect(() => {
    const dataref = ref(db, "test");
    onValue(query(dataref), (snapshot) => {
      setData([Object.values(snapshot.val())]);
    });
    setLoading(false);
  }, []);

  console.log(data);

  const submit = async (e) => {
    e.preventDefault();
    if (file) {
      const storageRef = sgref(storage, file.name);
      setLoading(true);
      uploadBytes(storageRef, file)
        .then(() => {
          getDownloadURL(storageRef)
            .then((URL) => {
              const data = {
                username: auth.currentUser.displayName,
                time: Date.now(),
                img: URL,
                text: e.target[1].value,
              };
              const dbref = URL && ref(db, "test");
              return set(dbref, data);
            })
            .catch((err) => console.log(err));
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      const data = {
        username: auth.currentUser.displayName,
        time: Date.now(),
        text: e.target[1].value,
      };
      const dbref = URL && ref(db, "test");
      return set(dbref, data);
    }
  };

  return (
    <div>
      <form
        action=""
        className="flex justify-center items-center gap-1"
        onSubmit={submit}
      >
        <input
          type={"file"}
          accept="image/*"
          id={"img"}
          hidden
          onChange={(e) => setfile(e.target.files[0])}
        />
        <input type="text" className="ring-1" />
        <label for={"img"}>
          <AddAPhoto />
        </label>
        <button type="submit" className="btn">
          submit
        </button>
      </form>

      <div>
        {loading
          ? "uploading ...."
          : data &&
            data.map((x, i) => {
              return (
                <>
                  <Avatar
                    alt="Remy Sharp"
                    src={x[0]}
                    sx={{ width: 156, height: 156 }}
                  />
                  <div>{x[1]}</div>
                  <img src={x[0]} alt={""} />
                </>
              );
            })}
      </div>
    </div>
  );
}
