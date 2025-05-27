import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import LogoImage from "../../assets/logo.png";
import Dashboard from "../../assets/Dashboard.png";
import Popular from "../../assets/Popular.png";
import Latest from "../../assets/Latest.png";

import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>("/");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/review/popular")) {
      setActiveMenu("/review/popular");
    } else if (path.startsWith("/review/latest")) {
      setActiveMenu("/review/latest");
    } else if (path.startsWith("/review")) {
      setActiveMenu("/review");
    } else {
      setActiveMenu("/");
    }
  }, [location.pathname]);

  const handleMenuClick = (path: string) => {
    setActiveMenu(path);
  };

  return (
    <nav className="bg-[#F7F8F9] px-4 md:px-12 py-4 flex flex-wrap justify-between items-center w-full font-[Pretendard]">
      <div className="flex items-center gap-6 md:gap-16 flex-wrap">
        <Link to="/">
          <img src={LogoImage} alt="Logo" className="w-[200px] min-w-[160px]" />
        </Link>
        <Link
          to="/review"
          onClick={() => handleMenuClick("/review")}
          className={activeMenu === "/review" ? "bg-[#c0e5c7] rounded-md" : ""}
        >
          <img
            src={Dashboard}
            alt="Dashboard"
            className="w-[140px] min-w-[100px] h-auto"
          />
        </Link>
        <Link
          to="/review/popular"
          onClick={() => handleMenuClick("/review/popular")}
          className={
            activeMenu === "/review/popular" ? "bg-[#c0e5c7] rounded-md" : ""
          }
        >
          <img
            src={Popular}
            alt="Popular"
            className="w-[120px] min-w-[90px] h-auto"
          />
        </Link>
        <Link
          to="/review/latest"
          onClick={() => handleMenuClick("/review/latest")}
          className={
            activeMenu === "/review/latest" ? "bg-[#c0e5c7] rounded-md" : ""
          }
        >
          <img
            src={Latest}
            alt="Latest"
            className="w-[110px] min-w-[80px] h-auto"
          />
        </Link>
      </div>

      <SearchBar />
    </nav>
  );
};

export default Navbar;
