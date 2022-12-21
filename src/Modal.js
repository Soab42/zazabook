import React from "react";

export default function Modal({ bgc, show, text }) {
  return (
    <div
      className="max-h-12 max-w-lg absolute bottom-10 left-5 rounded-md py-1 px-6 flex justify-start items-start overflow-hidden bg-blue-400"
      style={{ backgroundColor: `${bgc}`, display: `${show}` }}
      id="modal"
    >
      {text}
    </div>
  );
}
