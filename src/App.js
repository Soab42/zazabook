import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Consumer from "./context/Consumer";

import Layout from "./page/Layout";
import Login from "./page/Login";
import AuthProvider from "./context/Authcontext";
import Postdetails from "./page/Postdetails";
import Profile from "./page/Profile";
import Test from "./test/Test";
import N404 from "./page/N404";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="" element={<Login />} />
            <Route path="post" element={<Postdetails />} />

            <Route path="con" element={<Consumer />} />
            <Route path="messenger" element={<Layout />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="test" element={<Test />} />
            <Route path="/*" element={<N404 />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      {/* <Login />s */}
    </div>
  );
}
