import React, { useContext } from "react";
import { useAuth } from "./Authcontext";

export default function Consumer() {
  const { currentUser } = useAuth();

  console.log(currentUser);
  return <div>{currentUser}</div>;
}
