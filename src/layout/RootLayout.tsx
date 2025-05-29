import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Main/NavBar";
import FloatingButtons from "../components/common/FloatingButtons";

const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-1 bg-[#f7f8f9] relative">
        {" "}
        <div className="w-full h-full">
          <Outlet />
        </div>
        <FloatingButtons />
      </div>
    </>
  );
};

export default RootLayout;
