import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Main/NavBar";

const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-1 bg-[#f7f8f9]">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
