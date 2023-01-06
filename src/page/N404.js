import { Error } from "@mui/icons-material";
import React from "react";

export default function N404() {
  return (
    <div className="grid grid-flow-col h-screen justify-center items-center xl:text-[5rem] gap-2 overflow-hidden bg-slate-200 xl:border-[2rem] border-[10px] text-4xl border-double  text-red-500 border-red-600">
      <Error color="warning" fontSize="inherit" /> Page Not Found!
    </div>
  );
}
