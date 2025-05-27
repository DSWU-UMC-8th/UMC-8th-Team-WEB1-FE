import React, { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

// 정렬 기준 옵션
const sortOptions: Option[] = [
  { label: "최신순", value: "LATEST" },
  { label: "추천순", value: "RECOMMEND" },
];

// 드롭다운 컴포넌트 (정렬용으로만 사용)
const Dropdown: React.FC<{
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
  placeholder: string;
}> = ({ options, selected, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label || placeholder;

  return (
    <div
      className="relative w-40 cursor-pointer select-none"
      ref={ref}
      onClick={() => setOpen((prev) => !prev)}
    >
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

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

interface GradeSliderProps {
  label: string;
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChangeMin: (val: number) => void;
  onChangeMax: (val: number) => void;
  resultCount: number;
  onModify: () => void;
}

const GradeSlider: React.FC<GradeSliderProps> = ({
  label,
  min,
  max,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
  resultCount,
  onModify,
}) => {
  return (
    <div className="bg-white rounded-md p-4 w-[280px] shadow">
      <div className="flex justify-between mb-2 text-sm text-gray-700 font-semibold">
        <span>평점 {valueMin}</span>
        <span>평점 {valueMax}</span>
      </div>
      <div className="relative h-6">
        {/* 트랙 배경 */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-green-300 rounded pointer-events-none -translate-y-1/2" />
        {/* 선택 범위 색상 */}
        <div
          className="absolute top-1/2 h-1 bg-green-600 rounded -translate-y-1/2"
          style={{
            left: `${((valueMin - min) / (max - min)) * 100}%`,
            right: `${100 - ((valueMax - min) / (max - min)) * 100}%`,
          }}
        />
        {/* 최소값 슬라이더 */}
        <input
          type="range"
          min={min}
          max={max} // 전체 max 고정!
          value={valueMin}
          onChange={(e) => {
            let val = Number(e.target.value);
            if (val > valueMax) val = valueMax; // 최대값 넘지 않게 제한
            if (val < min) val = min;
            onChangeMin(val);
          }}
          step={1}
          className="absolute top-0 left-0 w-full h-6 bg-transparent pointer-events-auto appearance-none"
          style={{ zIndex: 4 }}
        />
        {/* 최대값 슬라이더 */}
        <input
          type="range"
          min={valueMin} // 최소값부터 시작
          max={max}
          value={valueMax}
          onChange={(e) => {
            let val = Number(e.target.value);
            if (val < valueMin) val = valueMin; // 최소값 이하로 내려가지 않게
            if (val > max) val = max;
            onChangeMax(val);
          }}
          step={1}
          className="absolute top-0 left-0 w-full h-6 bg-transparent pointer-events-auto appearance-none"
          style={{ zIndex: 5 }}
        />

        {/* 슬라이더 핸들 스타일 */}
        <style>{`
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: white;
            border: 2px solid #4ade80;
            border-radius: 50%;
            cursor: pointer;
            margin-top: -9px;
            position: relative;
            z-index: 10;
          }
          input[type=range]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: white;
            border: 2px solid #4ade80;
            border-radius: 50%;
            cursor: pointer;
            position: relative;
            z-index: 10;
          }
          input[type=range]::-webkit-slider-runnable-track {
            height: 8px;
            background: transparent;
            border-radius: 4px;
          }
          input[type=range]::-moz-range-track {
            height: 8px;
            background: transparent;
            border-radius: 4px;
          }
        `}</style>
      </div>

      <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
        <span>{resultCount}개 결과 보기</span>
        <button
          onClick={onModify}
          className="bg-green-200 text-green-800 px-3 py-1 rounded-md text-xs font-semibold hover:bg-green-300"
        >
          수정
        </button>
      </div>
    </div>
  );
};

const ReviewBottom: React.FC = () => {
  const [sort, setSort] = useState("");
  // 평점 슬라이더 보임 여부 토글용
  const [showGradeSliders, setShowGradeSliders] = useState(false);

  // 평점 슬라이더 상태
  const [gradeMin1, setGradeMin1] = useState(1);
  const [gradeMax1, setGradeMax1] = useState(5);

  const resetFilters = () => {
    setSort("");
    setShowGradeSliders(false);
    setGradeMin1(1);
    setGradeMax1(5);
  };

  const handleModify1 = () => {
    alert(`평점 1 수정: ${gradeMin1} ~ ${gradeMax1}`);
  };

  return (
    <div className="bg-[#F7F8F9] w-[87%] mx-auto">
      <div className="flex items-center justify-between mt-5 mb-5">
        <div className="flex items-center gap-3 font-[Pretendard]">
          {/* 정렬 드롭다운 유지 */}
          <Dropdown
            options={sortOptions}
            selected={sort}
            onChange={setSort}
            placeholder="정렬 기준"
          />

          {/* 평점 버튼 (드롭다운 대신) */}
          <button
            onClick={() => setShowGradeSliders((prev) => !prev)}
            className={`border border-gray-300 rounded-md px-3 py-2 bg-white ${
              showGradeSliders ? "font-semibold text-green-600" : "text-gray-600"
            }`}
          >
            평점
          </button>

          <button
            className="rounded-md bg-[#e9e9e9] px-4 py-2.5 text-sm font-medium text-[#6d6d6d] hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            onClick={resetFilters}
            disabled={!sort && !showGradeSliders}
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

      {/* 평점 슬라이더 UI */}
      {showGradeSliders && (
        <div className="flex gap-4">
          <GradeSlider
            label="평점 1"
            min={1}
            max={5}
            valueMin={gradeMin1}
            valueMax={gradeMax1}
            onChangeMin={setGradeMin1}
            onChangeMax={setGradeMax1}
            resultCount={25}
            onModify={handleModify1}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewBottom;
