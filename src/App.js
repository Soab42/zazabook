import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./page/Home";
import Layout from "./page/Layout";
import Login from "./page/Login";
import Massenger from "./page/Massenger";
import Profile from "./page/Profile";
import Test from "./test/Test";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />} />

          <Route path="messenger" element={<Layout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="test" element={<Test />} />
        </Routes>
      </BrowserRouter>
      {/* <Login />s */}
    </div>
  );
}
