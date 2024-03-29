import { Button, TextField } from "@mui/material";

import { getDatabase, ref, set } from "firebase/database";
import { useRef, useState } from "react";
import { useAuth } from "../context/Authcontext";
import { app, auth } from "../Firebase";
import Modal from "../Modal";

import Post from "./components/Post";

// import { Title } from "@mui/icons-material";
export default function Home() {
  const { user } = useAuth();
  const postref = useRef(null);
  const [visible, setVisible] = useState(false);
  const timeout = setTimeout(() => setVisible(false), 2000);
  const date = Date.now();
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
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={() => {
            clearTimeout(timeout);
            const db = getDatabase(app);
            const dbref = ref(db, "public/" + user.uid + "/" + date);
            const data = {
              post: postref.current.value,
              img: user.photoURL,
              name: user.displayName,
              time: date,
              uid: user.uid,
              email: user.email,
            };
            set(dbref, data)
              .then(() => {
                setVisible(true);
                postref.current.value = null;
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
