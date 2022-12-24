import { Button, TextField } from "@mui/material";

import { getDatabase, ref, set } from "firebase/database";
import { useRef, useState } from "react";
import { app, auth } from "../Firebase";
import Modal from "../Modal";

import Post from "./components/Post";

// import { Title } from "@mui/icons-material";
export default function Home() {
  const postref = useRef(null);
  const [visible, setVisible] = useState(false);
  const timeout = setTimeout(() => setVisible(false), 2000);

  return (
    <div className="">
      <div className=" flex gap-2 p-2 h-32 justify-center items-center">
        <TextField
          label="Blog post"
          fullWidth
          variant="standard"
          multiline
          placeholder="Whats on your mind............"
          inputProps={{ ref: postref }}
          onClick={() => (postref.current.value = "")}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={() => {
            clearTimeout(timeout);
            const db = getDatabase(app);
            const dbref = ref(
              db,
              "public/" + auth.currentUser.uid + "/" + Date.now()
            );
            const data = {
              post: postref.current.value,
              img: auth.currentUser.photoURL,
              name: auth.currentUser.displayName,
              time: Date.now(),
              uid: auth.currentUser.uid,
              email: auth.currentUser.email,
            };
            set(dbref, data)
              .then(() => {
                setVisible(true);
              })
              .catch((e) => alert(e));
          }}
        >
          Submit
        </Button>
      </div>
      <div>
        <Modal
          bgc={""}
          show={visible ? "flex" : "none"}
          text={"post submitted"}
        />
        <div>
          <Post />
        </div>
      </div>
    </div>
  );
}
