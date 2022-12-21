import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./page/Home";
import Login from "./page/Login";
import Massenger from "./page/Massenger";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/profile" element={<Login />} />
          <Route path="/messenger" element={<Massenger />} />
        </Routes>
      </BrowserRouter>
      {/* <Login />s */}
    </div>
  );
}
