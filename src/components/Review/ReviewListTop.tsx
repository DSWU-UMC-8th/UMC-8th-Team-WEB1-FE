import React, { useState, useRef, useEffect } from "react";
import Banner from "./Banner";

interface Option {
  label: string;
  value: string;
}

const categoryOptions: Option[] = [
  { label: "IT/프로그래밍", value: "ITPROGRAMMING" },
  { label: "언어", value: "LANGUAGE" },
  { label: "디자인", value: "DESIGN" },
  { label: "요리", value: "COOKING" },
  { label: "금융/재테크", value: "FINANCIAL" },
  { label: "라이프스타일", value: "LIFESTYLE" },
];

const difficultyOptions: Option[] = [
  { label: "입문자", value: "BEGINNER" },
  { label: "초급자", value: "ELEMENTARY" },
  { label: "중급자", value: "INTERMEDIATE" },
  { label: "상급자", value: "ADVANCED" },
];

const entryPeriodOptions: Option[] = [
  { label: "일주일 이내", value: "WITHIN_ONE_WEEK" },
  { label: "1달 이내", value: "WITHIN_ONE_MONTH" },
  { label: "3달 이내", value: "WITHIN_THREE_MONTHS" },
  { label: "6달 이내", value: "WITHIN_SIX_MONTHS" },
  { label: "1년 이내", value: "WITHIN_ONE_YEAR" },
];

// 드롭다운 컴포넌트
const Dropdown: React.FC<{
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
  placeholder: string;
}> = ({ options, selected, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기 처리
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // 선택된 라벨 찾기
  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label || placeholder;

  return (
    <div
      className="relative w-40 cursor-pointer select-none"
      ref={ref}
      onClick={() => setOpen((prev) => !prev)}
    >
      {/* 선택된 항목 보여주기 */}
      <div className="border border-gray-300 rounded-md px-3 py-2 flex justify-between items-center bg-white">
        <span>{selectedLabel}</span>
        <svg
          className={`w-4 h-4 ml-2 text-gray-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-56 overflow-y-auto border border-gray-300">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-4 py-2 cursor-pointer hover:bg-[#F3F3F3] ${
                selected === opt.value ? "bg-[#F3F3F3]" : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ReviewListTop: React.FC = () => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [entryPeriod, setEntryPeriod] = useState("");

  const resetFilters = () => {
    setCategory("");
    setDifficulty("");
    setEntryPeriod("");
  };

  return (
    <div className="bg-[#F7F8F9] w-[87%] mx-auto">
      {/* 배너 및 홍보 문구 */}
      <Banner />

      {/* 필터 영역 */}
      <div className="flex items-center justify-between mt-5 mb-5">
        <div className="flex items-center gap-3 font-[Pretendard]">
          <Dropdown
            options={categoryOptions}
            selected={category}
            onChange={setCategory}
            placeholder="카테고리"
          />
          <Dropdown
            options={difficultyOptions}
            selected={difficulty}
            onChange={setDifficulty}
            placeholder="난이도"
          />
          <Dropdown
            options={entryPeriodOptions}
            selected={entryPeriod}
            onChange={setEntryPeriod}
            placeholder="입문 기간"
          />
          <button
            className="rounded-md bg-[#e9e9e9] px-4 py-2.5 text-sm font-medium text-[#6d6d6d] hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            onClick={resetFilters}
            disabled={!category && !difficulty && !entryPeriod}
          >
            초기화
          </button>
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-[#2b2b2b] hover:text-gray-500 select-none cursor-pointer">
          인기순
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ReviewListTop;
