import React, { useState, type KeyboardEvent } from "react";
import SearchIcon from "../../assets/search.png";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center rounded-full px-4 py-2 w-full max-w-[400px] mt-4 md:mt-0 bg-white">
      <button onClick={handleSearch} className="mr-2">
        <img src={SearchIcon} alt="Search" className="w-5 sm:w-4" />
      </button>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력해 주세요"
        className="flex-1 bg-transparent outline-none text-sm text-gray-500 placeholder:text-gray-400"
      />
    </div>
  );
};

export default SearchBar;
