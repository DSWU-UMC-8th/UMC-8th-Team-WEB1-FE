import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Main/NavBar";

const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-1 bg-white">
        <div className="w-full h-full overflow-y-auto bg-white">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
